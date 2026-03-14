export type ScreenContext = {
  src: string
  alt: string
  label: string
  context: string
  badges: string[]
}

export const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#migration', label: 'Migration' },
  { href: '#beta', label: 'Beta' },
  { href: '#faq', label: 'FAQ' },
]

export const problemPoints = [
  'Chord charts scattered across WhatsApp',
  'Multiple versions of the same song',
  'Last-minute key changes nobody receives',
  'Different apps on iOS and Android',
  'Students practicing outdated material',
]

export const workflowSteps = [
  'A new version is published',
  'Every member instantly receives the update',
  'Previous versions can be restored anytime',
]

export const demoSteps = [
  'Open a shared song editor with the latest arrangement.',
  'Publish an update once for the whole group.',
  'Watch every device receive the same version instantly.',
  'Build a setlist around the updated material.',
  'Walk into rehearsal knowing everyone is aligned.',
]

export const heroPreview: ScreenContext = {
  src: '/ScreenGrabs/BandSong Suite - Editor_WebP.webp',
  alt: 'BandSong editor screen',
  label: 'Editor UI Preview',
  context: 'Used by leaders to edit structure, cues, and song metadata before publishing.',
  badges: ['Preparation', 'Publishing', 'Song detail'],
}

export const previewCards: Array<ScreenContext & { title: string; copy: string }> = [
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

export const galleryCards: Array<ScreenContext & { title: string }> = [
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

export const featurePillars = [
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

export const faqs = [
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
