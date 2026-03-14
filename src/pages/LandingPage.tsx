import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import PreviewFrame from '../components/PreviewFrame'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#migration', label: 'Migration' },
  { href: '#beta', label: 'Beta' },
  { href: '#faq', label: 'FAQ' },
]

const problemPoints = [
  'Chord charts scattered across WhatsApp',
  'Multiple versions of the same song',
  'Last-minute key changes nobody receives',
  'Different apps on iOS and Android',
  'Students practicing outdated material',
]

const workflowSteps = [
  'A new version is published',
  'Every member instantly receives the update',
  'Previous versions can be restored anytime',
]

const demoSteps = [
  'Open a shared song editor with the latest arrangement.',
  'Publish an update once for the whole group.',
  'Watch every device receive the same version instantly.',
  'Build a setlist around the updated material.',
  'Walk into rehearsal knowing everyone is aligned.',
]

type ScreenContext = {
  src: string
  alt: string
  label: string
  context: string
  badges: string[]
}

const heroPreview: ScreenContext = {
  src: '/ScreenGrabs/BandSong Suite - Editor_WebP.webp',
  alt: 'BandSong editor screen',
  label: 'Editor UI Preview',
  context: 'Used by leaders to edit structure, cues, and song metadata before publishing.',
  badges: ['Preparation', 'Publishing', 'Song detail'],
}

const previewCards: Array<ScreenContext & { title: string; copy: string }> = [
  {
    title: 'Song Editor',
    copy: 'Structure, lyrics, metadata, and confidence notes in one clear editing view.',
    src: '/ScreenGrabs/BandSong Suite - Editor_WebP.webp',
    label: 'Song Editor',
    alt: 'BandSong song editor screen',
    context: 'This is where a director or teacher makes the canonical update that everyone else receives.',
    badges: ['Leader workflow', 'Version source'],
  },
  {
    title: 'Setlist Builder',
    copy: 'Build the running order fast, keep transitions visible, and prep the room before downbeat.',
    src: '/ScreenGrabs/BandSong Suite - Setlists_WebP.webp',
    label: 'Setlist Builder',
    alt: 'BandSong setlists screen',
    context: 'Use this screen to arrange the service or gig flow and keep the band aligned on sequence changes.',
    badges: ['Running order', 'Rehearsal prep'],
  },
  {
    title: 'Shared Library',
    copy: 'Give every player the same published songs and arrangements across the whole group.',
    src: '/ScreenGrabs/BandSong Suite - Table_WebP.webp',
    label: 'Shared Library',
    alt: 'BandSong shared library table screen',
    context: 'The library helps the team find the latest published material quickly instead of hunting through chats.',
    badges: ['Discovery', 'Published songs'],
  },
]

const galleryCards: Array<ScreenContext & { title: string }> = [
  {
    title: 'Chords View',
    src: '/ScreenGrabs/BandSong Suite - Chords_WebP.webp',
    label: 'Chords',
    alt: 'BandSong chords view screen',
    context: 'A player-focused reading view for following harmonic movement without extra editing controls.',
    badges: ['Player view', 'Practice'],
  },
  {
    title: 'Settings',
    src: '/ScreenGrabs/BandSong Suite - Settings_WebP.webp',
    label: 'Settings',
    alt: 'BandSong settings screen',
    context: 'Configuration lives here so teams can tailor how the app behaves for devices, sessions, and access.',
    badges: ['Configuration', 'Admin'],
  },
  {
    title: 'Viewer Live',
    src: '/ScreenGrabs/BandSong Suite - Viewer Live_WebP.webp',
    label: 'Viewer Live',
    alt: 'BandSong live viewer screen',
    context: 'The live screen strips things back so performers can focus on the current chart in the moment.',
    badges: ['Stage mode', 'Performance'],
  },
]

const featurePillars = [
  {
    title: 'Setlists that stay in sync',
    copy: 'Reorder songs, swap keys, and push live changes across the band without juggling notes, texts, or screenshots.',
  },
  {
    title: 'Song intelligence in one place',
    copy: 'Keep lyrics, structure, cues, BPM, and who-counts-it-off attached to the song instead of buried in chats.',
  },
  {
    title: 'Made for rehearsal and stage',
    copy: 'Players get a clean show view while music directors keep a more detailed editor for preparation and last-minute fixes.',
  },
]

