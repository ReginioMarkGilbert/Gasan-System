import { Requests } from "@/components/dashboard/Requests.jsx";
import BlotterReportPage from "@/pages/BlotterReportPage";
import IncidentReportsPage from "@/pages/IncidentReportsPage";
import { Header } from "./Header";
import Overview from "./Overview";
import { UserList } from "./UserList";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { cn, getUserFromLocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FileText, LayoutDashboard, Mail, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";

const componentMap = {
    overview: Overview,
    users: UserList,
    home: Overview, // Map 'home' tab to Overview component
    // settings: Settings,
    // help: Help,
    requests: Requests,
    reports: IncidentReportsPage,
    blotter: BlotterReportPage,
};

function Dashboard({ tab }) {
    const ComponentToRender = componentMap[tab] || Overview;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = getUserFromLocalStorage();
        setUser(user);
    }, []);

    const sidebarItems = user?.role === "user"
        ? [
            {
                icon: LayoutDashboard,
                label: "Overview",
                href: "/dashboard?tab=overview",
            },
            {
                icon: Mail,
                label: "Requests",
                href: "/dashboard?tab=requests"
            },
            {
                icon: FileText,
                label: "Incident reports",
                href: "/dashboard?tab=reports",
            },
            {
                icon: FileText,
                label: "Blotter Report",
                href: "/dashboard?tab=blotter",
            },
            {
                icon: Settings,
                label: "Settings",
                href: "/dashboard?tab=settings"
            },
        ]
        : [
            {
                icon: LayoutDashboard,
                label: "Overview",
                href: "/dashboard?tab=overview",
            },
            {
                icon: Users,
                label: "Users",
                href: "/dashboard?tab=users"
            },
            {
                icon: Mail,
                label: "Request",
                href: "/dashboard?tab=request-admin",
            },
            {
                icon: FileText,
                label: "Incident Report",
                href: "/dashboard?tab=incident-report-admin",
            },
            {
                icon: Users,
                label: "Residents",
                href: "/dashboard?tab=residents"
            },
        ];

    return (
        <SidebarProvider>
            <div className="fixed inset-0 flex bg-gray-100">
                <Sidebar className="border-r border-green-800 bg-green-700 [&_[data-radix-sidebar-content]]:bg-green-700 [&_[data-radix-sidebar-trigger]]:text-white">
                    <SidebarHeader className="border-b border-green-800 p-4 bg-green-700">
                        <span className="text-2xl font-semibold text-white">
                            BMS
                        </span>
                    </SidebarHeader>
                    <SidebarContent className="bg-green-700">
                        <SidebarMenu className="bg-green-700 p-2 space-y-2">
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.href} className="bg-green-700">
                                    <SidebarMenuButton
                                        asChild
                                        isActive={tab === item.href.split("=")[1]}
                                        className={cn(
                                            "w-full text-white hover:bg-green-600 transition-colors p-2 rounded-lg",
                                            tab === item.href.split("=")[1] && "bg-green-600 text-white font-semibold"
                                        )}
                                    >
                                        <Link to={item.href} className="flex items-center gap-3">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
                <div className="flex-1 flex flex-col min-h-0">
                    <Header />
                    <main className="flex-1 min-h-0 h-screen overflow-y-auto p-8 my-auto bg-gradient-to-b from-gray-100 to-gray-200">
                        <ComponentToRender />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}

export default Dashboard;
