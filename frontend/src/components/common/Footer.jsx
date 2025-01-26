import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-green-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">GASAN BMS</h3>
                        <p>Empowering our barangays through technology</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#features" className="hover:text-green-200">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#about" className="hover:text-green-200">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="hover:text-green-200">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p>Municipality of Gasan</p>
                        <p>Marinduque, Philippines</p>
                        <p>Email: info@gasanbms.gov.ph</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2023 GASAN Barangay Management System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

