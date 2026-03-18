'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Building2, Globe, Users, DollarSign, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Company Info', icon: Building2 },
  { id: 2, label: 'Details', icon: Globe },
  { id: 3, label: 'Team', icon: Users },
  { id: 4, label: 'Budget', icon: DollarSign },
];

type FormData = {
  companyName: string;
  industry: string;
  size: string;
  website: string;
  country: string;
  taxId: string;
  teamEmails: string;
  budget: string;
  budgetPeriod: string;
};

const INDUSTRIES = ['Technology', 'Marketing', 'Design', 'Finance', 'Healthcare', 'Education', 'E-commerce', 'Other'];
const SIZES = ['1-10', '11-50', '51-200', '200+'];
const PERIODS = ['monthly', 'quarterly', 'yearly'];

export default function CompanySetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    companyName: '', industry: '', size: '',
    website: '', country: '', taxId: '',
    teamEmails: '', budget: '', budgetPeriod: 'monthly',
  });

  const updateForm = (key: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const inputClass = "w-full h-11 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue transition-colors text-sm";
  const labelClass = "block text-sm text-text-secondary mb-1.5";

  async function finish() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    router.push('/dashboard/company');
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex-1 flex flex-col items-center">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all font-bold text-sm ${step > s.id ? 'bg-gradient-primary border-transparent text-white' : step === s.id ? 'border-primary-purple text-primary-purple bg-primary-purple/10' : 'border-border text-text-secondary'}`}>
                    {step > s.id ? <Check className="h-4 w-4" /> : s.id}
                  </div>
                  <span className={`text-xs mt-1.5 hidden md:block ${step >= s.id ? 'text-white' : 'text-text-secondary'}`}>{s.label}</span>
                  {i < STEPS.length - 1 && (
                    <div className={`absolute hidden`} />
                  )}
                </div>
              ))}
            </div>
            <div className="h-1.5 w-full bg-border rounded-full">
              <div
                className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          <Card className="p-8">
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-white mb-6">{"Tell us about your company"}</h2>
                <div>
                  <label className={labelClass}>Company Name *</label>
                  <input className={inputClass} placeholder="Acme Corp" value={form.companyName} onChange={e => updateForm('companyName', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Industry</label>
                  <select className={inputClass} value={form.industry} onChange={e => updateForm('industry', e.target.value)}>
                    <option value="" className="bg-background-dark">Select an industry</option>
                    {INDUSTRIES.map(ind => <option key={ind} value={ind} className="bg-background-dark">{ind}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Company Size</label>
                  <div className="grid grid-cols-4 gap-3">
                    {SIZES.map(s => (
                      <button key={s} onClick={() => updateForm('size', s)}
                        className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${form.size === s ? 'border-primary-purple bg-primary-purple/10 text-white' : 'border-border text-text-secondary hover:border-white/20'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-white mb-6">Company Details</h2>
                <div>
                  <label className={labelClass}>Website</label>
                  <input className={inputClass} placeholder="https://yourcompany.com" value={form.website} onChange={e => updateForm('website', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <input className={inputClass} placeholder="United States" value={form.country} onChange={e => updateForm('country', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Tax ID <span className="text-text-secondary">(optional)</span></label>
                  <input className={inputClass} placeholder="XX-XXXXXXX" value={form.taxId} onChange={e => updateForm('taxId', e.target.value)} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-white mb-2">Invite Team Members</h2>
                <p className="text-text-secondary mb-4">Optional — you can do this later from the dashboard.</p>
                <div>
                  <label className={labelClass}>Email Addresses (one per line)</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue transition-colors text-sm resize-none"
                    placeholder={"teammate1@company.com\nteammate2@company.com"}
                    value={form.teamEmails}
                    onChange={e => updateForm('teamEmails', e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-white mb-6">Set Your Budget</h2>
                <div>
                  <label className={labelClass}>Total Budget ($)</label>
                  <input className={inputClass} type="number" placeholder="5000" value={form.budget} onChange={e => updateForm('budget', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Period</label>
                  <div className="grid grid-cols-3 gap-3">
                    {PERIODS.map(p => (
                      <button key={p} onClick={() => updateForm('budgetPeriod', p)}
                        className={`py-2.5 rounded-xl border text-sm font-medium capitalize transition-all ${form.budgetPeriod === p ? 'border-primary-purple bg-primary-purple/10 text-white' : 'border-border text-text-secondary hover:border-white/20'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                {form.budget && (
                  <div className="p-4 rounded-xl bg-primary-blue/10 border border-primary-blue/20">
                    <p className="text-text-secondary text-sm">Your {form.budgetPeriod} budget will be</p>
                    <p className="text-2xl font-bold text-white">${Number(form.budget).toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button variant="ghost" onClick={() => setStep(s => s - 1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              ) : <div />}

              {step < STEPS.length ? (
                <Button
                  onClick={() => setStep(s => s + 1)}
                  disabled={step === 1 && !form.companyName}
                  className="gap-2"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={finish} isLoading={loading} className="gap-2">
                  Launch Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
