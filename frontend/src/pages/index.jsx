import Header from "@/components/common/Header"
import HeroSection from "@/components/common/HeroSection"
import Features from "@/components/common/Features"
import Footer from "@/components/common/Footer"

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <HeroSection />
                <Features />
            </main>
            <Footer />
        </div>
    )
}

