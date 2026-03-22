'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useUser } from '@clerk/nextjs';

export default function CompanySettings() {
  const { user } = useUser();
  const inputClass = "w-full h-11 px-4 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue transition-colors text-sm";
  const labelClass = "block text-sm text-text-secondary mb-1.5";

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Company Settings</h1>
        <p className="text-text-secondary">Manage your organization profile, billing details, and preferences.</p>
      </div>

      <div className="flex gap-4 border-b border-border pb-px">
        {['General Info', 'Billing & Tax', 'Notifications', 'Security'].map(s => (
          <button key={s} className="pb-4 px-2 text-sm font-medium border-b-2 text-text-secondary border-transparent hover:text-white transition-colors">
            {s}
          </button>
        ))}
      </div>

      <Card className="p-8">
        <h2 className="text-xl font-bold text-white mb-6">General Information</h2>

        <div className="flex items-center gap-6 mb-8 border-b border-border pb-8">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="Avatar" className="h-24 w-24 rounded-2xl object-cover shadow-lg shrink-0" />
          ) : (
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-4xl font-bold text-white shadow-lg shrink-0">
              {user?.firstName?.charAt(0) || 'C'}
            </div>
          )}
          <div>
            <div className="flex gap-3 mb-2">
              <Button variant="outline" size="sm">Upload Logo</Button>
              <Button variant="ghost" size="sm" className="text-error hover:text-error hover:bg-error/10">Remove</Button>
            </div>
            <p className="text-xs text-text-secondary">Recommended size: 256x256px. Max file size: 2MB.</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Company Name</label>
              <input className={inputClass} defaultValue={user?.fullName || "Company Name"} />
            </div>
            <div>
              <label className={labelClass}>Industry</label>
              <select className={inputClass} defaultValue="Technology">
                <option value="Technology" className="bg-background-dark">Technology</option>
                <option value="Marketing" className="bg-background-dark">Marketing</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Company Size</label>
              <select className={inputClass} defaultValue="51-200">
                <option value="1-10" className="bg-background-dark">1-10</option>
                <option value="51-200" className="bg-background-dark">51-200</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input className={inputClass} defaultValue="https://acmecorp.com" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Short Description</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-background-dark border border-border text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue transition-colors text-sm resize-none"
              defaultValue="We are a leading software company building tools for the future."
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border mt-8">
            <Button variant="outline">Discard Changes</Button>
            <Button>Save Settings</Button>
          </div>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card className="p-8 border border-error/20 bg-error/5">
        <h3 className="text-lg font-bold text-error mb-2">Danger Zone</h3>
        <p className="text-sm text-text-secondary mb-6">Permanently delete your company account and all associated data. This action cannot be undone.</p>
        <Button variant="outline" className="border-error/50 text-error hover:bg-error hover:text-white">Delete Company Account</Button>
      </Card>
    </div>
  );
}
