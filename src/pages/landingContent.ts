export type PreviewCard = {
  title: string
  body: string
  bullets: string[]
  previewLabel?: string
  previewSrc?: string
  previewAlt?: string
}

export type GalleryScreen = {
  title: string
  description: string
  src: string
  alt: string
  label: string
}

export type PricingTier = {
  name: string
  price: string
  cadence?: string
  bestFor: string
  features: string[]
  cta: string
  badge?: string
  highlighted?: boolean
  contact?: boolean
}

export type CrewAccessCard = {
  role: string
  copy: string
}

export type AudienceCard = {
  title: string
  copy: string
}

export type AudienceGroup = {
  label: string
  title: string
  copy: string
  people: string[]
}

export type RoadmapPhase = {
  label: string
  title: string
  copy: string
  bullets: string[]
  future?: boolean
}

export const navLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#import-export', label: 'Import/Export' },
  { href: '#migration', label: 'Migration' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#beta', label: 'Beta' },
]

export const audienceGroups: AudienceGroup[] = [
  {
    label: 'Perform',
    title: 'Musicians preparing and playing',
    copy: 'For people who need their own charts, setlists, and stage-ready reading surface.',
    people: ['Live bands', 'Session musicians', 'Solo performers', 'Band members'],
  },
  {
    label: 'Lead',
    title: 'People coordinating the music',
    copy: 'For the roles responsible for keeping arrangements, versions, and rehearsal decisions aligned.',
    people: ['Band leaders', 'Music directors', 'Worship teams', 'Studios and organisations'],
  },
  {
    label: 'Support',
    title: 'Crew and planning roles',
    copy: 'For the people around the band who need context without disrupting the core song workflow.',
    people: ['Sound engineers', 'Lighting engineers', 'Managers and agents', 'Production crew'],
  },
]

export const compatibilityBadges = [
  'Offline-first',
  'ChordPro compatible',
  'OnSong-friendly',
  'Export anytime',
  'No lock-in',
  'Cross-device workflow',
  'Crew-ready',
  'Performance-safe viewer',
]

export const betaRoleOptions = [
  'Solo performer',
  'Band leader',
  'Band member',
  'Worship/music director',
  'Sound engineer',
  'Lighting engineer',
  'Manager/agent',
  'Studio/organisation',
  'Other',
]

export const roadmapPhases: RoadmapPhase[] = [
  {
    label: 'Phase 1',
    title: 'Rehearsal and performance workflow',
    copy:
      "BandSong's current focus is the core workflow: trusted song versions, ChordPro-style editing, repertoire control, setlist planning, publish/sync behaviour, crew access, and a calm live viewer.",
    bullets: [
      'Song editing',
      'Repertoire management',
      'Setlists',
      'Live viewer',
      'Band/crew access',
      'Import/export',
      'Beta subscriptions',
    ],
  },
  {
    label: 'Phase 2',
    title: 'AI-assisted rehearsal intelligence',
    copy:
      "Future AI features may help bands prepare faster by suggesting set compilations, smoother transitions between songs, arrangement improvements, and possible chord-change ideas based on the material inside the user's own library.",
    bullets: [
      'Auto setlist/set compilation suggestions',
      'Transition suggestions between songs',
      'Suggested chord changes',
      'Arrangement and rehearsal planning assistance',
    ],
    future: true,
  },
  {
    label: 'Phase 3',
    title: 'Song-linked FX and performance hardware',
    copy:
      'Longer term, BandSong may connect song and setlist context to performance hardware, allowing vocal, guitar, and multi-FX settings to be associated with specific songs or sections on supported devices in future.',
    bullets: [
      'Vocal FX context',
      'Guitar FX context',
      'Boss/Roland-style hardware workflows',
      'Song-specific patches or cues',
      'Section-based FX assignments',
    ],
    future: true,
  },
]

export const crewAccessCards: CrewAccessCard[] = [
  {
    role: 'Manager / Agent',
    copy: 'View band details, performance notes, venue information, and planning context.',
  },
  {
    role: 'Sound Engineer',
    copy: 'Access setlists, song notes, lead vocal notes, arrangement cues, and technical notes.',
  },
  {
    role: 'Lighting Engineer',
    copy: 'Follow the setlist with feel cues, section changes, and performance flow.',
  },
  {
    role: 'Production Crew',
    copy: 'Support multiple bands from one BandSong account where access is granted.',
  },
]

export const problemPoints = [
  'Different song versions floating around',
  'Last-minute key changes nobody receives',
  'Charts split across PDFs, WhatsApp, and folders',
  "Setlists change, but the band doesn't",
  "Nobody's sure what's 'performance ready'",
]

