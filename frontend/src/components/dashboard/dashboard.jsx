import {Sidebar} from "./Sidebar";
import {Header} from "./Header";
import {UserList} from "./UserList";
import {useLocation} from "react-router-dom";
import Overview from "./Overview"; // Import the Overview component
// import Settings from "./Settings"; // Import the Settings component
// import Help from "./Help"; // Import the Help component

const componentMap = {
    overview: Overview,
    users: UserList,
    // settings: Settings,
    // help: Help,
};

function Dashboard() {
    const location = useLocation();
    const tab = new URLSearchParams(location.search).get("tab") || "overview";
    const ComponentToRender = componentMap[tab] || UserList;

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