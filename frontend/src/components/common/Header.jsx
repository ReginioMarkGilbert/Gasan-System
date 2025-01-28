import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [{ href: "/", label: "Home" }];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-green-700/95 backdrop-blur-sm shadow-lg py-4" : "bg-green-700 py-6"
            }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white">
                    GASAN BMS
                </Link>
                <nav className="hidden md:flex space-x-4 items-center">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="text-white hover:text-green-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Button className="bg-white text-green-700 hover:bg-green-100">
                        <Link to="/sign-in">Login</Link>
                    </Button>
                </nav>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <button
                            className="md:hidden p-0 bg-transparent border-none hover:scale-110 transition-transform duration-300 text-white"
                            onClick={toggleMenu}
                        >
                            <Menu size={24} />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-green-700 text-white">
                        <nav className="flex flex-col space-y-4 mt-6">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="text-lg hover:text-green-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                to="/sign-in"
                                className="text-lg hover:text-green-200"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
