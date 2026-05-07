import { useEffect } from 'react'

type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export type LegalPageContent = {
  path: string
  title: string
  description: string
  label: string
  sections: LegalSection[]
}

const lastUpdated = 'May 7, 2026'
const contactEmail = 'hello@bandsong.app'

export const legalPages: LegalPageContent[] = [
  {
    path: '/terms',
    title: 'Terms of Service',
    label: 'Terms',
    description:
      'Terms of Service for BandSong, a SaaS musician workflow system for songs, setlists, rehearsals, and live performance preparation.',
    sections: [
      {
        title: 'Service Overview',
        paragraphs: [
          'BandSong provides access to web and app-based software for musician workflows. It is a digital SaaS product and does not sell or ship physical goods.',
          'BandSong helps users edit ChordPro and OnSong-style song materials, manage repertoires, plan setlists, prepare rehearsals, support live performance workflows, and coordinate access for band members, performers, studios, and crew members.',
        ],
      },
      {
        title: 'Accounts and Access',
        bullets: [
          'Users must create and manage their own accounts and keep account credentials secure.',
          'Access may vary by selected plan, including Free, Performer, Band, and Elite plans. Elite may support studios, larger teams, production workflows, crew access, schools, or organisations needing more flexibility.',
          'Subscriptions may be billed monthly or annually depending on the selected plan and checkout terms.',
          'Account sharing outside the licensed user, band, studio, or crew access model is not allowed unless BandSong expressly permits it.',
        ],
      },
      {
        title: 'User Content and Music Rights',
        paragraphs: [
          'Users are responsible for all songs, lyrics, chord charts, notes, files, metadata, performance materials, and other content they upload, import, create, or share through BandSong.',
          'Users must have the right to use any lyrics, chord charts, files, arrangements, or performance materials they add to BandSong.',
          'BandSong does not provide licensed songs, copyrighted music databases, unauthorized song downloads, or permission to use third-party music content.',
        ],
      },
      {
        title: 'Acceptable Use',
        bullets: [
          'Do not use BandSong to infringe copyright, privacy, publicity, or other third-party rights.',
          'Do not upload malicious code, attempt to disrupt the service, or bypass access controls.',
          'Do not use BandSong for unlawful, abusive, deceptive, or harmful activity.',
          'Do not resell, sublicense, or commercially exploit BandSong access except as allowed by an active plan or written agreement.',
        ],
      },
      {
        title: 'Availability and Offline-First Limitations',
        paragraphs: [
          'BandSong is designed to support offline-first workflows, but cloud sync, account access, invitations, subscription status, and some collaboration features may require internet connectivity.',
          'Users should prepare and verify critical performance materials before rehearsals, sessions, and live events. BandSong is not liable for missed cues, performance interruptions, data connection issues, device failures, or other live performance problems.',
        ],
      },
      {
        title: 'Cancellations, Pricing, and Plan Changes',
        bullets: [
          'Users may cancel subscriptions to prevent future billing according to the billing portal or checkout provider process.',
          'Cancelling a subscription may reduce or end access at the end of the current billing period.',
          'BandSong may change pricing, plans, limits, and features over time. Material changes will be communicated where practical.',
          'Future subscription billing may be processed through Lemon Squeezy or another payment provider.',
        ],
      },
      {
        title: 'Limitation of Liability',
        paragraphs: [
          'BandSong is provided on an as-available basis. To the maximum extent permitted by law, BandSong is not liable for indirect, incidental, special, consequential, or lost-profit damages.',
          'BandSong is a workflow tool and should not be the only copy of important performance materials. Users remain responsible for backups, rehearsals, device readiness, and live performance decisions.',
        ],
      },
      {
        title: 'Governing Law and Contact',
        paragraphs: [
          'These terms are intended to be governed by the laws of South Africa unless BandSong later specifies otherwise or receives legal advice requiring a different jurisdiction.',
          `Questions about these terms can be sent to ${contactEmail}.`,
        ],
      },
    ],
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    label: 'Privacy',
    description:
      'Privacy Policy for BandSong, including account data, band membership data, song content, payment processing, and service data use.',
    sections: [
      {
        title: 'Information We Collect',
        bullets: [
          'Account data such as name, email address, avatar, profile details, and authentication information where applicable.',
          'Band and membership data such as band names, roles, invitations, member details, studio relationships, and crew access details.',
          'App content such as songs, setlists, notes, metadata, rehearsal data, performance workflow data, and imported or created song materials.',
          'Technical data such as device, browser, logs, usage events, and diagnostics needed to keep the service reliable.',
        ],
      },
      {
        title: 'Payments and Service Providers',
        paragraphs: [
          'BandSong may use Lemon Squeezy to process subscriptions, payments, invoices, taxes, and refunds. Payment card details are handled by the payment processor and are not stored directly by BandSong.',
          'BandSong may use Supabase for authentication, database, storage, backend services, and cloud sync. Analytics and error monitoring may be added in the future to improve reliability and support.',
        ],
      },
      {
        title: 'How We Use Information',
        bullets: [
          'To provide account-based access, cloud sync, collaboration, song management, setlist planning, and performance preparation features.',
          'To manage subscriptions, plan access, billing status, support requests, and service notices.',
          'To improve reliability, troubleshoot errors, prevent abuse, and develop better product workflows.',
          'To respond to user questions, deletion requests, and account support needs.',
        ],
      },
      {
        title: 'User Content and Copyright Responsibility',
        paragraphs: [
          'Users are responsible for the lyrics, chord charts, files, notes, arrangements, and performance materials they upload, import, create, or share in BandSong.',
          'Users must have the right to use any song content or performance material they add. BandSong does not provide unauthorized copyrighted song downloads, licensed music databases, or third-party song permissions.',
        ],
      },
      {
        title: 'Sharing and Sale of Data',
        paragraphs: [
          'BandSong does not sell user data. Data may be shared with service providers only as needed to operate the product, process subscriptions, provide support, maintain security, or comply with legal obligations.',
        ],
      },
      {
        title: 'Retention, Security, and User Rights',
        bullets: [
          'BandSong retains account and app data while an account is active or as needed to provide the service, comply with obligations, resolve disputes, and maintain backups.',
          'Users may request access, correction, export, or deletion of personal data, subject to technical, legal, billing, and backup limitations.',
          'BandSong uses reasonable security measures for a SaaS product, but no online service can guarantee absolute security.',
        ],
      },
      {
        title: 'Contact',
        paragraphs: [`Privacy questions or data requests can be sent to ${contactEmail}.`],
      },
    ],
  },
  {
    path: '/refund-policy',
    title: 'Refund Policy',
    label: 'Refunds',
    description:
      'Refund Policy for BandSong digital subscription plans, including monthly and annual subscriptions, cancellations, duplicate charges, and billing errors.',
    sections: [
      {
        title: 'Digital Subscription Access',
        paragraphs: [
          'BandSong sells digital access to subscription-based software. It does not sell, ship, or return physical products.',
          'Plans may include Free, Performer, Band, and Elite subscription access with different features, limits, and account roles. Elite may support larger teams, studios, crew access, schools, or organisations needing more flexibility.',
        ],
      },
      {
        title: 'Monthly Subscriptions',
        paragraphs: [
          'Monthly subscriptions are generally non-refundable once the billing period has started. Users can cancel to prevent future billing through the billing portal or checkout provider process.',
        ],
      },
      {
        title: 'Annual Subscriptions',
        paragraphs: [
          'Annual subscription refund requests may be reviewed case-by-case if requested within 14 days of the original purchase or renewal. Approval is not automatic and may depend on usage, account status, and the circumstances of the request.',
        ],
      },
      {
        title: 'When Refunds May Be Granted',
        bullets: [
          'Duplicate charges.',
          'Technical billing errors.',
          'Accidental purchases reported promptly.',
          'Other exceptional cases reviewed by BandSong support.',
        ],
      },
      {
        title: 'When Refunds Are Usually Not Granted',
        bullets: [
          'Lack of use after a billing period has started.',
          'Change of mind after extended use.',
          'Failure to cancel before a renewal date.',
          'Loss of access caused by violation of the Terms of Service.',
        ],
      },
      {
        title: 'Payment Processor',
        paragraphs: [
          'Lemon Squeezy may handle payment processing and refund mechanics for BandSong subscriptions. Approved refunds may be returned through the original payment method and may take time to appear depending on the payment provider.',
        ],
      },
      {
        title: 'Contact',
        paragraphs: [`Refund and billing questions can be sent to ${contactEmail}.`],
      },
    ],
  },
]

