import { Zap, Code, Network, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Section from '../components/Section';

export default function Services() {
  const services = [
    {
      icon: Zap,
      title: 'AI Automation',
      description: 'Transform your business operations with intelligent automation that saves time and reduces errors.',
      features: [
        'Workflow automation with n8n',
        'CRM automation and integration',
        'Lead routing and qualification',
        'Email campaign automation',
        'Business process automation',
        'Custom AI integrations',
        'Data processing pipelines',
        'API integration and orchestration'
      ]
    },
    {
      icon: Code,
      title: 'Web Application Development',
      description: 'Custom web applications built with modern technologies for optimal performance and user experience.',
      features: [
        'Admin dashboards and portals',
        'SaaS product development',
        'Internal business tools',
        'Progressive web applications',
        'API development and integration',
        'Database design and optimization',
        'User authentication systems',
        'Responsive, mobile-first design'
      ]
    },
    {
      icon: Network,
      title: 'System Architecture & Consulting',
      description: 'Strategic planning and architecture design for scalable, maintainable business systems.',
      features: [
        'System architecture planning',
        'Database schema design',
        'Technology stack selection',
        'Scalability planning',
        'Security best practices',
        'Performance optimization',
        'CI/CD pipeline setup',
        'Technical documentation'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-12" container>
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Services
          </h1>
          <p className="text-xl text-slate-400">
            Comprehensive solutions to build, automate, and scale your business systems
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} glassmorphism>
                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-3">
                        {service.title}
                      </h2>
                      <p className="text-lg text-slate-400">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-20">
          <Card glassmorphism className="max-w-3xl mx-auto">
            <div className="p-12 text-center space-y-6">
              <h2 className="text-3xl font-bold text-white">
                Discuss Your Project
              </h2>
              <p className="text-lg text-slate-400">
                Ready to build something great? Let's talk about how I can help automate and scale your business.
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
