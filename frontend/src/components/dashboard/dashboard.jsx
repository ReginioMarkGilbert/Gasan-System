import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { UserList } from "./UserList"

function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-6">Users</h1>
                    <UserList />
                </main>
            </div>
        </div>
    )
}

export default Dashboard;

