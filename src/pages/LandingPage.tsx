import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import PreviewFrame from '../components/PreviewFrame'
import {
  chordIntelligenceCards,
  featurePillars,
  faqs,
  galleryScreens,
  importExportCards,
  navLinks,
  problemPoints,
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
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [showHeroProductPreview, setShowHeroProductPreview] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [galleryDirection, setGalleryDirection] = useState<1 | -1>(1)
  const [viewerImage, setViewerImage] = useState<ViewerImage | null>(null)
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
    setEmailError('')
    setBetaSuccess(false)
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
          <div className="bs-shell bs-hero-center">
            <div className="bs-hero-copy-wrap">
              <p className="bs-eyebrow bs-hero-eyebrow">Musician Workflow System</p>
              <h1 className="bs-display bs-hero-display">
                <span className="bs-hero-line">Everyone plays</span>
                <span className="bs-hero-line">the same version.</span>
                <span className="bs-hero-line">Every time.</span>
              </h1>
              <p className="bs-lead bs-lead-hero bs-hero-lead">
                BandSong Suite is the musician workflow system for rehearsals and live performance. Edit songs, plan setlists, and perform from a calm stage-ready viewer - synced across devices.
              </p>
              <p className="bs-feature-copy bs-hero-note">Songs come first. Calm tools beat feature overload.</p>
              <div className="bs-action-row bs-hero-actions">
                <button type="button" className="bs-button bs-button-primary bs-focus-ring" onClick={openBetaModal}>
                  Join the Beta
                </button>
                <div
                  className="bs-hero-product-anchor"
                  onMouseEnter={() => setShowHeroProductPreview(true)}
                  onMouseLeave={() => setShowHeroProductPreview(false)}
                >
                  <button type="button" className="bs-button bs-button-secondary bs-focus-ring" onClick={() => openGallery(0)}>
                    Watch Demo
                  </button>
                  <div className={`bs-hero-product-tooltip${showHeroProductPreview ? ' is-visible' : ''}`} aria-hidden={showHeroProductPreview ? 'false' : 'true'}>
                    <div className="bs-card bs-card-pad bs-hero-product-card">
                      <span className="bs-panel-label">Suite Preview (Editor ? Viewer ? Setlist)</span>
                      <img
                        className="bs-hero-product-image"
                        src="/ScreenGrabs/BandSong Suite - Editor_WebP.webp"
                        alt="BandSong Suite editor preview"
                        width="1920"
                        height="945"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bs-section" aria-labelledby="problem-title">
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

        <section className="bs-section" id="how-it-works"> 
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Workflow</span>
              <h2 className="bs-section-title">Publish once. Everyone stays aligned.</h2>
              <p className="bs-section-copy">BandSong keeps one trusted version of every song. When you update a chart or arrangement, your group stays synchronized across devices - with the confidence to rehearse and perform without version guessing.</p>
            </div>
            <div className="bs-workflow-flow" aria-label="BandSong workflow">
              {workflowSteps.map((step, index) => (
                <article key={step.title} className="bs-card bs-card-pad bs-feature bs-workflow-step">
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

        <section className="bs-section" id="workflow" aria-labelledby="suite-title">
          <div className="bs-shell">
            <div className="bs-section-head">
              <span className="bs-panel-label">Workflow</span>
              <h2 className="bs-section-title" id="suite-title">A complete workflow - not just a chord viewer.</h2>
            </div>
            <div className="bs-workflow-grid" aria-label="BandSong Suite workflow tools">
              {suiteCards.map((card) => {
                const previewSrc = card.previewSrc

                return (
                  <article key={card.title} className="bs-card bs-card-pad bs-feature bs-showcase-card bs-workflow-card">
                    <PreviewFrame
                      variant="card"
                      src={previewSrc}
                      alt={card.previewAlt ?? card.title}
                      label={card.previewLabel}
                      onOpen={
                        previewSrc
                          ? () => openViewer(previewSrc, card.previewAlt ?? card.title, card.previewLabel ?? card.title)
                          : undefined
                      }
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

        <section className="bs-section bs-section-tight" id="chords" aria-labelledby="chord-intelligence-title">
          <div className="bs-shell">
            <div className="bs-section-head bs-section-head-compact">
              <span className="bs-panel-label">Chords</span>
              <h2 className="bs-section-title" id="chord-intelligence-title">Chord intelligence, connected to your actual songs.</h2>
              <p className="bs-section-copy">Explore voicings and harmony in context ? not as isolated theory. BandSong links chord tools directly to the songs and setlists you?re working on.</p>
            </div>
            <div className="bs-intelligence-strip" aria-label="Song intelligence capabilities">
              {chordIntelligenceCards.map((card) => (
                <article key={card.title} className="bs-card bs-card-pad bs-intelligence-card">
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


        <section className="bs-section bs-section-tight" id="readability" aria-labelledby="appearance-title">
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
              <aside className="bs-card bs-card-pad bs-showcase-stack bs-appearance-preview-card" aria-label="Viewer readability preview">
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

        <section className="bs-section bs-section-tight" aria-labelledby="trust-title">
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
                  <p className="bs-feature-copy">That is why the product stays content-first, avoids noisy UI, and keeps the trusted version of the song in front of the band.</p>
                </div>
              </article>
              <div className="bs-trust-proof-grid" aria-label="Trust points">
                <article className="bs-card bs-card-pad bs-trust-proof-card">
                  <span className="bs-workflow-step-number">01</span>
                  <h3 className="bs-feature-title">Offline-first</h3>
                  <p className="bs-feature-copy">Your songs stay available when internet disappears, so rehearsal does not depend on signal quality.</p>
                </article>
                <article className="bs-card bs-card-pad bs-trust-proof-card bs-trust-proof-card-accent">
                  <span className="bs-workflow-step-number">02</span>
                  <h3 className="bs-feature-title">Performance-safe UI</h3>
                  <p className="bs-feature-copy">The interface stays calm under pressure, so musicians can read, follow, and play instead of hunting through controls.</p>
                </article>
                <article className="bs-card bs-card-pad bs-trust-proof-card">
                  <span className="bs-workflow-step-number">03</span>
                  <h3 className="bs-feature-title">Built by a band</h3>
                  <p className="bs-feature-copy">Real rehearsal constraints shaped the product from the start, not just feature ideas on a roadmap.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bs-section bs-section-tight" id="features" aria-labelledby="features-title">
          <div className="bs-shell">
            <div className="bs-section-head bs-section-head-compact">
              <span className="bs-panel-label">Features</span>
              <h2 className="bs-section-title" id="features-title">Why BandSong stays clear when rehearsals change.</h2>
            </div>
            <div className="bs-feature-pillars-grid" aria-label="BandSong feature pillars">
              {featurePillars.map((feature) => (
                <article key={feature.title} className="bs-card bs-card-pad bs-feature bs-elevated-card bs-feature-pillar-card">
                  <h3 className="bs-feature-title bs-showcase-card-title">{feature.title}</h3>
                  <p className="bs-feature-copy">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bs-section" id="migration" aria-labelledby="migration-title">
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
                  <p className="bs-feature-copy">Bring over your material, verify the structure, and land on one trusted version the whole group can use.</p>
                </div>
              </article>
              <div className="bs-workflow-flow bs-migration-flow" aria-label="Migration flow">
                <article className="bs-card bs-card-pad bs-feature bs-workflow-step bs-migration-step">
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
                <article className="bs-card bs-card-pad bs-feature bs-workflow-step bs-migration-step">
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

        <section className="bs-section" id="import-export" aria-labelledby="import-export-title">
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
                  <article key={card.title} className={`bs-card bs-card-pad bs-feature bs-import-card${index === 1 ? ' bs-import-card-accent' : ''}`}>
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
              <p className="bs-feature-copy bs-beta-note">Early access, thoughtful updates, and a clear way to shape the product.</p>
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
            <a className="bs-link bs-focus-ring" href="#how-it-works">Workflow</a>
            <a className="bs-link bs-focus-ring" href="#import-export">Import/Export</a>
            <a className="bs-link bs-focus-ring" href="mailto:hello@bandsong.app">Contact</a>
            <a className="bs-link bs-focus-ring" href="#beta">Beta</a>
          </nav>
          <p>(c) {currentYear} BandSong</p>
        </div>
      </footer>

      <Modal open={betaOpen} title="Join the BandSong Beta" onClose={closeBetaModal}>
        {betaSuccess ? (
          <div className="bs-showcase-stack">
            <p className="bs-section-copy">Thanks. You are on the beta interest list for this session.</p>
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








