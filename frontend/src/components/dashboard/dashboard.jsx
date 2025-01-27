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
};

function Dashboard({ tab }) {
    const ComponentToRender = componentMap[tab] || Overview; // Fallback to Overview if tab not found

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header/>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <ComponentToRender/>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;