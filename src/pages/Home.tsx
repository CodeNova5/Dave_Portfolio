import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Code, Network, ArrowRight, Blocks, Database, Workflow } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Section from '../components/Section';
import { supabase, Project } from '../lib/supabase';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadFeaturedProjects();
  }, []);

  const loadFeaturedProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('order_index', { ascending: true })
      .limit(3);

    if (data && !error) {
      setFeaturedProjects(data);
    }
  };

  const services = [
    {
      icon: Zap,
      title: 'AI Engineering',
      description: 'Workflow automation, CRM integration, lead routing, and intelligent business process automation.'
    },
    {
      icon: Code,
      title: 'Web Application Development',
      description: 'Custom dashboards, portals, SaaS products, and internal tools built with modern frameworks.'
    },
    {
      icon: Network,
      title: 'Business System Architecture',
      description: 'Database design, scalable infrastructure planning, and comprehensive automation strategies.'
    }
  ];

  const techStack = [
    { name: 'Next.js', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Supabase', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'n8n', category: 'Automation' },
    { name: 'Node.js', category: 'Backend' }
  ];

  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-20" container>
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
            <Blocks className="w-4 h-4" />
            Systems Builder & AI Engineer
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            I Build Systems That{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Automate and Scale
            </span>{' '}
            Businesses.
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">
            Full-stack engineer specializing in AI engineering, business infrastructure, and scalable web applications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="primary" to="/projects">
              View Projects
            </Button>
            <Button variant="outline" to="/contact">
              Book a Consultation
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-900/30 border-y border-slate-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Services Overview
          </h2>
          <p className="text-lg text-slate-400">
            Comprehensive solutions for modern businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} glassmorphism hover>
                <div className="p-8 space-y-4">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-400">
            Recent work showcasing systems design and automation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.slug}`}>
              <Card hover>
                <div className="aspect-video bg-slate-700/50 overflow-hidden">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
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
                  <p className="text-slate-400 line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech_stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" to="/projects">
            View All Projects <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Section>

      <Section className="bg-slate-900/30 border-y border-slate-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-lg text-slate-400">
            Modern tools for building scalable systems
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.map((tech, index) => (
            <Card key={index} glassmorphism>
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto">
                  {tech.category === 'Frontend' && <Code className="w-6 h-6 text-blue-400" />}
                  {tech.category === 'Backend' && <Database className="w-6 h-6 text-blue-400" />}
                  {tech.category === 'Database' && <Database className="w-6 h-6 text-blue-400" />}
                  {tech.category === 'Automation' && <Workflow className="w-6 h-6 text-blue-400" />}
                  {tech.category === 'Language' && <Code className="w-6 h-6 text-blue-400" />}
                  {tech.category === 'Styling' && <Blocks className="w-6 h-6 text-blue-400" />}
                </div>
                <div className="font-semibold text-white">{tech.name}</div>
                <div className="text-xs text-slate-500">{tech.category}</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <Card glassmorphism className="max-w-3xl mx-auto">
          <div className="p-12 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Let's Build Your System.
            </h2>
            <p className="text-lg text-slate-400">
              Ready to automate your business processes and scale efficiently?
            </p>
            <div className="pt-4">
              <Button variant="primary" to="/contact">
                Start a Conversation
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