type LegalPageProps = {
  page: LegalPageContent
}

function LegalPage({ page }: LegalPageProps) {
  useEffect(() => {
    document.title = `${page.title} | BandSong`

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = page.description
  }, [page])

  return (
    <div className="bs-landing bs-legal-page">
      <a className="bs-skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="bs-site-header">
        <div className="bs-shell bs-site-header-inner bs-section-tight bs-site-header-compact">
          <a className="bs-brand bs-focus-ring" href="/" aria-label="BandSong home">
            <img className="bs-brand-logo" src="/BandSong Logo - Type.svg" alt="BandSong" />
          </a>

          <nav className="bs-nav bs-nav-compact bs-legal-nav" aria-label="Legal pages">
            {legalPages.map((legalPage) => (
              <a
                key={legalPage.path}
                className="bs-link bs-focus-ring bs-nav-link"
                href={legalPage.path}
                aria-current={legalPage.path === page.path ? 'page' : undefined}
              >
                {legalPage.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" className="bs-legal-main">
        <section className="bs-section bs-legal-hero">
          <div className="bs-shell">
            <a className="bs-link bs-focus-ring bs-back-link" href="/">
              Back to BandSong
            </a>
            <p className="bs-eyebrow">BandSong Legal</p>
            <h1 className="bs-display bs-legal-title">{page.title}</h1>
            <p className="bs-lead bs-legal-lead">{page.description}</p>
            <p className="bs-feature-copy bs-last-updated">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="bs-section bs-section-tight">
          <div className="bs-shell">
            <article className="bs-card bs-card-pad bs-legal-card">
              {page.sections.map((section) => (
                <section key={section.title} className="bs-legal-section" aria-labelledby={`${page.path.slice(1)}-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <h2
                    className="bs-feature-title bs-legal-section-title"
                    id={`${page.path.slice(1)}-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  >
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="bs-feature-copy bs-legal-copy">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="bs-legal-list">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>

      <footer className="bs-footer">
        <div className="bs-shell bs-footer-inner bs-footer-inner-stacked">
          <div className="bs-footer-brand">
            <p className="bs-footer-product-line">
              BandSong is a musician workflow system for managing songs, setlists, rehearsals, and live performance preparation.
            </p>
            <p>© BandSong · bandsong.app · {contactEmail}</p>
          </div>
          <nav className="bs-footer-links" aria-label="Footer">
            <a className="bs-link bs-focus-ring" href="/terms">Terms of Service</a>
            <a className="bs-link bs-focus-ring" href="/privacy">Privacy Policy</a>
            <a className="bs-link bs-focus-ring" href="/refund-policy">Refund Policy</a>
            <a className="bs-link bs-focus-ring" href={`mailto:${contactEmail}`}>Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default LegalPage
