import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2 } from 'lucide-react'

const WorkExperience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      duration: '2022 - Present',
      description: [
        'Led development of scalable web applications using React and Node.js',
        'Implemented modern CI/CD pipelines reducing deployment time by 60%',
        'Mentored junior developers and conducted code reviews',
        'Collaborated with UX team to improve user experience metrics by 40%'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker']
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions LLC',
      location: 'Austin, TX',
      duration: '2020 - 2022',
      description: [
        'Developed and maintained multiple client projects using MERN stack',
        'Built RESTful APIs and integrated third-party services',
        'Optimized database queries improving application performance by 35%',
        'Worked closely with clients to gather requirements and deliver solutions'
      ],
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'GraphQL']
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Creative Web Studio',
      location: 'Remote',
      duration: '2019 - 2020',
      description: [
        'Created responsive web interfaces using React and Vue.js',
        'Collaborated with designers to implement pixel-perfect UI components',
        'Improved website loading speed by 50% through code optimization',
        'Maintained and updated existing client websites'
      ],
      technologies: ['React', 'Vue.js', 'Sass', 'Webpack', 'JavaScript']
    },
    {
      id: 4,
      title: 'Junior Web Developer',
      company: 'StartUp Hub',
      location: 'New York, NY',
      duration: '2018 - 2019',
      description: [
        'Assisted in development of company website and internal tools',
        'Learned modern web development frameworks and best practices',
        'Participated in agile development process and daily standups',
        'Contributed to open-source projects and company blog'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL']
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-12"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Work <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My professional journey in web development, building innovative solutions 
            and growing with amazing teams.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-20 bg-gold-gradient opacity-50" />
              )}
              
              {/* Timeline Dot */}
              <div className="absolute left-6 top-8 w-4 h-4 bg-gold-gradient rounded-full 
                            border-4 border-black z-10" />
              
              <div className="ml-16 glass-morphism p-8 rounded-2xl hover-glow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gold-400 mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} />
                        <span className="font-semibold">{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={16} />
                    <span className="font-medium">{experience.duration}</span>
                  </div>
                </div>
                
                <ul className="text-gray-300 mb-6 space-y-2">
                  {experience.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gold-400/20 text-gold-400 rounded-full text-sm 
                               font-medium"
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
  )
}

export default WorkExperience