const faqs = [
  {
    question: 'Will BandSong work on both iOS and Android?',
    answer: 'Yes. The goal is one synchronized experience across both platforms so mixed-device groups stay aligned.',
  },
  {
    question: 'Can members still use it without signal at rehearsal or on stage?',
    answer: 'Yes. BandSong is designed to be offline-first so published material stays available when connectivity is unreliable.',
  },
  {
    question: 'Can we recover an older version of a song?',
    answer: 'Yes. Previous versions can be restored anytime if a new arrangement needs to be rolled back.',
  },
  {
    question: 'Do we have to migrate everything manually?',
    answer: 'No. The migration flow is designed around import, review, and publish so teams can move in stages.',
  },
  {
    question: 'How do we join the beta?',
    answer: 'Use any Join the Beta button on the page to register interest and get updates when access opens.',
  },
]

type MobileMenuProps = {
  open: boolean
  onNavigate: () => void
  onJoinBeta: () => void
}

function MobileMenu({ open, onNavigate, onJoinBeta }: MobileMenuProps) {
  return (
    <div className={`bs-mobile-panel${open ? ' is-open' : ''}`} hidden={!open}>
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
          onClick={() => {
            onNavigate()
            onJoinBeta()
          }}
        >
          Join the Beta
        </button>
      </div>
    </div>
  )
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function LandingPage() {
  const landingRef = useRef<HTMLDivElement | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [betaOpen, setBetaOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const [viewerImage, setViewerImage] = useState<ScreenContext | null>(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [betaSuccess, setBetaSuccess] = useState(false)

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

    const render = () => {
      const smoothing = mediaQuery.matches ? 1 : 0.02
      current.x += (target.x - current.x) * smoothing
      current.y += (target.y - current.y) * smoothing
      current.opacity += (target.opacity - current.opacity) * (mediaQuery.matches ? 1 : 0.04)

      landingElement.style.setProperty('--bs-glow-x', `${current.x.toFixed(1)}px`)
      landingElement.style.setProperty('--bs-glow-y', `${current.y.toFixed(1)}px`)
      landingElement.style.setProperty('--bs-glow-opacity', current.opacity.toFixed(3))

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

    frameId = window.requestAnimationFrame(render)

    if (isFinePointer) {
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerleave', resetGlow)
    } else {
      resetGlow()
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

  const closeMobileMenu = () => setMobileOpen(false)
  const currentYear = new Date().getFullYear()

  const openBetaModal = () => {
    setEmailError('')
    setBetaOpen(true)
  }

  const closeBetaModal = () => {
    setBetaOpen(false)
  }

  const handleBetaSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidEmail(email)) {
      setEmailError('Enter a valid email address.')
      setBetaSuccess(false)
      return
    }

    setEmailError('')
    setBetaSuccess(true)
  }

  const openViewer = (image: ScreenContext) => {
    setViewerImage(image)
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
            <button type="button" className="bs-button bs-button-primary bs-focus-ring bs-nav-cta" onClick={openBetaModal}>
              Join the Beta
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
          <div className="bs-shell bs-hero-grid">
            <div>
              <p className="bs-eyebrow">Versioned Music Collaboration</p>
              <h1 className="bs-display">Everyone plays the same version. Every time.</h1>
              <p className="bs-lead">
                BandSong keeps bands, tutors, and worship teams perfectly synchronized. Update a song once and every member instantly receives the correct version on iOS or Android.
              </p>
              <div className="bs-action-row">
                <button type="button" className="bs-button bs-button-primary bs-focus-ring" onClick={openBetaModal}>
                  Join the Beta
                </button>
                <button type="button" className="bs-button bs-button-secondary bs-focus-ring" onClick={() => setDemoOpen(true)}>
                  Watch Demo
                </button>
              </div>
            </div>

            <aside className="bs-showcase-stack" aria-label="Editor preview">
              <div className="bs-image-context">
                <div className="bs-badge-row">
                  {heroPreview.badges.map((badge) => (
                    <span key={badge} className="bs-code-chip">{badge}</span>
                  ))}
                </div>
                <p className="bs-feature-copy">{heroPreview.context}</p>
              </div>
              <PreviewFrame src={heroPreview.src} alt={heroPreview.alt} label={heroPreview.label} onOpen={() => openViewer(heroPreview)} />
              <div className="bs-code-chip">Offline-first publishing for music groups</div>
            </aside>
          </div>
        </section>

        <section className="bs-section" aria-labelledby="problem-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">The problem</span>
              <h2 className="bs-section-title" id="problem-title">Music groups shouldn't be this hard to coordinate.</h2>
            </div>
            <div className="bs-card bs-card-pad bs-showcase-stack">
              <ul className="bs-list-clean bs-showcase-stack" aria-label="Common coordination problems">
                {problemPoints.map((point) => (
                  <li key={point} className="bs-problem-item">
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="bs-feature-copy bs-problem-close">BandSong removes the confusion.</p>
            </div>
          </div>
        </section>

        <section className="bs-section" id="how-it-works">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">How it works</span>
              <h2 className="bs-section-title">Publish once. Everyone stays aligned.</h2>
              <p className="bs-section-copy">BandSong introduces version control for music groups.</p>
            </div>
            <div className="bs-row bs-row-3">
              {workflowSteps.map((step, index) => (
                <article key={step} className="bs-card bs-card-pad bs-feature bs-elevated-card">
                  <span className="bs-panel-label">0{index + 1}</span>
                  <h3 className="bs-feature-title">{step}</h3>
                </article>
              ))}
            </div>
            <p className="bs-section-copy bs-workflow-close">No more guessing which chart is correct before rehearsal or a gig.</p>
          </div>
        </section>

        <section className="bs-section" id="preview" aria-labelledby="preview-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Product preview</span>
              <h2 className="bs-section-title" id="preview-title">See the workflow in motion.</h2>
              <p className="bs-section-copy">Editing, arranging, and distributing songs should feel like one connected system.</p>
            </div>
            <div className="bs-row bs-row-3">
              {previewCards.map((card) => (
                <article key={card.title} className="bs-card bs-card-pad bs-showcase bs-showcase-card">
                  <div className="bs-showcase-copy">
                    <div className="bs-badge-row bs-badge-row-tight">
                      {card.badges.map((badge) => (
                        <span key={badge} className="bs-code-chip">{badge}</span>
                      ))}
                    </div>
                    <h3 className="bs-feature-title bs-showcase-card-title">{card.title}</h3>
                    <p className="bs-feature-copy">{card.copy}</p>
                    <p className="bs-feature-copy bs-image-note">{card.context}</p>
                  </div>
                  <PreviewFrame src={card.src} alt={card.alt} label={card.label} onOpen={() => openViewer(card)} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight" aria-labelledby="gallery-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Suite gallery</span>
              <h2 className="bs-section-title" id="gallery-title">More of the BandSong Suite in context.</h2>
              <p className="bs-section-copy">These additional screens show how chords, settings, and the live viewer fit into the same product system.</p>
            </div>
            <div className="bs-row bs-row-3">
              {galleryCards.map((card) => (
                <article key={card.title} className="bs-card bs-card-pad bs-showcase bs-showcase-card">
                  <div className="bs-showcase-copy">
                    <div className="bs-badge-row bs-badge-row-tight">
                      {card.badges.map((badge) => (
                        <span key={badge} className="bs-code-chip">{badge}</span>
                      ))}
                    </div>
                    <h3 className="bs-feature-title bs-showcase-card-title">{card.title}</h3>
                    <p className="bs-feature-copy bs-image-note">{card.context}</p>
                  </div>
                  <PreviewFrame src={card.src} alt={card.alt} label={card.label} onOpen={() => openViewer(card)} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bs-section" id="features">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Feature pillars</span>
              <h2 className="bs-section-title">A shared system for songs, setlists, and rehearsal decisions.</h2>
            </div>
            <div className="bs-feature-grid">
              {featurePillars.map((feature) => (
                <article key={feature.title} className="bs-card bs-card-pad bs-feature bs-elevated-card">
                  <span className="bs-panel-label">Feature</span>
                  <h3 className="bs-feature-title bs-showcase-card-title">{feature.title}</h3>
                  <p className="bs-feature-copy">{feature.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight" aria-labelledby="trust-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Trust</span>
              <h2 className="bs-section-title" id="trust-title">Built for real rehearsals, services, lessons, and gigs.</h2>
              <p className="bs-section-copy">BandSong is designed around fast updates, mixed-device teams, and the reality that live music rarely waits for perfect conditions.</p>
            </div>
            <div className="bs-logo-grid">
              <div className="bs-code-chip">Offline-first</div>
              <div className="bs-code-chip">Gig-ready</div>
              <div className="bs-code-chip">Built by a band</div>
            </div>
          </div>
        </section>

        <section className="bs-section" id="migration">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Migration</span>
              <h2 className="bs-section-title">Move your existing charts without blowing up your workflow.</h2>
              <p className="bs-section-copy">Start with the material you already have, clean it up once, and then publish it into a system the whole group can trust.</p>
            </div>
            <div className="bs-row bs-row-3">
              <div className="bs-card bs-card-pad bs-feature bs-elevated-card"><h3 className="bs-feature-title">Import</h3></div>
              <div className="bs-card bs-card-pad bs-feature bs-elevated-card"><h3 className="bs-feature-title">Review</h3></div>
              <div className="bs-card bs-card-pad bs-feature bs-elevated-card"><h3 className="bs-feature-title">Publish</h3></div>
            </div>
          </div>
        </section>

        <section className="bs-section" id="beta">
          <div className="bs-shell">
            <div className="bs-card bs-card-pad bs-beta-card">
              <span className="bs-panel-label bs-panel-label-accent">Beta</span>
              <h2 className="bs-section-title">Join the BandSong beta.</h2>
              <p className="bs-section-copy">Get early access, help shape the workflow, and bring your group into a cleaner way of sharing music.</p>
              <div className="bs-action-row">
                <button type="button" className="bs-button bs-button-primary bs-focus-ring" onClick={openBetaModal}>
                  Join the Beta
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bs-section" id="faq">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">FAQ</span>
              <h2 className="bs-section-title">Questions teams usually ask first.</h2>
            </div>
            <div className="bs-showcase-stack">
              {faqs.map((item) => (
                <article key={item.question} className="bs-card bs-card-pad bs-feature bs-elevated-card">
                  <h3 className="bs-feature-title bs-showcase-card-title">{item.question}</h3>
                  <p className="bs-feature-copy">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bs-footer">
        <div className="bs-shell bs-footer-inner">
          <nav className="bs-footer-links" aria-label="Footer">
            <a className="bs-link bs-focus-ring" href="#features">Features</a>
            <a className="bs-link bs-focus-ring" href="#top">Roadmap</a>
            <a className="bs-link bs-focus-ring" href="#how-it-works">Documentation</a>
            <a className="bs-link bs-focus-ring" href="mailto:hello@bandsong.app">Contact</a>
            <a className="bs-link bs-focus-ring" href="#top">Privacy</a>
          </nav>
          <p>© {currentYear} BandSong</p>
        </div>
      </footer>

      <Modal open={betaOpen} title="Join the BandSong Beta" onClose={closeBetaModal}>
        {betaSuccess ? (
          <div className="bs-showcase-stack">
            <p className="bs-section-copy">Thanks. You're on the beta interest list for this session.</p>
            <p className="bs-feature-copy">If you prefer email, you can still reach us directly at beta@bandsong.app.</p>
          </div>
        ) : (
          <form className="bs-showcase-stack" onSubmit={handleBetaSubmit} noValidate>
            <div className="bs-form-field">
              <label className="bs-feature-title" htmlFor="beta-email">
                Email address
              </label>
              <input
                id="beta-email"
                className="bs-input bs-focus-ring"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (emailError) {
                    setEmailError('')
                  }
                }}
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'beta-email-error' : undefined}
                placeholder="you@band.com"
              />
              {emailError ? (
                <p className="bs-form-error" id="beta-email-error">
                  {emailError}
                </p>
              ) : null}
            </div>
            <div className="bs-action-row">
              <button type="submit" className="bs-button bs-button-primary bs-focus-ring">
                Join the Beta
              </button>
              <a
                className="bs-button bs-button-secondary bs-focus-ring"
                href="mailto:beta@bandsong.app?subject=BandSong%20Beta"
              >
                Email Instead
              </a>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={demoOpen} title="BandSong Demo (Coming Soon)" onClose={() => setDemoOpen(false)}>
        <div className="bs-showcase-stack">
          <ul className="bs-list-clean bs-showcase-stack" aria-label="Demo flow steps">
            {demoSteps.map((step, index) => (
              <li key={step} className="bs-problem-item">
                <span className="bs-panel-label">0{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <PreviewFrame
            src="/ScreenGrabs/BandSong Suite - Viewer Live_WebP.webp"
            alt="BandSong live viewer screen"
            label="Viewer Live"
            onOpen={() => openViewer(galleryCards[2])}
          />
        </div>
      </Modal>

      <Modal open={viewerImage !== null} title={viewerImage?.label ?? 'Image viewer'} onClose={() => setViewerImage(null)}>
        {viewerImage ? (
          <div className="bs-showcase-stack">
            <div className="bs-badge-row">
              {viewerImage.badges.map((badge) => (
                <span key={badge} className="bs-code-chip">{badge}</span>
              ))}
            </div>
            <p className="bs-feature-copy">{viewerImage.context}</p>
            <div className="bs-viewer-frame">
              <img className="bs-viewer-image" src={viewerImage.src} alt={viewerImage.alt} />
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

export default LandingPage







