"use client";

import { useState } from "react";
import { Ghost, Sparkles, Layout, Code2, Cpu, ArrowRight } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

interface Project {
  id: string;
  name: string;
  slug: string;
}

interface EditorClientContentProps {
  ownedProjects: Project[];
  sharedProjects: Project[];
}

export function EditorClientContent({ ownedProjects, sharedProjects }: EditorClientContentProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base text-copy-primary font-sans selection:bg-brand/20 selection:text-brand">
      <Toaster position="bottom-right" richColors />
      <EditorNavbar 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <ProjectSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        initialOwnedProjects={ownedProjects}
        initialSharedProjects={sharedProjects}
      />
      
      <main className="pt-14 h-screen overflow-hidden flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-primary-dim),transparent_70%)] pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        
        <div className="z-10 text-center space-y-10 animate-in fade-in zoom-in duration-1000">
          <div className="relative inline-block group">
            <div className="absolute -inset-6 bg-brand/20 blur-3xl rounded-full animate-pulse group-hover:bg-brand/30 transition-all" />
            <Ghost className="h-24 w-24 text-brand relative z-10 transition-transform group-hover:scale-110 duration-500" />
          </div>
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3 w-3" />
              Ghost AI Alpha
            </div>
            
            <h1 className="text-7xl font-bold tracking-tighter text-copy-primary">
              Build with <span className="text-brand">Ghost</span>
            </h1>
            
            <p className="text-copy-muted max-w-xl mx-auto text-xl leading-relaxed">
              The next-generation autonomous agent workspace for building complex,
              production-ready AI workflows.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6">
             <Button 
               size="lg" 
               className="bg-brand text-base hover:bg-brand/90 px-10 rounded-2xl font-bold h-14 shadow-2xl shadow-brand/30 transition-all hover:scale-105 active:scale-95"
               onClick={() => setIsSidebarOpen(true)}
             >
               Create New Project
               <ArrowRight className="ml-2 h-5 w-5" />
             </Button>
          </div>

          <div className="grid grid-cols-3 gap-12 mt-16 max-w-2xl mx-auto">
            {[
              { icon: Layout, label: "Node Editor" },
              { icon: Code2, label: "Live Preview" },
              { icon: Cpu, label: "Native LLM" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-copy-faint hover:text-copy-secondary transition-all cursor-default group">
                <div className="p-3 rounded-xl bg-surface/50 border border-surface-border group-hover:border-brand/40 group-hover:bg-brand/5 transition-all">
                  <item.icon className="h-6 w-6 group-hover:text-brand transition-colors" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
