import { Requests } from "@/components/dashboard/Requests.jsx";
import BlotterReportPage from "@/pages/BlotterReportPage";
import IncidentReportsPage from "@/pages/IncidentReportsPage";
import { Header } from "./Header";
import Overview from "./Overview"; // Import the Overview component
import { Sidebar } from "./Sidebar";
import { UserList } from "./UserList";
// import Settings from "./Settings"; // Import the Settings component
// import Help from "./Help"; // Import the Help component

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
    const ComponentToRender = componentMap[tab] || Overview; // Fallback to Overview if tab not found

    return (
        <div className="fixed inset-0 flex bg-gray-100 ">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-0">
                <Header />
                <main className="flex-1 min-h-0 h-screen overflow-y-auto p-8 my-auto bg-gradient-to-b from-gray-100 to-gray-200">
                    <ComponentToRender />
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
