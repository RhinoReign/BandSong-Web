import { createHash } from 'node:crypto'

const allowedRoles = new Set([
  'Solo performer',
  'Band leader',
  'Band member',
  'Worship/music director',
  'Sound engineer',
  'Lighting engineer',
  'Manager/agent',
  'Studio/organisation',
  'Other',
])

const rateLimitWindowMs = 60 * 1000
const rateLimitMaxRequests = 5
const rateLimitBuckets = new Map()

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(payload))
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getClientIp(request) {
  const forwardedFor = request.headers['x-forwarded-for']

  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim()
  }

  return request.socket.remoteAddress || 'unknown'
}

function hashIpAddress(ipAddress) {
  // Store only a one-way hash for review/abuse context; raw IP addresses are not persisted.
  return createHash('sha256').update(`bandsong-beta:${ipAddress}`).digest('hex')
}

function isRateLimited(ipAddress) {
  const now = Date.now()
  const bucket = rateLimitBuckets.get(ipAddress)

  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(ipAddress, { count: 1, resetAt: now + rateLimitWindowMs })
    return false
  }

  bucket.count += 1
  return bucket.count > rateLimitMaxRequests
}

async function readJsonBody(request) {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(chunk)
  }

  if (chunks.length === 0) {
    return {}
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

function validatePayload(payload) {
  const cleaned = {
    name: cleanText(payload.name, 140),
    email: cleanText(payload.email, 254).toLowerCase(),
    organisation: cleanText(payload.organisation, 180),
    role: cleanText(payload.role, 80),
    message: cleanText(payload.message, 2000),
    website: cleanText(payload.website, 200),
  }

  if (cleaned.website) {
    return { cleaned, spam: true }
  }

  if (!cleaned.name) {
    return { error: 'Name is required.' }
  }

  if (!isValidEmail(cleaned.email)) {
    return { error: 'A valid email is required.' }
  }

  if (!allowedRoles.has(cleaned.role)) {
    return { error: 'A valid role is required.' }
  }

  return { cleaned }
}

async function submitToSupabase(payload) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase beta request environment variables are not configured.')
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/beta_requests`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      organisation: payload.organisation || null,
      role: payload.role,
      message: payload.message || null,
      source: 'landing-page',
      status: 'new',
      user_agent: payload.userAgent || null,
      ip_hash: payload.ipHash || null,
    }),
  })

  if (!response.ok) {
    throw new Error(`Supabase beta request insert failed with status ${response.status}.`)
  }
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    sendJson(response, 405, { error: 'Method not allowed.' })
    return
  }

  const clientIp = getClientIp(request)

  if (isRateLimited(clientIp)) {
    sendJson(response, 429, { error: 'Too many requests. Please try again shortly.' })
    return
  }

  let payload

  try {
    payload = await readJsonBody(request)
  } catch {
    sendJson(response, 400, { error: 'Invalid request body.' })
    return
  }

  const validation = validatePayload(payload)

  if (validation.spam) {
    sendJson(response, 202, { ok: true })
    return
  }

  if (validation.error) {
    sendJson(response, 400, { error: validation.error })
    return
  }

  try {
    await submitToSupabase({
      ...validation.cleaned,
      userAgent: cleanText(request.headers['user-agent'], 500),
      ipHash: hashIpAddress(clientIp),
    })
    sendJson(response, 200, { ok: true })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Beta request insert failed.')
    sendJson(response, 503, { error: 'Beta request intake is unavailable.' })
  }
}
