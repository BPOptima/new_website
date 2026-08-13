import { useState } from 'react'
import type { Page } from './types'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Platform from './pages/Platform'
import HowItWorks from './pages/HowItWorks'
import Models from './pages/Models'
import Solutions from './pages/Solutions'
import CaseStudies from './pages/CaseStudies'
import Security from './pages/Security'
import Company from './pages/Company'
import Pricing from './pages/Pricing'
import Resources from './pages/Resources'
import Contact from './pages/Contact'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [darkMode, setDarkMode] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)

  const navigate = (p: Page) => {
    setPage(p)
    setTransitionKey(k => k + 1)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <Nav page={page} navigate={navigate} darkMode={darkMode} toggleDark={() => setDarkMode(d => !d)} />
        <main key={transitionKey} className="flex-1 page-enter">
          {page === 'home'         && <Home navigate={navigate} />}
          {page === 'how-it-works' && <HowItWorks navigate={navigate} darkMode={darkMode} />}
          {page === 'platform'     && <Platform navigate={navigate} />}
          {page === 'models'       && <Models navigate={navigate} />}
          {page === 'solutions'    && <Solutions navigate={navigate} />}
          {page === 'case-studies' && <CaseStudies navigate={navigate} />}
          {page === 'security'     && <Security navigate={navigate} />}
          {page === 'company'      && <Company navigate={navigate} />}
          {page === 'pricing'      && <Pricing navigate={navigate} />}
          {page === 'resources'    && <Resources navigate={navigate} />}
          {page === 'contact'      && <Contact navigate={navigate} />}
        </main>
        <Footer navigate={navigate} />
      </div>
    </div>
  )
}
