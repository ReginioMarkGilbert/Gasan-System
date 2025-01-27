import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="bg-white border-b px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input type="search" placeholder="Search..." className="pl-8 w-64" />
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                        John Doe
                    </Button>
                </div>
            </div>
        </header>
    );
}