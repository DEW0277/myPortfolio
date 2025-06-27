import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  featured: boolean;
  image?: string;
  link?: string;
  github?: string;
}

interface Experience {
  _id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  technologies: string[];
}

interface Blog {
  _id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
}

interface CurrentItem {
  _id?: string;
  type: 'projects' | 'experience' | 'blog';
}

const gold = {
  main: '#f59e0b',
  dark: '#d97706',
  light: '#fde68a',
  contrastText: '#000',
};
const dark = {
  main: '#1a1a1a',
  contrastText: '#fff',
};

const theme = createTheme({
  palette: {
    primary: gold,
    secondary: dark,
    background: {
      default: '#000',
      paper: 'rgba(255,255,255,0.05)', // glass-morphism
    },
    text: {
      primary: '#fff',
      secondary: '#f59e0b',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: 'rgba(245,158,11,0.07)', // gold-400/10
          borderRadius: 8,
          // border: '1px solid #f59e0b', // optional: gold border
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: 'rgba(245,158,11,0.07)', // gold-400/10
          borderRadius: 8,
          '& fieldset': {
            borderColor: '#f59e0b',
          },
          '&:hover fieldset': {
            borderColor: '#d97706',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#b45309',
            boxShadow: '0 0 0 2px rgba(245,158,11,0.2)',
          },
        },
        input: {
          color: '#fff',
        },
      },
    },
  },
});

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<CurrentItem | null>(null);
  const [formData, setFormData] = useState<
    Partial<Project | Experience | Blog>
  >({});
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [projectsRes, experiencesRes, blogsRes] = await Promise.all([
        fetch('http://localhost:3001/api/projects'),
        fetch('http://localhost:3001/api/experience'),
        fetch('http://localhost:3001/api/blog'),
      ]);

      const projectsData = await projectsRes.json();
      const experiencesData = await experiencesRes.json();
      const blogsData = await blogsRes.json();

      setProjects(projectsData);
      setExperiences(experiencesData);
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (
    id: string,
    type: 'projects' | 'experience' | 'blog'
  ) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (
    item: Project | Experience | Blog,
    type: 'projects' | 'experience' | 'blog'
  ) => {
    setCurrentItem({ ...item, type });
    setFormData(item);
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    if (!currentItem) return;

    try {
      const method = currentItem._id ? 'PUT' : 'POST';
      const url = currentItem._id
        ? `http://localhost:3001/api/${currentItem.type}/${currentItem._id}`
        : `http://localhost:3001/api/${currentItem.type}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setOpenDialog(false);
        fetchData();
      } else {
        const error = await response.json();
        console.error('Error submitting data:', error);
        alert(error.message || 'Failed to save changes');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to save changes');
    }
  };

  const handleAdd = (type: 'projects' | 'experience' | 'blog') => {
    setCurrentItem({ type });
    setFormData({});
    setOpenDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            Admin Dashboard
          </Typography>
          <Button
            onClick={handleLogout}
            variant='outlined'
            sx={{
              mb: 2,
              color: 'primary.main',
              borderColor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          >
            Logout
          </Button>
          <Tabs
            value={tab}
            onChange={(_e: React.SyntheticEvent, newValue: number) =>
              setTab(newValue)
            }
            textColor='primary'
            indicatorColor='primary'
            sx={{
              '.MuiTab-root': { color: 'text.primary' },
              '.Mui-selected': { color: 'primary.main !important' },
            }}
          >
            <Tab label='Projects' />
            <Tab label='Experience' />
            <Tab label='Blog' />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            <Button
              variant='contained'
              onClick={() =>
                handleAdd(
                  tab === 0 ? 'projects' : tab === 1 ? 'experience' : 'blog'
                )
              }
              sx={{
                mb: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                background:
                  'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
                boxShadow: '0 0 20px rgba(245,158,11,0.3)',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  background:
                    'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                },
              }}
            >
              Add New{' '}
              {tab === 0 ? 'Project' : tab === 1 ? 'Experience' : 'Blog'}
            </Button>

            <List>
              {(tab === 0 ? projects : tab === 1 ? experiences : blogs).map(
                (item) => {
                  if (tab === 0) {
                    const project = item as Project;
                    return (
                      <ListItem
                        key={project._id}
                        secondaryAction={
                          <Box>
                            <IconButton
                              onClick={() => handleEdit(project, 'projects')}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleDelete(project._id, 'projects')
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={project.title}
                          secondary={project.description}
                        />
                      </ListItem>
                    );
                  } else if (tab === 1) {
                    const exp = item as Experience;
                    return (
                      <ListItem
                        key={exp._id}
                        secondaryAction={
                          <Box>
                            <IconButton
                              onClick={() => handleEdit(exp, 'experience')}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleDelete(exp._id, 'experience')
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={exp.title}
                          secondary={exp.company}
                        />
                      </ListItem>
                    );
                  } else {
                    const blog = item as Blog;
                    return (
                      <ListItem
                        key={blog._id}
                        secondaryAction={
                          <Box>
                            <IconButton
                              onClick={() => handleEdit(blog, 'blog')}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(blog._id, 'blog')}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={blog.title}
                          secondary={blog.summary}
                        />
                      </ListItem>
                    );
                  }
                }
              )}
            </List>
          </Box>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>
              {currentItem?._id ? 'Edit' : 'Add'}{' '}
              {currentItem?.type === 'projects'
                ? 'Project'
                : currentItem?.type === 'experience'
                ? 'Experience'
                : 'Blog'}
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label='Title'
                value={formData.title || ''}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                margin='normal'
              />
              {currentItem?.type === 'projects' ? (
                <>
                  <TextField
                    fullWidth
                    label='Description'
                    value={(formData as Partial<Project>).description || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    margin='normal'
                    multiline
                    rows={4}
                  />
                  <TextField
                    fullWidth
                    label='Category'
                    value={(formData as Partial<Project>).category || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Image URL'
                    value={(formData as Partial<Project>).image || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Technologies (comma separated)'
                    value={(
                      (formData as Partial<Project>).technologies || []
                    ).join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        technologies: e.target.value
                          .split(',')
                          .map((tech) => tech.trim())
                          .filter(Boolean),
                      })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Live URL'
                    value={(formData as Partial<Project>).link || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Github URL'
                    value={(formData as Partial<Project>).github || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    margin='normal'
                  />
                </>
              ) : currentItem?.type === 'experience' ? (
                <>
                  <TextField
                    fullWidth
                    label='Company'
                    value={(formData as Partial<Experience>).company || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Location'
                    value={(formData as Partial<Experience>).location || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Duration'
                    value={(formData as Partial<Experience>).duration || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Description'
                    value={(formData as Partial<Experience>).description || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    margin='normal'
                    multiline
                    rows={4}
                  />
                </>
              ) : currentItem?.type === 'blog' ? (
                <>
                  <TextField
                    fullWidth
                    label='Summary'
                    value={(formData as Partial<Blog>).summary || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, summary: e.target.value })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Image URL'
                    value={(formData as Partial<Blog>).image || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Date'
                    value={(formData as Partial<Blog>).date || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    margin='normal'
                  />
                  <TextField
                    fullWidth
                    label='Content'
                    value={(formData as Partial<Blog>).content || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    margin='normal'
                    multiline
                    rows={6}
                  />
                </>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleSubmit} variant='contained'>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
