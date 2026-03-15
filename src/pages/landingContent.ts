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

export const navLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#import-export', label: 'Import/Export' },
  { href: '#migration', label: 'Migration' },
  { href: '#beta', label: 'Beta' },
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
    body: 'One trusted version of every song - so rehearsal and stage runs stay consistent.',
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
    answer: 'Yes. BandSong is offline-first so your songs remain available when internet disappears.',
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
