import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ExternalLink, Github, Rocket, Star, TrendingUp } from "lucide-react";
import * as data from "../../../../assets/data.json";
interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  stats?: {
    stars?: number;
    contributors?: number;
  };
}

const projects: Project[] = data.projects

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Stats on Image */}
        {project.stats && (
          <div className="absolute bottom-4 left-4 flex gap-3">
            {project.stats.stars && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/20">
                <Star size={14} className="text-yellow-400" fill="currentColor" />
                <span className="text-xs font-semibold text-white">{project.stats.stars}</span>
              </div>
            )}
            {project.stats.contributors && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/20">
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-xs font-semibold text-white">{project.stats.contributors}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-100 dark:bg-primary/10 text-amber-800 dark:text-primary border border-amber-300 dark:border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <ExternalLink size={16} />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-400 dark:border-white/20 hover:border-amber-600 dark:hover:border-primary hover:bg-amber-50 dark:hover:bg-primary/10 transition-all transform hover:scale-105 text-gray-800 dark:text-white font-semibold"
            >
              <Github size={16} />
              <span className="text-sm">Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MyProjects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="min-h-screen w-full py-8 md:py-20 md:px-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-block mb-4"
        >
          <span className="px-4 py-2 rounded-full bg-amber-100 dark:bg-primary/10 border border-amber-300 dark:border-primary/30 text-amber-800 dark:text-primary font-semibold text-sm flex items-center gap-2 w-fit mx-auto">
            <Rocket size={16}/>
            {t("common.projectsSection.badge")}
          </span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          {t("common.projectsSection.title")}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
          {t("common.projectsSection.subtitle")}
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export default MyProjects;
