import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import PreviewFrame from '../components/PreviewFrame'
import {
  audienceGroups,
  betaRoleOptions,
  chordIntelligenceCards,
  compatibilityBadges,
  crewAccessCards,
  featurePillars,
  faqs,
  galleryScreens,
  importExportCards,
  navLinks,
  problemPoints,
  pricingTiers,
  roadmapPhases,
  suiteCards,
  workflowSteps,
} from './landingContent'

type MobileMenuProps = {
  open: boolean
  onNavigate: () => void
  onJoinBeta: () => void
}

type ViewerImage = {
  src: string
  alt: string
  label: string
}

type BetaRequestPayload = {
  name: string
  email: string
  organisation: string
  role: string
  message: string
  website: string
}

type BetaAccessFormProps = {
  idPrefix: string
  onSuccess?: () => void
}

type BetaFormState = 'idle' | 'submitting' | 'success' | 'error'

function MobileMenu({ open, onNavigate, onJoinBeta }: MobileMenuProps) {
  return (
    <div className={`bs-mobile-panel${open ? ' is-open' : ''}`} aria-hidden={open ? 'false' : 'true'}>
      <div className="bs-mobile-panel-inner bs-card bs-card-pad">
        <nav className="bs-mobile-nav" aria-label="Mobile">
          {navLinks.map((link) => (
            <a key={link.href} className="bs-link bs-focus-ring" href={link.href} onClick={onNavigate}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="bs-button bs-button-primary bs-focus-ring"
          data-track="request-beta-access"
          onClick={() => {
            onNavigate()
            onJoinBeta()
          }}
        >
          Request Beta Access
        </button>
      </div>
    </div>
  )
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function handleCardKeyDown(event: React.KeyboardEvent<HTMLElement>, onOpen?: () => void) {
  if (!onOpen) {
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onOpen()
  }
}

const betaSuccessMessage =
  "Your beta request has been received. BandSong is currently onboarding early users in phases, and we'll reach out as the workflow expands."
const betaFailureMessage = 'Something went wrong while sending your request. Please try again or contact hello@bandsong.app.'

function validateBetaRequest(payload: BetaRequestPayload) {
  if (!payload.name) {
    return 'Enter your name.'
  }

  if (!isValidEmail(payload.email)) {
    return 'Enter a valid email address.'
  }

  if (!payload.role) {
    return 'Choose your role.'
  }

  return ''
}

function BetaAccessForm({ idPrefix, onSuccess }: BetaAccessFormProps) {
  const [formState, setFormState] = useState<BetaFormState>('idle')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    // TODO: Track beta form viewed when analytics event routing is finalised.
  }, [])

  const isSubmitting = formState === 'submitting'
  const showSuccess = formState === 'success'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload: BetaRequestPayload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      organisation: String(formData.get('organisation') ?? '').trim(),
      role: String(formData.get('role') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
      website: String(formData.get('website') ?? '').trim(),
    }
    const validationError = validateBetaRequest(payload)

    if (validationError) {
      setFormState('error')
      setFormError(validationError)
      return
    }

    setFormState('submitting')
    setFormError('')
    // TODO: Track beta form submitted when analytics event routing is finalised.

    try {
      const response = await fetch('/api/beta-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Beta request failed with status ${response.status}`)
      }

      form.reset()
      setFormState('success')
      onSuccess?.()
      // TODO: Track beta submission success when analytics event routing is finalised.
    } catch {
      setFormState('error')
      setFormError(betaFailureMessage)
      // TODO: Track beta submission failure when analytics event routing is finalised.
    }
  }

  return (
    <form className="bs-card bs-card-pad bs-beta-access-form" data-track="beta-form" onSubmit={handleSubmit} noValidate>
      <div className="bs-form-grid">
        <div className="bs-form-field">
          <label className="bs-feature-title" htmlFor={`${idPrefix}-name`}>
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            className="bs-input bs-focus-ring"
            type="text"
            autoComplete="name"
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="bs-form-field">
          <label className="bs-feature-title" htmlFor={`${idPrefix}-email`}>
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            className="bs-input bs-focus-ring"
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="bs-form-field">
          <label className="bs-feature-title" htmlFor={`${idPrefix}-organisation`}>
            Band / Organisation name
          </label>
          <input id={`${idPrefix}-organisation`} name="organisation" className="bs-input bs-focus-ring" type="text" disabled={isSubmitting} />
        </div>
        <div className="bs-form-field">
          <label className="bs-feature-title" htmlFor={`${idPrefix}-role`}>
            Role
          </label>
          <select id={`${idPrefix}-role`} name="role" className="bs-input bs-focus-ring" defaultValue={betaRoleOptions[0]} disabled={isSubmitting} required>
            {betaRoleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bs-form-field">
        <label className="bs-feature-title" htmlFor={`${idPrefix}-message`}>
          Optional message
        </label>
        <textarea id={`${idPrefix}-message`} name="message" className="bs-input bs-textarea bs-focus-ring" rows={4} disabled={isSubmitting} />
      </div>
      <div className="bs-honeypot-field" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {formError ? <p className="bs-form-error">{formError}</p> : null}
      {showSuccess ? (
        <div className="bs-form-success" role="status">
          <p>{betaSuccessMessage}</p>
          <p>You can also contact hello@bandsong.app directly if needed.</p>
        </div>
      ) : null}
      <div className="bs-action-row">
        <button type="submit" className="bs-button bs-button-primary bs-focus-ring" data-track="request-beta-access" disabled={isSubmitting}>
          {isSubmitting ? 'Sending Request...' : 'Request Beta Access'}
        </button>
      </div>
      {!showSuccess ? <p className="bs-feature-copy bs-form-contact-note">You can also contact hello@bandsong.app directly if needed.</p> : null}
    </form>
  )
}

function LandingPage() {
  const landingRef = useRef<HTMLDivElement | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [betaOpen, setBetaOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [showHeroProductPreview, setShowHeroProductPreview] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [galleryDirection, setGalleryDirection] = useState<1 | -1>(1)
  const [viewerImage, setViewerImage] = useState<ViewerImage | null>(null)

  useEffect(() => {
    document.title = 'BandSong | Musician Workflow System'

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content =
      'BandSong is a musician workflow system for editing songs, managing repertoires, planning setlists, and preparing rehearsals and live performances.'
  }, [])

  useEffect(() => {
    const landingElement = landingRef.current
    if (!landingElement) {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const initialX = window.innerWidth * 0.68
    const initialY = window.innerHeight * 0.22
    const target = { x: initialX, y: initialY, opacity: isFinePointer ? 0.34 : 0.24 }
    const current = { x: initialX, y: initialY, opacity: isFinePointer ? 0.34 : 0.24 }

    landingElement.style.setProperty('--bs-glow-x', `${current.x}px`)
    landingElement.style.setProperty('--bs-glow-y', `${current.y}px`)
    landingElement.style.setProperty('--bs-glow-opacity', `${current.opacity}`)

    let frameId = 0

    const syncGlow = () => {
      landingElement.style.setProperty('--bs-glow-x', `${current.x.toFixed(1)}px`)
      landingElement.style.setProperty('--bs-glow-y', `${current.y.toFixed(1)}px`)
      landingElement.style.setProperty('--bs-glow-opacity', current.opacity.toFixed(3))
    }

    const render = () => {
      const smoothing = mediaQuery.matches ? 1 : 0.02
      current.x += (target.x - current.x) * smoothing
      current.y += (target.y - current.y) * smoothing
      current.opacity += (target.opacity - current.opacity) * (mediaQuery.matches ? 1 : 0.04)

      syncGlow()
      frameId = window.requestAnimationFrame(render)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
        return
      }

      target.x = Math.min(window.innerWidth - 80, Math.max(80, event.clientX + 64))
      target.y = Math.min(window.innerHeight - 80, Math.max(80, event.clientY + 36))
      target.opacity = 0.54
    }

    const resetGlow = () => {
      target.x = window.innerWidth * 0.68
      target.y = window.innerHeight * 0.22
      target.opacity = isFinePointer ? 0.34 : 0.24
    }

    if (isFinePointer) {
      frameId = window.requestAnimationFrame(render)
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerleave', resetGlow)
    } else {
      resetGlow()
      current.x = target.x
      current.y = target.y
      current.opacity = target.opacity
      syncGlow()
    }

    window.addEventListener('resize', resetGlow)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', resetGlow)
      window.removeEventListener('resize', resetGlow)
    }

    window.addEventListener('resize', resetGlow)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', resetGlow)
      window.removeEventListener('resize', resetGlow)
    }
  }, [])

  useEffect(() => {
    if (!mobileOpen) {
      return undefined
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    const root = landingRef.current
    if (!root) {
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (reduceMotion.matches) {
      targets.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    targets.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const previousSlide = () => {
    setGalleryDirection(-1)
    setGalleryIndex((index) => (index - 1 + galleryScreens.length) % galleryScreens.length)
  }

  const nextSlide = () => {
    setGalleryDirection(1)
    setGalleryIndex((index) => (index + 1) % galleryScreens.length)
  }

  useEffect(() => {
    if (!galleryOpen) {
      return undefined
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        nextSlide()
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        previousSlide()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [galleryOpen])

  const closeMobileMenu = () => setMobileOpen(false)
  const currentYear = new Date().getFullYear()
  const activeGalleryScreen = galleryScreens[galleryIndex]

  const openBetaModal = () => {
    setBetaOpen(true)
  }

  const closeBetaModal = () => {
    setBetaOpen(false)
  }

  const openGallery = (index = 0) => {
    setShowHeroProductPreview(false)
    setGalleryDirection(1)
    setGalleryIndex(index)
    setGalleryOpen(true)
  }
  const openViewer = (src: string, alt: string, label: string) => {
    setShowHeroProductPreview(false)
    setViewerImage({ src, alt, label })
  }
  return (
    <div className="bs-landing" ref={landingRef}>
      <a className="bs-skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="bs-site-header">
        <div className="bs-shell bs-site-header-inner bs-section-tight bs-site-header-compact">
          <a className="bs-brand bs-focus-ring" href="#top" aria-label="BandSong home" onClick={closeMobileMenu}>
            <img className="bs-brand-logo" src="/BandSong Logo - Type.svg" alt="BandSong" />
          </a>

          <nav className="bs-nav bs-nav-desktop bs-nav-compact" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.href} className="bs-link bs-focus-ring bs-nav-link" href={link.href}>
                {link.label}
              </a>
            ))}
            <button type="button" className="bs-button bs-button-primary bs-focus-ring bs-nav-cta" data-track="request-beta-access" onClick={openBetaModal}>
              Request Beta Access
            </button>
          </nav>

          <button
            type="button"
            className="bs-button bs-button-secondary bs-focus-ring bs-menu-button bs-nav-cta"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            Menu
          </button>
        </div>
        <div id="mobile-nav-panel">
          <MobileMenu open={mobileOpen} onNavigate={closeMobileMenu} onJoinBeta={openBetaModal} />
        </div>
      </header>

      <main id="main-content">
        <section className="bs-hero" id="top">
          <div className="bs-shell bs-hero-center">
            <div className="bs-hero-copy-wrap">
              <p className="bs-eyebrow bs-hero-eyebrow">Musician Workflow System</p>
              <h1 className="bs-display bs-hero-display">
                <span className="bs-hero-line">Everyone plays</span>
                <span className="bs-hero-line">the same version.</span>
                <span className="bs-hero-line">Every time<span className="bs-hero-tempo-dot">.</span></span>
              </h1>
              <p className="bs-lead bs-lead-hero bs-hero-lead">
                BandSong Suite is the musician workflow system for rehearsals and live performance. Edit songs, plan setlists, and perform from a calm stage-ready viewer - synced across devices.
              </p>
              <p className="bs-feature-copy bs-hero-note">Songs come first. Calm tools beat feature overload.</p>
              <div className="bs-action-row bs-hero-actions">
                <a className="bs-button bs-button-primary bs-focus-ring" href="#beta" data-track="request-beta-access">
                  Request Beta Access
                </a>
                <div
                  className="bs-hero-product-anchor"
                  onMouseEnter={() => setShowHeroProductPreview(true)}
                  onMouseLeave={() => setShowHeroProductPreview(false)}
                >
                  <button type="button" className="bs-button bs-button-secondary bs-focus-ring" data-track="see-product" onClick={() => openGallery(0)}>
                    See Product
                  </button>
                  <div className={`bs-hero-product-tooltip${showHeroProductPreview ? ' is-visible' : ''}`} aria-hidden={showHeroProductPreview ? 'false' : 'true'}>
                    {showHeroProductPreview ? (
                      <div className="bs-card bs-card-pad bs-hero-product-card">
                        <span className="bs-panel-label">Suite Preview (Editor - Viewer - Setlist)</span>
                        <img
                          className="bs-hero-product-image"
                          src="/ScreenGrabs/BandSong Suite - Editor_WebP.webp"
                          alt="BandSong Suite editor preview"
                          width="1920"
                          height="945"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <a className="bs-button bs-button-secondary bs-focus-ring" href="#pricing" data-track="view-pricing">
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal aria-labelledby="compatibility-title">
          <div className="bs-shell">
            <div className="bs-section-head bs-section-head-compact">
              <span className="bs-panel-label">Compatibility</span>
              <h2 className="bs-section-title" id="compatibility-title">Built around the way real teams already work.</h2>
            </div>
            <div className="bs-trust-badge-grid" aria-label="BandSong compatibility and trust points">
              {compatibilityBadges.map((badge) => (
                <span key={badge} className="bs-code-chip">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bs-section bs-reveal" data-reveal aria-labelledby="problem-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Reality check</span>
              <h2 className="bs-section-title" id="problem-title">Rehearsal chaos is predictable.</h2>
            </div>
            <div className="bs-problem-layout">
              <div className="bs-card bs-card-pad bs-problem-list-card">
                <ul className="bs-list-clean bs-showcase-stack" aria-label="Common rehearsal problems">
                  {problemPoints.map((point) => (
                    <li key={point} className="bs-problem-item">
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="bs-card bs-card-pad bs-problem-outcome" aria-label="BandSong outcome">
                <span className="bs-panel-label bs-panel-label-accent">Control</span>
                <p className="bs-problem-close">BandSong makes your repertoire feel controlled.</p>
                <div className="bs-problem-payoffs">
                  <p className="bs-feature-copy">One trusted chart for the band.</p>
                  <p className="bs-feature-copy">One clear publish action when things change.</p>
                  <p className="bs-feature-copy">One calmer rehearsal before the downbeat.</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="who-for" aria-labelledby="who-for-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Who it is for</span>
              <h2 className="bs-section-title" id="who-for-title">Built for the people who keep music organized.</h2>
              <p className="bs-section-copy">
                BandSong supports the musicians, directors, leaders, engineers, and organisers who need one clear place for rehearsal and performance context.
              </p>
            </div>
            <div className="bs-audience-group-grid">
              {audienceGroups.map((group) => (
                <article key={group.title} className="bs-card bs-card-pad bs-audience-group-card bs-reveal" data-reveal>
                  <span className="bs-panel-label bs-panel-label-accent">{group.label}</span>
                  <h3 className="bs-feature-title">{group.title}</h3>
                  <p className="bs-feature-copy">{group.copy}</p>
                  <ul className="bs-list-clean bs-audience-person-list" aria-label={`${group.title} examples`}>
                    {group.people.map((person) => (
                      <li key={person}>{person}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bs-section bs-reveal" data-reveal id="how-it-works"> 
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Workflow</span>
              <h2 className="bs-section-title">Publish once. Everyone stays aligned.</h2>
              <p className="bs-section-copy">BandSong keeps song changes controlled. When you update a chart or arrangement, your group stays synchronized across devices - with less version guessing before rehearsal.</p>
            </div>
            <div className="bs-workflow-flow" aria-label="BandSong workflow">
              {workflowSteps.map((step, index) => (
                <article key={step.title} className="bs-card bs-card-pad bs-feature bs-workflow-step bs-reveal" data-reveal>
                  <div className="bs-workflow-step-head">
                    <span className="bs-workflow-step-number">0{index + 1}</span>
                    <span className="bs-panel-label bs-panel-label-accent">{step.label}</span>
                  </div>
                  <h3 className="bs-feature-title">{step.title}</h3>
                  <p className="bs-feature-copy">{step.detail}</p>
                </article>
              ))}
            </div>
            <p className="bs-section-copy bs-workflow-close">Confidence beats confusion.</p>
          </div>
        </section>

        <section className="bs-section bs-reveal" data-reveal id="workflow" aria-labelledby="suite-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Workflow</span>
              <h2 className="bs-section-title" id="suite-title">A complete workflow - not just a chord viewer.</h2>
            </div>
            <div className="bs-workflow-grid" aria-label="BandSong Suite workflow tools">
              {suiteCards.map((card) => {
                const previewSrc = card.previewSrc
                const openCardViewer = previewSrc
                  ? () => openViewer(previewSrc, card.previewAlt ?? card.title, card.previewLabel ?? card.title)
                  : undefined

                return (
                  <article
                    key={card.title}
                    className={`bs-card bs-card-pad bs-feature bs-showcase-card bs-workflow-card bs-reveal${openCardViewer ? ' is-clickable' : ''}`}
                    data-reveal
                    role={openCardViewer ? 'button' : undefined}
                    tabIndex={openCardViewer ? 0 : undefined}
                    aria-label={openCardViewer ? `Open ${card.title} in large viewer` : undefined}
                    onClick={openCardViewer}
                    onKeyDown={(event) => handleCardKeyDown(event, openCardViewer)}
                  >
                    <PreviewFrame
                      variant="card"
                      src={previewSrc}
                      alt={card.previewAlt ?? card.title}
                      label={card.previewLabel}
                      onOpen={openCardViewer}
                    />
                    <div className="bs-showcase-copy">
                      <h3 className="bs-feature-title bs-showcase-card-title">{card.title}</h3>
                      <p className="bs-feature-copy">{card.body}</p>
                      <ul className="bs-list-clean bs-showcase-stack" aria-label={`${card.title} capabilities`}>
                        {card.bullets.map((bullet) => (
                          <li key={bullet} className="bs-problem-item">
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="demo" aria-labelledby="demo-title">
          <div className="bs-shell">
            <div className="bs-demo-layout">
              <div className="bs-section-head bs-demo-copy">
                <span className="bs-panel-label">Demo</span>
                <h2 className="bs-section-title" id="demo-title">See BandSong in action.</h2>
                <p className="bs-section-copy">
                  A short product walkthrough is coming soon, showing the full workflow from song editing to setlist planning and live viewer mode.
                </p>
              </div>
              <div className="bs-card bs-card-pad bs-demo-placeholder" aria-label="Demo video placeholder">
                <span className="bs-panel-label bs-panel-label-accent">Walkthrough</span>
                <p className="bs-demo-placeholder-title">Demo video coming soon.</p>
                <p className="bs-feature-copy">The placeholder is here so reviewers can see where the product walkthrough will live.</p>
                <button type="button" className="bs-button bs-button-secondary bs-focus-ring" disabled>
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="chords" aria-labelledby="chord-intelligence-title">
          <div className="bs-shell">
            <div className="bs-section-head bs-section-head-compact">
              <span className="bs-panel-label">Chords</span>
              <h2 className="bs-section-title" id="chord-intelligence-title">Chord intelligence, connected to your actual songs.</h2>
              <p className="bs-section-copy">Explore voicings and harmony in context - not as isolated theory. BandSong links chord tools directly to the songs and setlists you're working on.</p>
            </div>
            <div className="bs-intelligence-strip" aria-label="Song intelligence capabilities">
              {chordIntelligenceCards.map((card) => (
                <article key={card.title} className="bs-card bs-card-pad bs-intelligence-card bs-reveal" data-reveal>
                  <h3 className="bs-feature-title bs-showcase-card-title">{card.title}</h3>
                  {card.body ? <p className="bs-feature-copy">{card.body}</p> : null}
                  <ul className="bs-list-clean bs-intelligence-points" aria-label={`${card.title} details`}>
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="bs-intelligence-point">{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>


        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="readability" aria-labelledby="appearance-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Appearance & Readability</span>
              <h2 className="bs-section-title" id="appearance-title">Readable on stage. Comfortable in rehearsal.</h2>
              <p className="bs-section-copy">Customize reading and layout so the Viewer works under stage lighting and personal preference.</p>
              <div className="bs-badge-row bs-badge-row-tight bs-appearance-badges">
                <span className="bs-code-chip">Stage-friendly</span>
                <span className="bs-code-chip">Customizable</span>
                <span className="bs-code-chip">Calm UI</span>
              </div>
            </div>
            <div className="bs-appearance-layout">
              <div className="bs-card bs-card-pad bs-showcase-stack bs-appearance-copy-card">
                <div className="bs-appearance-intro">
                  <span className="bs-panel-label">Viewer controls</span>
                  <p className="bs-feature-copy">The reading surface stays calm, but musicians still get the controls they need to make it legible fast.</p>
                </div>
                <div className="bs-appearance-feature-grid" aria-label="Readability controls">
                  <article className="bs-appearance-feature">
                    <span className="bs-workflow-step-number">01</span>
                    <h3 className="bs-feature-title">Theme selection + accent color system</h3>
                    <p className="bs-feature-copy">Choose the overall feel and contrast profile that fits the room.</p>
                  </article>
                  <article className="bs-appearance-feature">
                    <span className="bs-workflow-step-number">02</span>
                    <h3 className="bs-feature-title">Chord rendering styles</h3>
                    <p className="bs-feature-copy">Adjust how chords are presented so players read them faster.</p>
                  </article>
                  <article className="bs-appearance-feature">
                    <span className="bs-workflow-step-number">03</span>
                    <h3 className="bs-feature-title">Viewer readability + layout controls</h3>
                    <p className="bs-feature-copy">Dial in spacing, density, and layout for rehearsal or stage use.</p>
                  </article>
                </div>
              </div>
              <aside
                className="bs-card bs-card-pad bs-showcase-stack bs-appearance-preview-card is-clickable"
                aria-label="Viewer readability preview"
                role="button"
                tabIndex={0}
                onClick={() =>
                  openViewer(
                    '/ScreenGrabs/BandSong Suite - Settings_WebP.webp',
                    'BandSong Suite appearance and settings screen',
                    'Viewer Readability Preview',
                  )
                }
                onKeyDown={(event) =>
                  handleCardKeyDown(event, () =>
                    openViewer(
                      '/ScreenGrabs/BandSong Suite - Settings_WebP.webp',
                      'BandSong Suite appearance and settings screen',
                      'Viewer Readability Preview',
                    ),
                  )
                }
              >
                <div className="bs-appearance-preview-head">
                  <span className="bs-panel-label bs-panel-label-accent">Stage preview</span>
                  <p className="bs-feature-copy">Tune the viewer for dark rooms, bright stages, and different reading preferences.</p>
                </div>
                <PreviewFrame
                  src="/ScreenGrabs/BandSong Suite - Settings_WebP.webp"
                  alt="BandSong Suite appearance and settings screen"
                  label="Viewer Readability Preview"
                  onOpen={() =>
                    openViewer(
                      '/ScreenGrabs/BandSong Suite - Settings_WebP.webp',
                      'BandSong Suite appearance and settings screen',
                      'Viewer Readability Preview',
                    )
                  }
                />
              </aside>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="desktop-tablet" aria-labelledby="desktop-tablet-title">
          <div className="bs-shell">
            <div className="bs-card bs-card-pad bs-split-feature-card">
              <div className="bs-split-feature-copy">
                <span className="bs-panel-label bs-panel-label-accent">Desktop & Tablet First</span>
                <h2 className="bs-section-title" id="desktop-tablet-title">Built for desktop and tablet workflows.</h2>
                <p className="bs-feature-copy">
                  BandSong is designed for the spaces where musicians actually prepare: laptops, desktops, and tablets. Editing charts, organizing setlists, reviewing arrangements, and running rehearsals all benefit from a larger working surface.
                </p>
                <p className="bs-feature-copy">
                  Mobile access is supported as a lightweight backup and emergency layer, but the full BandSong experience is best on desktop, laptop, or tablet.
                </p>
              </div>
              <div className="bs-surface-stack" aria-label="Primary BandSong surfaces">
                <span className="bs-code-chip">Desktop editing</span>
                <span className="bs-code-chip">Laptop rehearsal prep</span>
                <span className="bs-code-chip">Tablet stage viewing</span>
                <span className="bs-code-chip">Mobile backup access</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal aria-labelledby="trust-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Trust</span>
              <h2 className="bs-section-title" id="trust-title">Designed for real bands.</h2>
              <p className="bs-section-copy">BandSong was built inside a working band - mixed skill levels, different instruments, different devices, and real rehearsal constraints. The interface stays calm, content-first, and performance safe.</p>
              <div className="bs-badge-row bs-badge-row-tight bs-trust-badges">
                <span className="bs-code-chip">Offline-first</span>
                <span className="bs-code-chip">Songs come first</span>
                <span className="bs-code-chip">Built by a band</span>
              </div>
            </div>
            <div className="bs-trust-layout">
              <article className="bs-card bs-card-pad bs-trust-story-card">
                <span className="bs-panel-label bs-panel-label-accent">Real-world use</span>
                <p className="bs-trust-lead">Offline-first: your songs stay available when internet disappears.</p>
                <div className="bs-trust-copy">
                  <p className="bs-feature-copy">BandSong is not designed for ideal studio conditions. It is designed for the actual band room: a leader making last-minute edits, players arriving on different devices, and everyone needing confidence before the downbeat.</p>
                  <p className="bs-feature-copy">That is why the product stays content-first, avoids noisy UI, and keeps the current chart in front of the band.</p>
                </div>
              </article>
              <div className="bs-trust-proof-grid" aria-label="Trust points">
                <article className="bs-card bs-card-pad bs-trust-proof-card bs-reveal" data-reveal>
                  <span className="bs-workflow-step-number">01</span>
                  <h3 className="bs-feature-title">Offline-first</h3>
                  <p className="bs-feature-copy">Your songs stay available when internet disappears, so rehearsal does not depend on signal quality.</p>
                </article>
                <article className="bs-card bs-card-pad bs-trust-proof-card bs-trust-proof-card-accent bs-reveal" data-reveal>
                  <span className="bs-workflow-step-number">02</span>
                  <h3 className="bs-feature-title">Performance-safe UI</h3>
                  <p className="bs-feature-copy">The interface stays calm under pressure, so musicians can read, follow, and play instead of hunting through controls.</p>
                </article>
                <article className="bs-card bs-card-pad bs-trust-proof-card bs-reveal" data-reveal>
                  <span className="bs-workflow-step-number">03</span>
                  <h3 className="bs-feature-title">Built by a band</h3>
                  <p className="bs-feature-copy">Real rehearsal constraints shaped the product from the start, not just feature ideas on a roadmap.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="origin" aria-labelledby="origin-title">
          <div className="bs-shell">
            <div className="bs-origin-grid">
              <article className="bs-card bs-card-pad bs-origin-card">
                <span className="bs-panel-label bs-panel-label-accent">Origin</span>
                <h2 className="bs-section-title" id="origin-title">Built from real rehearsal pressure.</h2>
                <p className="bs-feature-copy">
                  BandSong was built directly from real-world experience managing active band rehearsals, arrangements, setlists, last-minute edits, and live-performance preparation.
                </p>
                <p className="bs-feature-copy">
                  The product exists because last-minute changes are predictable - and manageable. It is shaped by real band-room constraints, by someone who understands rehearsal workflow, and by a preference for clarity over feature overload.
                </p>
              </article>
              <article className="bs-card bs-card-pad bs-calm-card">
                <span className="bs-panel-label">Positioning</span>
                <h2 className="bs-section-title">Calm beats feature overload.</h2>
                <p className="bs-feature-copy">
                  BandSong is intentionally designed to reduce rehearsal noise. The goal is not to add another busy app to the room - it is to keep the song, setlist, and performance context clear when people need it most.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="features" aria-labelledby="features-title">
          <div className="bs-shell">
            <div className="bs-section-head bs-section-head-compact">
              <span className="bs-panel-label">Features</span>
              <h2 className="bs-section-title" id="features-title">Why BandSong stays clear when rehearsals change.</h2>
            </div>
            <div className="bs-feature-pillars-grid" aria-label="BandSong feature pillars">
              {featurePillars.map((feature) => (
                <article key={feature.title} className="bs-card bs-card-pad bs-feature bs-elevated-card bs-feature-pillar-card bs-reveal" data-reveal>
                  <h3 className="bs-feature-title bs-showcase-card-title">{feature.title}</h3>
                  <p className="bs-feature-copy">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bs-section bs-reveal" data-reveal id="migration" aria-labelledby="migration-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Migration</span>
              <h2 className="bs-section-title" id="migration-title">Already using OnSong or SongbookPro?</h2>
              <p className="bs-section-copy">Import ChordPro and migrate your library in minutes. BandSong is designed for OnSong workflows - and you can export back anytime.</p>
              <div className="bs-badge-row bs-badge-row-tight bs-migration-badges">
                <span className="bs-code-chip">OnSong-friendly</span>
                <span className="bs-code-chip">ChordPro-based</span>
                <span className="bs-code-chip">Export anytime</span>
              </div>
            </div>
            <div className="bs-migration-layout">
              <article className="bs-card bs-card-pad bs-migration-story-card">
                <span className="bs-panel-label bs-panel-label-accent">Switch without drama</span>
                <p className="bs-migration-lead">Move your existing library over fast, keep control of the review, and publish only when the songs are ready.</p>
                <div className="bs-migration-copy">
                  <p className="bs-feature-copy">BandSong is built for teams that already have real charts, real setlists, and existing workflows. The migration path is meant to feel practical, not risky.</p>
                  <p className="bs-feature-copy">Bring over your material, verify the structure, and publish the version the whole group can use.</p>
                </div>
              </article>
              <div className="bs-workflow-flow bs-migration-flow" aria-label="Migration flow">
                <article className="bs-card bs-card-pad bs-feature bs-workflow-step bs-migration-step bs-reveal" data-reveal>
                  <div className="bs-workflow-step-head">
                    <span className="bs-panel-label bs-panel-label-accent">Import</span>
                  </div>
                  <h3 className="bs-feature-title">Bring in your current songs</h3>
                  <p className="bs-feature-copy">Start with ChordPro and established songbook exports instead of retyping everything by hand.</p>
                </article>
                <article className="bs-card bs-card-pad bs-feature bs-workflow-step bs-migration-step bs-migration-step-accent">
                  <div className="bs-workflow-step-head">
                    <span className="bs-panel-label bs-panel-label-accent">Review</span>
                  </div>
                  <h3 className="bs-feature-title">Check structure before the band sees it</h3>
                  <p className="bs-feature-copy">Review sections, chords, and formatting so the imported song becomes the version you actually trust.</p>
                </article>
                <article className="bs-card bs-card-pad bs-feature bs-workflow-step bs-migration-step bs-reveal" data-reveal>
                  <div className="bs-workflow-step-head">
                    <span className="bs-panel-label bs-panel-label-accent">Publish</span>
                  </div>
                  <h3 className="bs-feature-title">Roll out one clear version</h3>
                  <p className="bs-feature-copy">When you are ready, publish once and let the group move forward on the same chart.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bs-section bs-reveal" data-reveal id="import-export" aria-labelledby="import-export-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Import / Export</span>
              <h2 className="bs-section-title" id="import-export-title">Import and export without the chaos.</h2>
              <p className="bs-section-copy">BandSong is built to move your existing library over quickly - and keep your songs portable. Import ChordPro, migrate from common songbook apps, and use guided tools when your source is messy.</p>
              <div className="bs-badge-row bs-badge-row-tight bs-import-badges">
                <span className="bs-code-chip">Portable</span>
                <span className="bs-code-chip">Guided review</span>
                <span className="bs-code-chip">No lock-in</span>
              </div>
            </div>
            <div className="bs-import-layout">
              <div className="bs-import-stack" aria-label="Import and export capabilities">
                {importExportCards.map((card, index) => (
                  <article key={card.title} className={`bs-card bs-card-pad bs-feature bs-import-card bs-reveal${index === 1 ? ' bs-import-card-accent' : ''}`} data-reveal>
                    <div className="bs-import-card-content">
                      <div className="bs-import-card-copy">
                        <div className="bs-import-card-head">
                          <span className="bs-panel-label bs-panel-label-accent">{index === 0 ? 'Import' : index === 1 ? 'Review' : 'Export'}</span>
                          <h3 className="bs-feature-title bs-showcase-card-title">{card.title}</h3>
                        </div>
                        <p className="bs-feature-copy">{card.body}</p>
                      </div>
                      <ul className="bs-list-clean bs-showcase-stack bs-import-bullets" aria-label={`${card.title} benefits`}>
                        {card.bullets.map((bullet, bulletIndex) => (
                          <li key={bullet} className="bs-problem-item bs-import-bullet-item">
                            <span className="bs-workflow-step-number">0{bulletIndex + 1}</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <p className="bs-feature-copy bs-import-note">No lock-in. Your songs remain portable.</p>
            <div className="bs-card bs-card-pad bs-content-rights-note">
              <span className="bs-panel-label bs-panel-label-accent">Content responsibility</span>
              <p className="bs-feature-copy">
                BandSong does not provide copyrighted song libraries, lyrics databases, or unauthorized third-party downloads. You import, create, and manage your own material, and you remain responsible for the rights to the content you use.
              </p>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="crew-access" aria-labelledby="crew-access-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Crew Access</span>
              <h2 className="bs-section-title" id="crew-access-title">Bring your crew into the same workflow.</h2>
              <p className="bs-section-copy">
                BandSong helps more than the musicians on stage. Managers, agents, sound engineers, lighting engineers, and production crew can access the information they need without disturbing the band's core song workflow.
              </p>
            </div>

            <div className="bs-crew-layout">
              <article className="bs-card bs-card-pad bs-crew-story-card bs-reveal" data-reveal>
                <span className="bs-panel-label bs-panel-label-accent">Early subscriber benefit</span>
                <p className="bs-crew-lead">
                  During BandSong's early subscription period, Crew Access is included for active BandSong subscribers.
                </p>
                <div className="bs-crew-copy">
                  <p className="bs-feature-copy">
                    Subscribe early and keep included Crew Access for your active BandSong workspace while the related subscription remains active.
                  </p>
                  <p className="bs-feature-copy">
                    Crew members can view the information they are granted access to. Editing core song content depends on the band or workspace owner's permission settings.
                  </p>
                  <p className="bs-feature-copy">
                    Crew Access availability, limits, and permissions may vary by plan. It is not included for Free users by default.
                  </p>
                </div>
              </article>

              <div className="bs-crew-role-grid" aria-label="Crew Access roles">
                {crewAccessCards.map((card, index) => (
                  <article key={card.role} className={`bs-card bs-card-pad bs-crew-role-card bs-reveal${index === 1 ? ' bs-crew-role-card-accent' : ''}`} data-reveal>
                    <span className="bs-workflow-step-number">0{index + 1}</span>
                    <h3 className="bs-feature-title">{card.role}</h3>
                    <p className="bs-feature-copy">{card.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="pricing" aria-labelledby="pricing-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Pricing</span>
              <h2 className="bs-section-title" id="pricing-title">Digital subscription access for real music teams.</h2>
              <p className="bs-section-copy">
                BandSong sells software access for managing songs, setlists, rehearsals, and live performance preparation. It does not sell songs, lyrics, chord charts, copyrighted music databases, or downloadable third-party music content.
              </p>
            </div>

            <div className="bs-pricing-grid" aria-label="BandSong subscription plans">
              {pricingTiers.map((tier) => (
                <article
                  key={tier.name}
                  className={`bs-card bs-card-pad bs-pricing-card bs-reveal${tier.highlighted ? ' bs-pricing-card-featured' : ''}${tier.contact ? ' bs-pricing-card-elite' : ''}`}
                  data-reveal
                >
                  <div className="bs-pricing-card-head">
                    <div className="bs-pricing-tier-row">
                      <span className="bs-panel-label bs-panel-label-accent">{tier.name}</span>
                      {tier.badge ? <span className="bs-pricing-badge">{tier.badge}</span> : null}
                    </div>
                    <div className="bs-pricing-price-row">
                      <span className="bs-pricing-price">{tier.price}</span>
                      {tier.cadence ? <span className="bs-pricing-cadence">{tier.cadence}</span> : null}
                    </div>
                    <p className="bs-feature-copy bs-pricing-best-for">Best for: {tier.bestFor}</p>
                  </div>

                  <ul className="bs-list-clean bs-pricing-list" aria-label={`${tier.name} includes`}>
                    {tier.features.map((feature) => (
                      <li key={feature} className="bs-pricing-item">
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.contact ? (
                    <a
                      className="bs-button bs-button-secondary bs-focus-ring bs-pricing-cta"
                      href="mailto:hello@bandsong.app?subject=BandSong%20Elite%20Plan"
                      data-track="contact-bandsong"
                      data-plan={tier.name}
                    >
                      {tier.cta}
                    </a>
                  ) : (
                    <button type="button" className="bs-button bs-button-primary bs-focus-ring bs-pricing-cta" data-track="plan-cta" data-plan={tier.name} onClick={openBetaModal}>
                      {tier.cta}
                    </button>
                  )}
                </article>
              ))}
            </div>

            <div className="bs-card bs-card-pad bs-pricing-note-card">
              <p className="bs-feature-copy">
                Pricing is subject to change during the beta period. Final billing and subscription management may be handled securely through Lemon Squeezy.
              </p>
              <p className="bs-feature-copy">
                Users are responsible for the content they create, upload, import, or manage inside BandSong.
              </p>
            </div>

            <div className="bs-card bs-card-pad bs-beta-status-card">
              <span className="bs-panel-label bs-panel-label-accent">Early access status</span>
              <p className="bs-feature-copy">
                BandSong is in active beta. Access may be limited while the workflow, plans, and platform support are refined.
              </p>
            </div>
          </div>
        </section>

        <section className="bs-section" id="beta">
          <div className="bs-shell">
            <div className="bs-beta-access-layout">
              <div className="bs-card bs-card-pad bs-beta-card bs-beta-access-copy">
                <span className="bs-panel-label bs-panel-label-accent">Beta</span>
                <h2 className="bs-section-title">Request BandSong beta access.</h2>
                <p className="bs-section-copy">
                  Tell us how you plan to use BandSong and we'll prioritize beta access for teams that match the current workflow focus.
                </p>
                <p className="bs-feature-copy bs-beta-note">Early access, thoughtful updates, and a clear way to shape the product.</p>
              </div>

              <BetaAccessForm idPrefix="beta-access" />
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="docs-roadmap" aria-labelledby="docs-title">
          <div className="bs-shell">
            <div className="bs-docs-roadmap-grid">
              <article className="bs-card bs-card-pad bs-docs-card">
                <span className="bs-panel-label bs-panel-label-accent">Docs</span>
                <h2 className="bs-section-title" id="docs-title">Documentation coming soon.</h2>
                <p className="bs-feature-copy">
                  Quick-start guides, ChordPro syntax help, import guidance, viewer shortcuts, and migration support will be added as BandSong moves through beta.
                </p>
              </article>
              <article className="bs-card bs-card-pad bs-docs-card">
                <span className="bs-panel-label">Support</span>
                <h2 className="bs-section-title">Practical help, not noise.</h2>
                <p className="bs-feature-copy">
                  The documentation will focus on getting real songs, setlists, and performance workflows ready without turning setup into another rehearsal task.
                </p>
              </article>
              <article className="bs-card bs-card-pad bs-docs-card">
                <span className="bs-panel-label">Beta proof</span>
                <h2 className="bs-section-title">Social proof coming later.</h2>
                <p className="bs-feature-copy">
                  BandSong is currently being tested in real rehearsal and performance workflows. Public testimonials will be added as the beta expands.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight bs-reveal" data-reveal id="roadmap" aria-labelledby="roadmap-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Product Roadmap</span>
              <h2 className="bs-section-title" id="roadmap-title">Where BandSong is heading.</h2>
              <p className="bs-section-copy">
                The roadmap starts with the rehearsal and performance workflow that exists now, then moves into future areas that may expand preparation and performance context over time.
              </p>
            </div>
            <div className="bs-roadmap-grid">
              {roadmapPhases.map((phase) => (
                <article key={phase.label} className={`bs-card bs-card-pad bs-roadmap-card${phase.future ? ' bs-roadmap-card-future' : ''}`}>
                  <span className="bs-panel-label bs-panel-label-accent">{phase.label}</span>
                  <h3 className="bs-feature-title">{phase.title}</h3>
                  <p className="bs-feature-copy">{phase.copy}</p>
                  <ul className="bs-list-clean bs-roadmap-list" aria-label={`${phase.label} includes`}>
                    {phase.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bs-section bs-reveal" data-reveal id="faq">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">FAQ</span>
              <h2 className="bs-section-title">Questions teams usually ask first.</h2>
            </div>
            <div className="bs-showcase-stack">
              {faqs.map((item) => (
                <article key={item.question} className="bs-card bs-card-pad bs-feature bs-elevated-card bs-reveal" data-reveal>
                  <h3 className="bs-feature-title bs-showcase-card-title">{item.question}</h3>
                  <p className="bs-feature-copy">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bs-footer">
        <div className="bs-shell bs-footer-inner bs-footer-inner-stacked">
          <div className="bs-footer-brand">
            <a className="bs-footer-logo bs-focus-ring" href="/" aria-label="BandSong home">
              <img src="/BandSong Logo - Type.svg" alt="BandSong" />
            </a>
            <p className="bs-footer-product-line">
              BandSong is a musician workflow system for managing songs, setlists, rehearsals, and live performance preparation.
            </p>
            <p>&copy; {currentYear} BandSong &middot; bandsong.app &middot; hello@bandsong.app</p>
          </div>
          <nav className="bs-footer-groups" aria-label="Footer">
            <div className="bs-footer-group">
              <span className="bs-panel-label">Product</span>
              <a className="bs-link bs-focus-ring" href="#how-it-works">Workflow</a>
              <a className="bs-link bs-focus-ring" href="#features">Features</a>
              <a className="bs-link bs-focus-ring" href="#import-export">Import/Export</a>
              <a className="bs-link bs-focus-ring" href="#pricing">Pricing</a>
            </div>
            <div className="bs-footer-group">
              <span className="bs-panel-label">Access</span>
              <a className="bs-link bs-focus-ring" href="#beta">Beta</a>
              <a className="bs-link bs-focus-ring" href="mailto:hello@bandsong.app" data-track="contact-bandsong">Contact</a>
              <span className="bs-footer-placeholder">Documentation coming soon</span>
            </div>
            <div className="bs-footer-group">
              <span className="bs-panel-label">Legal</span>
              <a className="bs-link bs-focus-ring" href="/terms">Terms of Service</a>
              <a className="bs-link bs-focus-ring" href="/privacy">Privacy Policy</a>
              <a className="bs-link bs-focus-ring" href="/refund-policy">Refund Policy</a>
            </div>
          </nav>
        </div>
      </footer>

      <Modal open={betaOpen} title="Request BandSong Beta Access" onClose={closeBetaModal}>
        <BetaAccessForm idPrefix="beta-modal" />
      </Modal>

      <Modal open={galleryOpen} title="BandSong Suite Product Gallery" onClose={() => setGalleryOpen(false)}>
        <div className="bs-gallery-slider">
          <div className="bs-gallery-slider-head">
            <div className="bs-showcase-copy bs-gallery-copy">
              <h3 className="bs-feature-title bs-showcase-card-title">{activeGalleryScreen.title}</h3>
              <p className="bs-feature-copy">{activeGalleryScreen.description}</p>
            </div>
            <div className="bs-gallery-controls" aria-label="Product gallery controls">
              <span className="bs-gallery-count">{galleryIndex + 1} / {galleryScreens.length}</span>
              <button
                type="button"
                className="bs-button bs-button-secondary bs-focus-ring"
                aria-label="Previous screen"
                onClick={previousSlide}
              >
                Previous
              </button>
              <button
                type="button"
                className="bs-button bs-button-secondary bs-focus-ring"
                aria-label="Next screen"
                onClick={nextSlide}
              >
                Next
              </button>
            </div>
          </div>

          <div key={`${galleryDirection}-${activeGalleryScreen.src}`} className={`bs-gallery-stage ${galleryDirection > 0 ? 'is-next' : 'is-prev'}`} id="gallery-active-slide">
            <PreviewFrame
              src={activeGalleryScreen.src}
              alt={activeGalleryScreen.alt}
              onOpen={() => openViewer(activeGalleryScreen.src, activeGalleryScreen.alt, activeGalleryScreen.title)}
            />
          </div>
        </div>
      </Modal>

      <Modal open={viewerImage !== null} title={viewerImage?.label ?? 'Large viewer'} onClose={() => setViewerImage(null)}>
        {viewerImage ? (
          <div className="bs-viewer-shell">
            <div className="bs-viewer-frame">
              <img className="bs-viewer-image" src={viewerImage.src} alt={viewerImage.alt} />
            </div>
            <p className="bs-feature-copy bs-viewer-note">Tap or click outside the image, press Escape, or use Close to return.</p>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

export default LandingPage


