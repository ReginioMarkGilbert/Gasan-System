import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [{ href: "/", label: "Home" }];

  return (
    <header className="bg-green-700 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          GASAN BMS
        </Link>
        <nav className="hidden md:flex space-x-4 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="hover:text-green-200"
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
              className="md:hidden p-0 bg-transparent border-none hover:scale-110 transition-transform duration-300"
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
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
