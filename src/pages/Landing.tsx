import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import ProductShowcase from '../components/ProductShowcase';
import TechPipeline from '../components/TechPipeline';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <ProductShowcase />
        <TechPipeline />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
