import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero3D from '../components/Hero3D';
import profileImage from '../assets/2025-06-18 18.13.19.jpg';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='relative min-h-screen overflow-hidden'
    >
      <Hero3D />

      <div className='relative z-10 flex items-center min-h-screen'>
        <div className='container px-6 mx-auto'>
          <div className='grid items-center grid-cols-1 gap-12 lg:grid-cols-2'>
            {/* Left side - Text content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className='mb-6 text-5xl font-bold md:text-7xl'>
                <span className='text-white'>Hello, I'm</span>
                <br />
                <span className='gradient-text animate-glow'>Professional</span>
              </h1>

              <p className='max-w-2xl mb-8 text-xl leading-relaxed text-gray-300 md:text-2xl'>
                Full Stack Developer & UI/UX Designer creating exceptional
                digital experiences with modern technologies and creative
                solutions.
              </p>

              <div className='flex flex-col gap-6 sm:flex-row'>
                <Link to='/portfolio'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center gap-3 px-8 py-4 font-semibold text-black transition-all duration-300 rounded-full group bg-gold-gradient hover-glow'
                  >
                    View My Work
                    <ArrowRight
                      size={20}
                      className='transition-transform duration-300 group-hover:translate-x-1'
                    />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 rounded-full glass-morphism hover:bg-white/10'
                >
                  Download CV
                  <Download size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Right side - Profile image */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className='flex justify-center lg:justify-end'
            >
              <div className='relative'>
                {/* Decorative elements */}
                <div className='absolute rounded-full -inset-4 bg-gold-gradient opacity-20 blur-2xl animate-pulse'></div>
                <div className='absolute rounded-full -inset-2 bg-gold-gradient opacity-30 blur-xl'></div>

                {/* Main image container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className='relative p-2 overflow-hidden rounded-full w-80 h-80 md:w-96 md:h-96 glass-morphism hover-glow'
                >
                  <img
                    src={profileImage}
                    alt='Professional Developer'
                    className='object-cover w-full h-full rounded-full'
                  />

                  {/* Overlay gradient */}
                  <div className='absolute inset-0 rounded-full bg-gradient-to-t from-black/30 via-transparent to-transparent'></div>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className='absolute flex items-center justify-center w-16 h-16 text-lg font-bold text-black rounded-full -top-4 -right-4 bg-gold-gradient'
                >
                  2+
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className='absolute flex items-center justify-center w-20 h-20 font-bold rounded-full -bottom-4 -left-4 glass-morphism text-gold-400'
                >
                  20+
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats section */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className='mt-20'
          >
            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              <motion.div
                whileHover={{ y: -5 }}
                className='p-6 text-center glass-morphism rounded-2xl hover-glow'
              >
                <h3 className='mb-2 text-3xl font-bold gradient-text'>2+</h3>
                <p className='text-gray-300'>Years Experience</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className='p-6 text-center glass-morphism rounded-2xl hover-glow'
              >
                <h3 className='mb-2 text-3xl font-bold gradient-text'>20+</h3>
                <p className='text-gray-300'>Projects Completed</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className='p-6 text-center glass-morphism rounded-2xl hover-glow'
              >
                <h3 className='mb-2 text-3xl font-bold gradient-text'>15+</h3>
                <p className='text-gray-300'>Happy Clients</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