export const workflowSteps = [
  {
    label: 'Publish',
    title: 'A new version is published',
    detail: 'A leader updates the trusted chart or arrangement once.',
  },
  {
    label: 'Sync',
    title: 'Every member instantly receives the update',
    detail: 'The current version reaches the group without manual chasing.',
  },
  {
    label: 'Restore',
    title: 'Previous versions can be restored anytime',
    detail: 'If a change does not land, the band can revert with confidence.',
  },
]

export const suiteCards: PreviewCard[] = [
  {
    title: 'Song Editor',
    body: 'Write and maintain trusted charts with sections, chords, lyrics, notes, and rehearsal status.',
    bullets: [
      'ChordPro-style editing + section structure',
      'Band notes + personal notes',
      'Key management + transposition',
    ],
    previewLabel: 'Editor',
    previewSrc: '/ScreenGrabs/BandSong Suite - Editor_WebP.webp',
    previewAlt: 'BandSong Suite song editor screen',
  },
  {
    title: 'Viewer (Live Mode)',
    body: 'A minimal, stage-ready surface that shows only what musicians need while playing.',
    bullets: [
      'Clean chord + lyric display',
      'Setlist navigation + section awareness',
      'Live mode optimized for performance',
    ],
    previewLabel: 'Viewer',
    previewSrc: '/ScreenGrabs/BandSong Suite - Viewer Live_WebP.webp',
    previewAlt: 'BandSong Suite live viewer screen',
  },
  {
    title: 'Setlist Builder',
    body: 'Plan rehearsals and gigs with drag-and-drop sequencing and current-song awareness.',
    bullets: [
      'Build, reorder, and run setlists',
      'Rehearsal planning workflows',
      'Tight integration with songs + notes',
    ],
    previewLabel: 'Setlists',
    previewSrc: '/ScreenGrabs/BandSong Suite - Setlists_WebP.webp',
    previewAlt: 'BandSong Suite setlist builder screen',
  },
  {
    title: 'Repertoire Control (Table View)',
    body: 'Scan your full library, compare readiness, and decide what to rehearse next.',
    bullets: [
      'Statuses + tags for fast decisions',
      'Jump into edit or setlist instantly',
      'Find rehearsal priorities quickly',
    ],
    previewLabel: 'Table',
    previewSrc: '/ScreenGrabs/BandSong Suite - Table_WebP.webp',
    previewAlt: 'BandSong Suite repertoire table screen',
  },
]

export const chordIntelligenceCards: PreviewCard[] = [
  {
    title: 'Chord Library (Guitar & Piano voicings)',
    body: '',
    bullets: [
      'Playable voicings, not just names',
      'Filters by category and instrument',
      'Designed for rehearsal speed',
    ],
  },
  {
    title: 'Theory helpers (formulas + compatible scales)',
    body: '',
    bullets: [
      'Chord structure at a glance',
      'Scale suggestions for context',
      'Practical, not academic',
    ],
  },
  {
    title: 'Song usage intelligence',
    body: '',
    bullets: [
      'See where a chord is used',
      'Spot common progressions',
      'Understand your repertoire faster',
    ],
  },
]


export const featurePillars = [
  {
    title: 'Version certainty',
    body: 'Controlled song versions so rehearsal and stage runs stay consistent.',
  },
  {
    title: 'Rehearsal-to-stage workflow',
    body: 'Edit, plan, and perform from a single calm system built for real band routines.',
  },
  {
    title: 'Cross-device coordination',
    body: 'Designed for mixed devices and mixed skill levels - everyone stays aligned.',
  },
]

export const importExportCards: PreviewCard[] = [
  {
    title: 'ChordPro import (smart parsing)',
    body: 'Paste or upload ChordPro and BandSong parses sections, lyrics, and chord lines into a clean, editable song. Common quirks are handled gracefully - inconsistent spacing, repeated section labels, and inline chords.',
    bullets: [
      'Understands standard ChordPro directives (titles, sections, comments)',
      'Normalizes spacing so chords align consistently',
      'Keeps your original text intact - no lock-in formatting',
    ],
  },
  {
    title: 'PDF import wizard (guided cleanup)',
    body: 'Have chord charts stuck in PDFs? Use a guided import flow to extract text, map sections, and review chords before saving. Guided review before saving - nothing is auto-published.',
    bullets: [
      'Step-by-step extraction and cleanup',
      'Review screen before saving',
      'Works well for scanned or inconsistent charts (with manual correction)',
    ],
  },
  {
    title: 'Export anytime',
    body: 'BandSong keeps your library portable. Export songs when you need to share, archive, or switch workflows.',
    bullets: [
      'Export to ChordPro for compatibility',
      'Export PDFs for printing or sharing',
      'Your data stays yours',
    ],
  },
]

