// App Component
import './App.css'
import { ShootingStars } from './components/ui/shooting-stars'
import { StarsBackground } from './components/ui/stars-background'
import { Header } from './components/Header'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <div className="min-h-screen w-full relative bg-black overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <StarsBackground 
          showLightning={true} 
          lightningFrequency={8000}
        />
        <ShootingStars 
          starColor="#9D4EDD" 
          trailColor="#6A0DAD" 
          minDelay={800} 
          maxDelay={3000}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
      </div>
    </div>
  )
}

export default App
