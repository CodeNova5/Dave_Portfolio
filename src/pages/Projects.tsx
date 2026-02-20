import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import Card from '../components/Card';
import Section from '../components/Section';
import { supabase, Project } from '../lib/supabase';

const categories = [
  'All',
  'Web Applications',
  'Automation Systems',
  'Client Projects',
  'Experimental'
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

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

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-12" container>
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Projects
          </h1>
          <p className="text-xl text-slate-400">
            A collection of systems, applications, and automation workflows
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          <div className="flex items-center gap-2 text-slate-400">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.slug}`}>
                <Card hover className="h-full">
                  <div className="aspect-video bg-slate-700/50 overflow-hidden max-h-64">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="text-sm font-medium text-blue-400">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 line-clamp-3">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech_stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="px-3 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                          +{project.tech_stack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
