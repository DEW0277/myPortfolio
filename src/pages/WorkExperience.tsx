import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';

interface Experience {
  _id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  technologies: string[];
}

const WorkExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/experience');
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
        } else {
          console.error('Failed to fetch experiences');
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className='pt-24 pb-12'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-2xl text-white'>Loading experience...</h2>
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
            Work <span className='gradient-text'>Experience</span>
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            My professional journey in web development, building innovative
            solutions and growing with amazing teams.
          </p>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience._id}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
              className='relative mb-12 last:mb-0'
            >
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className='absolute left-8 top-20 w-0.5 h-20 bg-gold-gradient opacity-50' />
              )}

              {/* Timeline Dot */}
              <div
                className='absolute left-6 top-8 w-4 h-4 bg-gold-gradient rounded-full \
                            border-4 border-black z-10'
              />

              <div className='ml-16 glass-morphism p-8 rounded-2xl hover-glow'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                  <div>
                    <h3 className='text-2xl font-bold text-white mb-2'>
                      {experience.title}
                    </h3>
                    <div className='flex items-center gap-4 text-gold-400 mb-2'>
                      <div className='flex items-center gap-2'>
                        <Building2 size={16} />
                        <span className='font-semibold'>
                          {experience.company}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <MapPin size={16} />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 text-gray-300'>
                    <Calendar size={16} />
                    <span className='font-medium'>{experience.duration}</span>
                  </div>
                </div>

                <ul className='text-gray-300 mb-6 space-y-2'>
                  {experience.description.split('\n').map((item, idx) => (
                    <li key={idx} className='flex items-start gap-3'>
                      <div className='w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className='flex flex-wrap gap-2'>
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className='px-3 py-1 bg-gold-400/20 text-gold-400 rounded-full text-sm \
                               font-medium'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkExperience;
