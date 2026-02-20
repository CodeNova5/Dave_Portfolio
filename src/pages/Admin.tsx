import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import Section from '../components/Section';
import { supabase, Project } from '../lib/supabase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Web Applications',
    summary: '',
    problem: '',
    solution: '',
    architecture: '',
    tech_stack: '',
    results: '',
    image_url: '',
    screenshots: '',
    featured: false,
    order_index: 0,
  });

  useEffect(() => {
    const authCheck = localStorage.getItem('adminAuthenticated');
    if (authCheck === 'true') {
      setIsAuthenticated(true);
      setShowLoginForm(false);
      loadProjects();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper authentication)
    if (adminPassword === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowLoginForm(false);
      localStorage.setItem('adminAuthenticated', 'true');
      loadProjects();
    } else {
      setMessage({ type: 'error', text: 'Invalid password' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLoginForm(true);
    localStorage.removeItem('adminAuthenticated');
    setFormData({
      title: '',
      slug: '',
      category: 'Web Applications',
      summary: '',
      problem: '',
      solution: '',
      architecture: '',
      tech_stack: '',
      results: '',
      image_url: '',
      screenshots: '',
      featured: false,
      order_index: 0,
    });
  };

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (data && !error) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Convert comma-separated strings to arrays
      const techStack = formData.tech_stack
        .split(',')
        .map(s => s.trim())
        .filter(s => s);
      const screenshots = formData.screenshots
        .split(',')
        .map(s => s.trim())
        .filter(s => s);

      const projectData = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        summary: formData.summary,
        problem: formData.problem || null,
        solution: formData.solution || null,
        architecture: formData.architecture || null,
        tech_stack: techStack,
        results: formData.results || null,
        image_url: formData.image_url || null,
        screenshots: screenshots,
        featured: formData.featured,
        order_index: parseInt(String(formData.order_index)),
      };

      const { error } = await supabase
        .from('projects')
        .insert([projectData]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Project added successfully!' });
      setFormData({
        title: '',
        slug: '',
        category: 'Web Applications',
        summary: '',
        problem: '',
        solution: '',
        architecture: '',
        tech_stack: '',
        results: '',
        image_url: '',
        screenshots: '',
        featured: false,
        order_index: 0,
      });
      loadProjects();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to add project' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Project deleted successfully!' });
      loadProjects();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete project' });
    } finally {
      setLoading(false);
    }
  };

  if (showLoginForm && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <Section container className="py-0">
          <div className="max-w-md w-full bg-slate-900 p-8 rounded-lg border border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-6">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Admin Password</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter admin password"
                />
              </div>
              {message && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${message.type === 'error' ? 'bg-red-900/20 text-red-400' : 'bg-green-900/20 text-green-400'}`}>
                  <AlertCircle className="w-4 h-4" />
                  {message.text}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
              >
                Login
              </button>
            </form>
          </div>
        </Section>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <Section container className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Portal</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {message && (
          <div className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${message.type === 'error' ? 'bg-red-900/20 border border-red-700 text-red-400' : 'bg-green-900/20 border border-green-700 text-green-400'}`}>
            {message.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Add Project Form */}
          <div className="bg-slate-900 p-8 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="auto-generated from title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option>Web Applications</option>
                  <option>Automation Systems</option>
                  <option>Client Projects</option>
                  <option>Experimental</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Summary *</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 min-h-24 resize-none"
                  placeholder="Short description for cards"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Problem</label>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 min-h-24"
                  placeholder="Problem statement"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Solution</label>
                <textarea
                  name="solution"
                  value={formData.solution}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 min-h-24"
                  placeholder="Solution description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Architecture</label>
                <textarea
                  name="architecture"
                  value={formData.architecture}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 min-h-24"
                  placeholder="Technical architecture details"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  name="tech_stack"
                  value={formData.tech_stack}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Results</label>
                <textarea
                  name="results"
                  value={formData.results}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 min-h-24"
                  placeholder="Impact and results"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Screenshots URLs (comma-separated)</label>
                <input
                  type="text"
                  name="screenshots"
                  value={formData.screenshots}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com/1.jpg, https://example.com/2.jpg"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium text-slate-300">Featured on homepage</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Display Order</label>
                <input
                  type="number"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  min="0"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* Projects List */}
          <div className="bg-slate-900 p-8 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Existing Projects ({projects.length})</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {projects.map(project => (
                <div key={project.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{project.title}</h3>
                    <p className="text-sm text-slate-400">{project.category}</p>
                    <p className="text-xs text-slate-500 mt-1">{project.slug}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    disabled={loading}
                    className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white text-sm rounded transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-slate-400 text-center py-8">No projects yet</p>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
