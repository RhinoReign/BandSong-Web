import { Analytics } from '@vercel/analytics/react'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <>
      <LandingPage />
      <Analytics />
    </>
  )
}

export default App