export const faqs = [
  {
    question: 'Is BandSong just a chord viewer?',
    answer: "No - it's a rehearsal and live-performance workflow system: editor, setlists, viewer, repertoire control, and chord tools in one place.",
  },
  {
    question: 'Does it work offline?',
    answer: 'Yes. BandSong is designed to keep songs available when connection quality drops.',
  },
  {
    question: 'Does it support iOS and Android?',
    answer: 'Yes - the goal is a synced cross-device workflow so every member can participate.',
  },
  {
    question: 'Can I import from OnSong / ChordPro?',
    answer: 'Yes. Import ChordPro and migrate quickly, with export options so your library stays portable.',
  },
  {
    question: 'Can I customize readability for stage use?',
    answer: 'Yes - themes, chord rendering, and viewer layout controls help you tune readability for lighting and preference.',
  },
]

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    bestFor: 'Trying BandSong and testing the core workflow.',
    features: [
      'Limited song/repertoire management',
      'Basic ChordPro-style editing',
      'Basic setlist creation',
      'Local access where available',
      'Mobile backup access',
    ],
    cta: 'Start Free',
  },
  {
    name: 'Performer',
    price: '$6',
    cadence: '/month or $60/year',
    bestFor: 'Solo performers, worship leaders, session musicians, and individual musicians.',
    features: [
      'Full personal song library',
      'ChordPro / OnSong-style editing',
      'Personal setlists',
      'Performance viewer',
      'Import/export tools where available',
      'Cloud sync/account access',
    ],
    cta: 'Choose Performer',
  },
  {
    name: 'Band',
    price: '$15',
    cadence: '/month or $150/year',
    bestFor: 'Bands and small music teams that need one trusted shared repertoire.',
    features: [
      'Everything in Performer',
      '1 band workspace',
      'Shared repertoire',
      'Shared setlists',
      'Band member roles',
      'Member invitations',
      'Publish once / keep everyone aligned workflow',
      'Up to 6 members included',
    ],
    cta: 'Choose Band',
    badge: 'Popular',
    highlighted: true,
  },
  {
    name: 'Elite',
    price: 'Contact directly',
    bestFor:
      'Studios, larger bands, worship teams, production teams, schools, and organisations needing more flexibility.',
    features: [
      'Multiple band/workspace support',
      'Larger member limits',
      'Crew access options',
      'Advanced workflow setup',
      'Priority onboarding/support',
      'Custom requirements discussion',
    ],
    cta: 'Contact BandSong',
    contact: true,
  },
]

export const galleryScreens: GalleryScreen[] = [
  {
    title: 'Song Editor',
    description: 'Build the trusted version of each song with structure, lyrics, chords, notes, and clear rehearsal status before you publish.',
    src: '/ScreenGrabs/BandSong Suite - Editor_WebP.webp',
    alt: 'BandSong Suite song editor screen',
    label: 'Editor',
  },
  {
    title: 'Viewer (Live Mode)',
    description: 'Perform from a calm, stage-ready surface that keeps the current chart readable and easy to follow during live playback.',
    src: '/ScreenGrabs/BandSong Suite - Viewer Live_WebP.webp',
    alt: 'BandSong Suite live viewer screen',
    label: 'Viewer',
  },
  {
    title: 'Setlist Builder',
    description: 'Sequence rehearsals and gigs, reorder songs quickly, and keep the band aligned to the current run order.',
    src: '/ScreenGrabs/BandSong Suite - Setlists_WebP.webp',
    alt: 'BandSong Suite setlist builder screen',
    label: 'Setlists',
  },
  {
    title: 'Repertoire Table',
    description: 'Scan the full library, compare readiness, and decide what needs attention before the next rehearsal or set.',
    src: '/ScreenGrabs/BandSong Suite - Table_WebP.webp',
    alt: 'BandSong Suite repertoire table screen',
    label: 'Table',
  },
  {
    title: 'Chord Library',
    description: 'Explore practical voicings and harmony helpers in context so musicians can make faster arrangement decisions.',
    src: '/ScreenGrabs/BandSong Suite - Chords_WebP.webp',
    alt: 'BandSong Suite chord library screen',
    label: 'Chords',
  },
  {
    title: 'Appearance & Settings',
    description: 'Adjust themes, accents, and readability controls so the app stays comfortable in rehearsal rooms and on stage.',
    src: '/ScreenGrabs/BandSong Suite - Settings_WebP.webp',
    alt: 'BandSong Suite settings and appearance screen',
    label: 'Settings',
  },
]
