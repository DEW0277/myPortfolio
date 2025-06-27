import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [openBlog, setOpenBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/blog');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className='pt-24 pb-12'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-2xl text-white'>Loading blog posts...</h2>
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
            IT <span className='gradient-text'>Blog</span>
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            IT sohasidagi yangiliklar va foydali postlar.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.03 }}
              className='glass-morphism rounded-2xl overflow-hidden hover-glow cursor-pointer'
              onClick={() => setOpenBlog(blog)}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-xl font-bold mb-2 text-white'>
                  {blog.title}
                </h3>
                <p className='text-gray-400 text-sm mb-2'>{blog.date}</p>
                <p className='text-gray-300 mb-4'>{blog.summary}</p>
                <span className='text-gold-400 font-semibold'>
                  Ko'proq o'qish &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for full blog post */}
        {openBlog && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'>
            <div className='bg-dark-gradient rounded-2xl max-w-2xl w-full p-8 relative glass-morphism'>
              <button
                className='absolute top-4 right-4 text-gold-400 text-2xl font-bold'
                onClick={() => setOpenBlog(null)}
              >
                &times;
              </button>
              <img
                src={openBlog.image}
                alt={openBlog.title}
                className='w-full h-56 object-cover rounded-xl mb-6'
              />
              <h2 className='text-3xl font-bold mb-2 text-white'>
                {openBlog.title}
              </h2>
              <p className='text-gray-400 text-sm mb-4'>{openBlog.date}</p>
              <div className='text-gray-200 whitespace-pre-line mb-4'>
                {openBlog.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;
