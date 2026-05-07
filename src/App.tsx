import LandingPage from './pages/LandingPage'
import LegalPage, { legalPages } from './pages/LegalPage'

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const legalPage = legalPages.find((page) => page.path === path)

  if (legalPage) {
    return <LegalPage page={legalPage} />
  }

  return <LandingPage />
}

export default App
