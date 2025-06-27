import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'design', name: 'Design' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  if (loading) {
    return (
      <div className='pt-24 pb-12'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-2xl text-white'>Loading projects...</h2>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='pt-24 pb-12'
    >
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className='text-center mb-16'
        >
          <h1 className='text-5xl md:text-6xl font-bold mb-6'>
            My <span className='gradient-text'>Portfolio</span>
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            A collection of projects that showcase my skills and passion for
            creating exceptional digital experiences.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='flex flex-wrap justify-center gap-4 mb-12'
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gold-gradient text-black'
                  : 'glass-morphism text-white hover:bg-white/10'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className='glass-morphism rounded-2xl overflow-hidden hover-glow group'
            >
              <div className='relative overflow-hidden'>
                <img
                  src={project.image}
                  alt={project.title}
                  className='w-full h-48 object-cover transition-transform duration-300 
                           group-hover:scale-110'
                />
                <div
                  className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 flex items-center justify-center'
                >
                  <div className='flex gap-4'>
                    {project.link && (
                      <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='p-3 bg-gold-gradient rounded-full text-black hover:scale-110 
                                 transition-transform duration-300'
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='p-3 bg-white/20 rounded-full text-white hover:scale-110 
                                 transition-transform duration-300'
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className='p-6'>
                <h3 className='text-xl font-bold mb-2 text-white'>
                  {project.title}
                </h3>
                <p className='text-gray-300 mb-4 text-sm leading-relaxed'>
                  {project.description}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className='px-3 py-1 bg-gold-400/20 text-gold-400 rounded-full text-xs 
                               font-medium'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
