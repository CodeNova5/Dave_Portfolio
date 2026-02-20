import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Section from '../components/Section';
import { supabase, Project } from '../lib/supabase';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadProject();
    }
  }, [slug]);

  const loadProject = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (data && !error) {
      setProject(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Project Not Found</h1>
          <p className="text-slate-400">The project you're looking for doesn't exist.</p>
          <Button variant="primary" to="/projects">
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Section className="pt-24 pb-12" container>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>

        <div className="space-y-6 mb-12">
          <div className="text-sm font-medium text-blue-400">
            {project.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {project.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.image_url && (
          <div className="rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {project.problem && (
            <Card glassmorphism>
              <div className="p-8 space-y-4">
                <h2 className="text-2xl font-bold text-white">Problem</h2>
                <p className="text-slate-400 leading-relaxed">{project.problem}</p>
              </div>
            </Card>
          )}

          {project.solution && (
            <Card glassmorphism>
              <div className="p-8 space-y-4">
                <h2 className="text-2xl font-bold text-white">Solution</h2>
                <p className="text-slate-400 leading-relaxed">{project.solution}</p>
              </div>
            </Card>
          )}
        </div>

        {project.architecture && (
          <Card glassmorphism className="mb-12">
            <div className="p-8 space-y-4">
              <h2 className="text-2xl font-bold text-white">Architecture</h2>
              <p className="text-slate-400 leading-relaxed">{project.architecture}</p>
            </div>
          </Card>
        )}

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Screenshots</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {project.results && (
          <Card glassmorphism className="mb-12">
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Results & Impact</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">{project.results}</p>
            </div>
          </Card>
        )}

        <div className="text-center pt-8">
          <Button variant="primary" to="/contact">
            Start Your Project
          </Button>
        </div>
      </Section>
    </div>
  );
}
