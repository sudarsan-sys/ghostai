"use client";

import { Ghost } from "lucide-react";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-base overflow-hidden font-sans">
      {/* Left Side: Brand & Features */}
      <div className="hidden lg:flex w-1/3 flex-col justify-between p-12 border-r border-surface-border bg-base relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--accent-primary-dim),transparent_60%)] pointer-events-none" />

        <div className="z-10">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="p-2 rounded-xl bg-brand/10 border border-brand/20 group-hover:border-brand/40 transition-colors">
              <Ghost className="h-6 w-6 text-brand" />
            </div>
            <span className="font-bold text-xl tracking-tighter text-copy-primary">Ghost AI</span>
          </div>
        </div>

        <div className="z-10 space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-copy-primary leading-tight">
              Ghost AI
            </h1>
            <p className="text-xl text-copy-secondary">
              Design systems, in seconds.
            </p>
          </div>

          <ul className="space-y-6">
            {[
              "AI-generated system designs from plain language",
              "Real-time collaborative canvas with live cursors",
              "One-click technical spec export",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <span className="mt-3 w-4 h-[2px] bg-brand/60 group-hover:bg-brand transition-colors shrink-0" />
                <span className="text-copy-secondary group-hover:text-copy-primary transition-colors leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="z-10 text-xs text-copy-faint font-medium tracking-widest uppercase">
          © 2026 Ghost AI Workspace
        </div>
      </div>

      {/* Right Side: Auth Component */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--bg-elevated),transparent_100%)] lg:hidden" />
        
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-12 flex flex-col items-center gap-4">
          <Ghost className="h-12 w-12 text-brand" />
          <h2 className="text-2xl font-bold tracking-tighter text-copy-primary">Ghost AI</h2>
        </div>

        <div className="w-full max-w-[400px] z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </div>
    </div>
  );
}
