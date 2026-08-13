import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import Navbar from '../components/Navbar'
import LabSection from '../components/LabSection'
import ClosingSection from '../components/ClosingSection'
import SEO from '../components/SEO';

export default function Labs() {
    // Initialize Lenis smooth scrolling
    

    return (
        <div className="relative bg-black min-h-screen">
            <SEO title="Labs" description="Explore the Labs page of Kalpesh Katariya portfolio." />
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 noise-texture pointer-events-none z-0" />

            {/* Navbar */}
            <Navbar />

            {/* Spacer for navbar */}
            <div className="h-24" />

            {/* Lab Section */}
            <LabSection />

            {/* Closing / Footer */}
            <ClosingSection />
        </div>
    )
}
