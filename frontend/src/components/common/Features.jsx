import { Users, FileText, BarChart3 } from "lucide-react"

export default function Features() {
    const features = [
        {
            icon: <Users size={40} />,
            title: "Resident Management",
            description: "Efficiently manage resident information and services",
        },
        {
            icon: <FileText size={40} />,
            title: "Document Processing",
            description: "Streamline document requests and processing",
        },
        {
            icon: <BarChart3 size={40} />,
            title: "Data Analytics",
            description: "Gain insights with powerful reporting and analytics tools",
        },
    ]

    return (
        <section id="features" className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-green-600 mb-4 flex justify-center">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

