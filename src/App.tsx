import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import WorkExperience from './pages/WorkExperience';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Dashboard from './components/admin/Dashboard';
import Login from './components/admin/Login';

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-dark-gradient'>
        <Navbar />
        <AnimatePresence mode='wait'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/experience' element={<WorkExperience />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact />} />
            {/* Admin Routes */}
            <Route path='/admin'>
              <Route path='login' element={<Login />} />
              <Route path='dashboard' element={<Dashboard />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
