import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'

type PreviewFrameProps = {
  src?: string
  alt?: string
  label?: string
  children?: ReactNode
  onOpen?: () => void
}

function PreviewFrame({ src, alt = 'Preview image', label, children, onOpen }: PreviewFrameProps) {
  const [hasImageError, setHasImageError] = useState(false)

  useEffect(() => {
    setHasImageError(false)
  }, [src])

  const showImage = Boolean(src) && !hasImageError
  const clickable = showImage && Boolean(onOpen)

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!clickable) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen?.()
    }
  }

  return (
    <div className={`bs-card bs-card-hero bs-preview-shell${clickable ? ' is-clickable' : ''}`}>
      <div
        className="bs-preview-frame"
        style={{ aspectRatio: '1920 / 945' }}
        onClick={clickable ? onOpen : undefined}
        onKeyDown={handleKeyDown}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-label={clickable ? `Open larger view for ${alt}` : undefined}
      >
        {showImage ? (
          <>
            <img
              className="bs-preview-image"
              src={src}
              alt={alt}
              width="1920"
              height="945"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={() => setHasImageError(true)}
            />
            {clickable ? <span className="bs-preview-zoom bs-code-chip">Open larger view</span> : null}
          </>
        ) : (
          <div className="bs-preview-placeholder">
            <div className="bs-preview-topbar">
              {label ? <span className="bs-panel-label bs-panel-label-accent">{label}</span> : null}
              <span className="bs-code-chip">v2.0.0</span>
            </div>
            <div className="bs-preview-placeholder-body">
              {children ?? (
                <>
                  <p className="bs-preview-mono">[Verse] G / D / Em / C</p>
                  <p className="bs-preview-mono">When the chart changes, everybody gets the same one.</p>
                  <p className="bs-preview-mono">[Chorus] C / G / D / Em</p>
                  <p className="bs-preview-mono">Cue: build on bar 5, push to all devices.</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviewFrame
