import { motion } from 'framer-motion';
import { Code, Palette, Zap, Users } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Frontend Development', level: 80, icon: Code },
    { name: 'UI/UX Design', level: 70, icon: Palette },
    { name: 'Backend Development', level: 60, icon: Zap },
    { name: 'Team Leadership', level: 80, icon: Users },
  ];

  const technologies = [
    'HTML',
    'CSS',
    'React',
    'Shadcn UI',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'Three.js',
    'Tailwind CSS',
    'Framer Motion',
    'Next.js',
  ];

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
            About <span className='gradient-text'>Me</span>
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Passionate developer with a keen eye for design and a love for
            creating innovative digital solutions that make a difference.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20'>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className='text-3xl font-bold mb-6 gradient-text'>My Story</h2>
            <p className='text-gray-300 text-lg leading-relaxed mb-6'>
              With over 2+ years of experience in full-stack development, I
              specialize in creating stunning, user-friendly applications that
              combine cutting-edge technology with exceptional design.
            </p>
            <p className='text-gray-300 text-lg leading-relaxed mb-6'>
              I believe that great software is not just about functionality—it's
              about creating experiences that delight users and solve real-world
              problems. Every project I work on is an opportunity to push
              boundaries and learn something new.
            </p>
            <p className='text-gray-300 text-lg leading-relaxed'>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className='space-y-8'
          >
            {skills.map((skill, index) => (
              <div key={skill.name} className='glass-morphism p-6 rounded-2xl'>
                <div className='flex items-center mb-4'>
                  <skill.icon className='text-gold-400 mr-3' size={24} />
                  <h3 className='text-xl font-semibold'>{skill.name}</h3>
                </div>
                <div className='w-full bg-gray-700 rounded-full h-3'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                    className='bg-gold-gradient h-3 rounded-full'
                  />
                </div>
                <p className='text-right text-gold-400 font-semibold mt-2'>
                  {skill.level}%
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2 className='text-3xl font-bold mb-8 text-center gradient-text'>
            Technologies I Work With
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className='glass-morphism p-4 rounded-xl text-center hover-glow cursor-pointer'
              >
                <p className='font-semibold text-white'>{tech}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
