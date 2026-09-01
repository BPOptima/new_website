import SmoothScroll from './components/SmoothScroll'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Logos from './sections/Logos'
import Problem from './sections/Problem'
import Pipeline from './sections/Pipeline'
import Models from './sections/Models'
import Solutions from './sections/Solutions'
import Stats from './sections/Stats'
import Security from './sections/Security'
import Founder from './sections/Founder'
import Contact from './sections/Contact'

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-bg">
        <Nav />
        <main>
          <Hero />
          <Logos />
          <Problem />
          <Pipeline />
          <Models />
          <Solutions />
          <Stats />
          <Security />
          <Founder />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
