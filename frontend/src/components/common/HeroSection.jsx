import { Button } from "@/components/ui/button"

export default function HeroSection() {
    return (
        <section className="bg-green-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to GASAN Barangay Management System</h1>
                <p className="text-xl mb-8">Empowering our community through efficient digital governance</p>
                <Button className="bg-white text-green-700 hover:bg-green-100">Get Started</Button>
            </div>
        </section>
    )
}

