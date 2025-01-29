import { useState, useEffect } from "react";
import FormSelector from "@/components/forms/RequestForm/FormSelector";
import { getUserFromLocalStorage } from "@/lib/utils";

export default function DocumentRequestPage() {
    const [user, setUser] = useState(() => getUserFromLocalStorage());

    // Update user when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setUser(getUserFromLocalStorage());
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <FormSelector user={user} />
            </div>
        </div>
    );
}
