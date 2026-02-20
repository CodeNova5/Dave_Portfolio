import { useState, useEffect } from 'react';
import { Trash2, AlertCircle, CheckCircle, Mail, Calendar } from 'lucide-react';
import Section from '../components/Section';
import { supabase, ContactSubmission } from '../lib/supabase';

export default function ContactMessages() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    const authCheck = localStorage.getItem('adminAuthenticated');
    if (authCheck === 'true') {
      setIsAuthenticated(true);
      setShowLoginForm(false);
      loadContactSubmissions();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowLoginForm(false);
      localStorage.setItem('adminAuthenticated', 'true');
      loadContactSubmissions();
    } else {
      setMessage({ type: 'error', text: 'Invalid password' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLoginForm(true);
    localStorage.removeItem('adminAuthenticated');
    setSelectedMessage(null);
  };

  const loadContactSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setContactSubmissions(data);
    } else if (error) {
      setMessage({ type: 'error', text: 'Failed to load messages' });
    }
    setLoading(false);
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Message deleted successfully!' });
      setSelectedMessage(null);
      loadContactSubmissions();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete message' });
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
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Contact Messages</h1>
            <p className="text-slate-400">Total messages: {contactSubmissions.length}</p>
          </div>
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

        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading messages...</p>
          </div>
        )}

        {!loading && contactSubmissions.length === 0 && (
          <div className="bg-slate-900 p-12 rounded-lg border border-slate-700 text-center">
            <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No messages yet</p>
          </div>
        )}

        {!loading && contactSubmissions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 max-h-[600px] overflow-y-auto">
                <h2 className="text-lg font-bold text-white mb-4">Messages</h2>
                <div className="space-y-2">
                  {contactSubmissions.map(submission => (
                    <button
                      key={submission.id}
                      onClick={() => setSelectedMessage(submission)}
                      className={`w-full text-left p-4 rounded-lg border transition ${
                        selectedMessage?.id === submission.id
                          ? 'bg-blue-600/20 border-blue-500'
                          : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <h3 className="font-medium text-white truncate">{submission.name}</h3>
                      <p className="text-xs text-slate-400 truncate">{submission.email}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-slate-900 p-8 rounded-lg border border-slate-700">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.name}</h2>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Mail className="w-4 h-4 text-blue-400" />
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="text-blue-400 hover:text-blue-300 transition"
                          >
                            {selectedMessage.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>

                  <div className="border-t border-slate-700 pt-6">
                    <h3 className="text-lg font-bold text-white mb-4">Message</h3>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                      <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: Your Portfolio Inquiry`}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-center font-medium"
                    >
                      Reply via Email
                    </a>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium"
                    >
                      Back to List
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900 p-12 rounded-lg border border-slate-700 text-center">
                  <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}
