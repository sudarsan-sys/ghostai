"use client";

import { useState } from "react";
import { Plus, Ghost, FolderPlus, Sparkles } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { Button } from "@/components/ui/button";
import { Show } from "@clerk/nextjs";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import Link from "next/link";

export function HomeContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { openDialog } = useProjectDialogs();

  return (
    <>
      <Show when="signed-in">
        <div className="min-h-screen bg-base text-copy-primary font-sans selection:bg-brand/20 selection:text-brand">
          <EditorNavbar 
            isSidebarOpen={isSidebarOpen} 
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          />
          
          <ProjectSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          
          <main className="pt-14 h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-primary-dim),transparent_70%)] pointer-events-none opacity-40" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            
            <div className="z-10 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-2xl px-6">
              <div className="relative inline-flex items-center justify-center p-4 rounded-3xl bg-brand/10 border border-brand/20 mb-4 group transition-all hover:scale-110">
                <FolderPlus className="h-10 w-10 text-brand group-hover:rotate-6 transition-transform" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-copy-primary">
                  Create a project or open an existing one
                </h1>
                <p className="text-copy-muted text-lg leading-relaxed">
                  Start a new architecture workspace, or choose a project from the sidebar to continue your work.
                </p>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg" 
                  onClick={() => openDialog("create")}
                  className="bg-brand text-base hover:bg-brand/90 px-10 rounded-2xl font-bold h-16 shadow-2xl shadow-brand/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Plus className="mr-2 h-6 w-6" />
                  New Project
                </Button>
              </div>
            </div>
          </main>
        </div>
      </Show>

      <Show when="signed-out">
        <div className="min-h-screen bg-base text-copy-primary font-sans selection:bg-brand/20 selection:text-brand overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-primary-dim),transparent_60%)] pointer-events-none opacity-50" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

          <nav className="fixed top-0 left-0 right-0 h-20 border-b border-surface-border bg-base/80 backdrop-blur-md z-50 px-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ghost className="h-8 w-8 text-brand" />
              <span className="font-bold text-xl tracking-tighter">Ghost AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-copy-secondary">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-brand text-base hover:bg-brand/90 px-6 rounded-xl font-bold">Get Started</Button>
              </Link>
            </div>
          </nav>

          <main className="relative pt-32 pb-20 px-8 flex flex-col items-center justify-center min-h-screen text-center z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-widest mb-8">
              <Sparkles className="h-3 w-3" />
              The future of AI workflows
            </div>

            <h1 className="text-7xl font-bold tracking-tighter text-copy-primary mb-8">
              Autonomous systems <br />
              <span className="text-brand">built by AI.</span>
            </h1>

            <p className="text-copy-muted max-w-2xl text-xl mb-12 leading-relaxed">
              Ghost AI is a real-time collaborative workspace where agents and humans
              design, iterate, and deploy production-ready system architectures.
            </p>

            <Link href="/sign-up">
              <Button size="lg" className="bg-brand text-base hover:bg-brand/90 px-10 rounded-2xl font-bold h-16 shadow-2xl transition-all">
                Get Started for Free
              </Button>
            </Link>
          </main>
        </div>
      </Show>
    </>
  );
}
