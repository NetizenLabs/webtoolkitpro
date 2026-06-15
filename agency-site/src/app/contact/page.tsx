'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectScope: '',
    budget: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '3dd29efe-c7b4-46a8-a42a-bd18f201622c', 
          subject: `New Project Inquiry from ${formData.company || formData.name}`,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          message: formData.projectScope,
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', projectScope: '', budget: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen pt-32 pb-24 bg-[var(--background)] text-[var(--foreground)] flex justify-center items-center">
        <div className="max-w-md w-full px-6 text-center hero-enter">
          <div className="w-20 h-20 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-4">Message Sent</h1>
          <p className="text-lg opacity-70 mb-8">
            Thanks for reaching out! We will review your project details and get back to you within 24 hours.
          </p>
          <Link href="/" className="px-6 py-3 rounded-full border border-[var(--foreground)]/20 font-bold hover:bg-[var(--foreground)]/5 transition-colors">
            Return to Homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--background)] text-[var(--foreground)] flex justify-center items-center">
      <div className="max-w-2xl w-full px-6">
        
        <div className="mb-12 text-center hero-enter">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Start a Conversation</h1>
          <p className="text-lg opacity-70">
            Tell us about your project. We'll get back to you within 24 hours to schedule a deep-dive technical audit.
          </p>
        </div>

        <div className="bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 rounded-3xl p-8 md:p-12 hero-enter delay-100 shadow-xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold opacity-80 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    disabled={status === 'submitting'}
                    className="bg-[var(--background)] border border-[var(--foreground)]/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold opacity-80 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    disabled={status === 'submitting'}
                    className="bg-[var(--background)] border border-[var(--foreground)]/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-bold opacity-80 uppercase tracking-widest">Company / URL</label>
                <input 
                  type="text" 
                  id="company" 
                  disabled={status === 'submitting'}
                  className="bg-[var(--background)] border border-[var(--foreground)]/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-sm font-bold opacity-80 uppercase tracking-widest">Estimated Budget</label>
              <select 
                id="budget" 
                required
                disabled={status === 'submitting'}
                className="bg-[var(--background)] border border-[var(--foreground)]/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none disabled:opacity-50"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              >
                <option value="" disabled>Select a range</option>
                <option value="Under $5k">Under $5k</option>
                <option value="$5k - $10k">$5k - $10k</option>
                <option value="$10k - $25k">$10k - $25k</option>
                <option value="$25k+">$25k+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="projectScope" className="text-sm font-bold opacity-80 uppercase tracking-widest">Project Details</label>
              <textarea 
                id="projectScope" 
                required
                rows={5}
                disabled={status === 'submitting'}
                className="bg-[var(--background)] border border-[var(--foreground)]/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none disabled:opacity-50"
                value={formData.projectScope}
                onChange={(e) => setFormData({...formData, projectScope: e.target.value})}
                placeholder="What are we building?"
              />
            </div>

            {status === 'error' && (
              <div className="text-red-500 text-sm font-bold text-center">
                Something went wrong. Please try again or email us directly.
              </div>
            )}

            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="mt-4 px-8 py-4 rounded-[12px] bg-[var(--accent)] text-[var(--background)] font-bold text-lg flex items-center justify-center gap-2 group transition-all duration-[160ms] ease-out-custom hover:scale-[1.02] active:scale-[0.97] select-none shadow-xl w-full disabled:opacity-70 disabled:hover:scale-100 disabled:active:scale-100"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
              {status !== 'submitting' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-[160ms] ease-out-custom"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              )}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}
