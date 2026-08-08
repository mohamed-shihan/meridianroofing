import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import ConstructionDissolve from '@/components/sections/ConstructionDissolve'
import TheApproach from '@/components/sections/TheApproach'
import TheGrounds from '@/components/sections/TheGrounds'
import TheCourtyard from '@/components/sections/TheCourtyard'
import Specifications from '@/components/sections/Specifications'
import Gallery from '@/components/sections/Gallery'
import Transformations from '@/components/sections/Transformations'
import Inquiry from '@/components/sections/Inquiry'
import Footer from '@/components/sections/Footer'

export default function Page() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ConstructionDissolve />
      <TheApproach />
      <TheGrounds />
      <TheCourtyard />
      <Specifications />
      <Gallery />
      <Transformations />
      <Inquiry />
      <Footer />
    </main>
  )
}
