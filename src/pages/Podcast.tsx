import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, Bot, Target, Users, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const pillars = [
  { icon: Rocket, title: "Founding Journey", desc: "The real story behind starting and building your business." },
  { icon: Target, title: "The Value You Provide", desc: "What sets your offering apart and the impact it creates." },
  { icon: Users, title: "Goals and Challenges", desc: "Where you're heading and the barriers in the way." },
  { icon: Bot, title: "Using AI for Growth", desc: "Practical ways leaders are leveraging AI to evolve faster." },
];

interface Episode {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}

const Podcast = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    supabase.functions
      .invoke("youtube-episodes")
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to load episodes:", error);
        } else if (data?.episodes) {
          setEpisodes(data.episodes);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <PageHeader
        overline="The Evolution Podcast"
        title="Real growth stories from SMB leaders"
        subtitle="A forum for SMB leaders to showcase their business impact, forge meaningful connections, and unlock AI growth insights."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.4fr_1fr]">
            {/* LHS */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-body text-h2 font-bold mb-6">What We Highlight and Explore</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {pillars.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="plain-card p-5 flex gap-4">
                    <Icon className="h-5 w-5 text-deep-azure shrink-0 mt-1" />
                    <div>
                      <h4 className="font-body font-semibold text-body">{title}</h4>
                      <p className="mt-1 text-caption font-body text-muted-foreground leading-snug">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 plain-card p-8 md:p-10 text-center">
                <h3 className="font-body text-h3 font-bold">Become a Guest on the Show</h3>
                <p className="mt-3 text-body font-body text-foreground/80">
                  We're accepting applications from leaders for our kickoff series.
                </p>
                <Link to="/contact" className="mt-6 inline-block">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* RHS — episodes from YouTube */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-6"
            >
              {loading && (
                <div className="plain-card p-4">
                  <div className="aspect-video w-full rounded-lg bg-secondary animate-pulse" />
                </div>
              )}

              {!loading && episodes.length === 0 && (
                <div className="plain-card p-4">
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-secondary border border-border flex items-center justify-center text-center px-6">
                    <p className="font-body text-h3 font-semibold text-foreground">
                      Series 1 Editing in Progress,
                      <br />
                      check back soon!
                    </p>
                  </div>
                </div>
              )}

              {!loading &&
                episodes.map((ep) => (
                  <div key={ep.videoId} className="plain-card p-4 space-y-3">
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-secondary border border-border relative group">
                      {activeVideo === ep.videoId ? (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${ep.videoId}?autoplay=1`}
                          title={ep.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          onClick={() => setActiveVideo(ep.videoId)}
                          className="w-full h-full block relative"
                          aria-label={`Play ${ep.title}`}
                        >
                          <img
                            src={ep.thumbnail}
                            alt={ep.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-background/30 group-hover:bg-background/50 transition-colors">
                            <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center">
                              <Play className="h-6 w-6 text-primary-foreground fill-current ml-1" />
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                    <h3 className="font-body font-semibold text-body leading-snug">{ep.title}</h3>
                    <p className="text-caption font-body text-muted-foreground">
                      {new Date(ep.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Podcast;
