import { useState, FormEvent } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Section from '../components/Section';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    } else {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-12" container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-400">
              Let's discuss how I can help build or automate your systems
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card glassmorphism hover className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    {errorMessage}
                  </div>
                )}

                {status === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === 'loading'}
                  className="w-full"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card glassmorphism>
                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Email</h3>
                  <p className="text-slate-400">
                    Prefer email? Send me a message directly:
                  </p>
                  <a
                    href="mailto:dave@example.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    dave@example.com
                  </a>
                </div>
              </Card>

              <Card glassmorphism>
                <div className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">WhatsApp</h3>
                  <p className="text-slate-400">
                    For quick questions or updates:
                  </p>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </Card>

              <Card glassmorphism className="bg-blue-500/5">
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-white">Response Time</h3>
                  <p className="text-sm text-slate-400">
                    I typically respond within 24 hours on weekdays.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
