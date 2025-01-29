import gasanHall from "@/assets/gasan.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white pt-32 pb-24 overflow-hidden select-text">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h1
                            className="text-4xl lg:text-7xl font-bold mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Welcome to <br />
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                GASAN BMS
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-xl mb-8 text-gray-200 max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            Empowering our community through efficient digital governance.
                            Experience seamless barangay services at your fingertips.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                                <Link to="/get-started">Get Started</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white text-green-700 hover:bg-green-50"
                                onClick={() => navigate("/sign-in")}
                            >
                                Sign In
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <img
                            src={gasanHall}
                            alt="Gasan Municipal Town Hall"
                            width={800}
                            height={600}
                            loading="eager"
                            decoding="async"
                            className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
                            style={{ aspectRatio: "4/3" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
