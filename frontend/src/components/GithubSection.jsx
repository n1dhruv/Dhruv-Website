import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const GithubSection = () => {
    const username = "dhruv14122004";
    const themeParams = "&title_color=ff4d00&text_color=ffffff&icon_color=ff4d00&bg_color=1a1a1a&hide_border=false&border_color=333333&border_radius=0";

    const pinnedRepos = [
        { owner: "dhruv14122004", repo: "Dhruv-Website", desc: "Personal portfolio source code" },
        { owner: "dhruv14122004", repo: "canary-deployment-without-using-service-mesh", desc: "Kubernetes deployment strategy" },
        { owner: "dhruv14122004", repo: "Ticket_Booking_app", desc: "Blockchain NFT ticketing platform" },
        { owner: "nikkhilpareek", repo: "virtual_trading_app", desc: "Virtual stock trading simulation" },
        { owner: "devrishivermaa", repo: "capsule-commandos", desc: "Vision classification models" }
    ];

    return (
        <section id="opensource" className="pt-20 pb-4">
            <div className="w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading uppercase text-retro-text section-title">
                        Open Source
                    </h2>
                </motion.div>

                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                    {/* Activity Graph */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full overflow-hidden border-2 border-retro-border bg-retro-surface shadow-retro p-4"
                    >
                        <h3 className="text-xl font-bold text-retro-accent mb-4 font-heading uppercase">Contribution Activity</h3>
                        <div className="w-full overflow-x-auto">
                            <img
                                src={`https://ghchart.rshah.org/ff4d00/${username}`}
                                alt="Dhruv's Github Chart"
                                className="min-w-[800px] w-full"
                            />
                        </div>
                    </motion.div>

                    <div className="flex flex-col border-2 border-retro-border bg-retro-surface shadow-retro">
                        {pinnedRepos.map((item, index) => (
                            <motion.a
                                key={item.repo}
                                href={`https://github.com/${item.owner}/${item.repo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 hover:bg-white/5 transition-colors ${index !== pinnedRepos.length - 1 ? 'border-b border-retro-border/50' : ''}`}
                            >
                                <div className="flex flex-col mb-4 md:mb-0">
                                    <h4 className="font-heading font-bold text-lg md:text-xl text-retro-text group-hover:text-retro-accent transition-colors uppercase">
                                        {item.owner} / {item.repo}
                                    </h4>
                                    <p className="font-sans text-sm text-retro-text-secondary mt-1">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-xs font-bold text-retro-accent uppercase tracking-wider shrink-0">
                                    VIEW CONTRIBUTION <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubSection;
