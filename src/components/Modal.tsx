import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'

type ModalProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function Modal({ open, title, onClose, children }: ModalProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    const firstFocusable = focusables && focusables.length > 0 ? focusables[0] : panel
    firstFocusable?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panel) {
        return
      }

      const trapped = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (trapped.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }

      const first = trapped[0]
      const last = trapped[trapped.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      restoreFocusRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="bs-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        className="bs-card bs-card-pad bs-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bs-modal-head">
          <h2 className="bs-section-title bs-modal-title" id={titleId}>
            {title}
          </h2>
          <button type="button" className="bs-button bs-button-secondary bs-focus-ring" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="bs-modal-content">{children}</div>
      </div>
    </div>
  )
}

export default Modal
