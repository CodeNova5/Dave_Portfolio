import { Code, Lightbulb, Target, TrendingUp } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Section from '../components/Section';

export default function About() {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Supabase', 'PostgreSQL', 'REST APIs', 'GraphQL']
    },
    {
      category: 'Automation',
      items: ['n8n', 'Zapier', 'Make', 'Custom Workflows', 'AI Integration']
    },
    {
      category: 'Tools & DevOps',
      items: ['Git', 'Docker', 'CI/CD', 'Vercel', 'AWS']
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Efficiency First',
      description: 'Every system should do more with less. Automation eliminates repetitive work and frees teams to focus on what matters.'
    },
    {
      icon: Code,
      title: 'Clean Architecture',
      description: 'Well-designed systems are maintainable, scalable, and easy to understand. Good code is an investment, not an expense.'
    },
    {
      icon: TrendingUp,
      title: 'Built to Scale',
      description: 'Systems should grow with your business. Strategic planning and solid foundations prevent costly rewrites later.'
    },
    {
      icon: Lightbulb,
      title: 'Practical Solutions',
      description: 'Technology serves the business, not the other way around. The best solution is the one that solves the problem effectively.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-12" container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About Me
            </h1>
            <p className="text-xl text-slate-400">
              Building systems that work smarter, not harder
            </p>
          </div>

          <Card glassmorphism className="mb-16">
            <div className="p-8 md:p-12 space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg">
                I'm Dave, a full-stack engineer who specializes in building intelligent systems that automate business processes and scale efficiently. My focus is on creating solutions that reduce manual work, eliminate errors, and enable businesses to grow without proportional increases in operational overhead.
              </p>
              <p className="text-lg">
                Over the years, I've worked on everything from complex web applications to sophisticated automation workflows. I believe that the best technology is invisible—it just works, reliably and efficiently, without requiring constant attention.
              </p>
              <p className="text-lg">
                Whether it's designing a database schema, building a custom dashboard, or orchestrating an automated workflow that connects multiple services, I approach every project with the same goal: create something that solves real problems and delivers measurable value.
              </p>
            </div>
          </Card>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Engineering Philosophy
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} glassmorphism hover>
                    <div className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {value.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Skills & Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} glassmorphism>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white">
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium rounded-lg"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card glassmorphism className="text-center">
            <div className="p-12 space-y-6">
              <h2 className="text-3xl font-bold text-white">
                Let's Work Together
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                If you're looking to automate processes, build scalable systems, or need help architecting a technical solution, I'd love to hear from you.
              </p>
              <div className="pt-4">
                <Button variant="primary" to="/contact">
                  Get in Touch
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
