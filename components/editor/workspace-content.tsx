"use client";

import { useState } from "react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { ShareDialog } from "@/components/editor/share-dialog";
import { CanvasWrapper } from "@/components/editor/canvas/canvas-wrapper";
import { Button } from "@/components/ui/button";
import { 
  Share2, 
  MessageSquare, 
  PanelRight, 
  Layout,
  Code2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkspaceContentProps {
  project: {
    id: string;
    name: string;
  };
  isOwner: boolean;
  initialOwnedProjects: any[];
  initialSharedProjects: any[];
}

export function WorkspaceContent({ 
  project, 
  isOwner,
  initialOwnedProjects, 
  initialSharedProjects 
}: WorkspaceContentProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(true);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-base overflow-hidden">
      {/* Navbar Overlay Action Area */}
      <EditorNavbar 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex pt-14 overflow-hidden">
        {/* Left Sidebar */}
        <ProjectSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          initialOwnedProjects={initialOwnedProjects}
          initialSharedProjects={initialSharedProjects}
          currentProjectId={project.id}
        />

        {/* Central Canvas Area */}
        <main className="flex-1 relative flex flex-col bg-base overflow-hidden">
          {/* Workspace Header Actions */}
          <div className="h-12 border-b border-surface-border bg-surface/50 backdrop-blur-sm px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 rounded bg-brand/10 border border-brand/20 text-[10px] font-bold text-brand uppercase tracking-wider">
                Workspace
              </div>
              <h2 className="text-sm font-medium text-copy-primary truncate max-w-[200px]">
                {project.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsShareDialogOpen(true)}
                className="h-8 text-copy-secondary hover:text-copy-primary gap-2 px-3"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-xs font-medium">Share</span>
              </Button>
              <div className="w-[1px] h-4 bg-surface-border mx-1" />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAiSidebarOpen(!isAiSidebarOpen)}
                className={cn(
                  "h-8 gap-2 px-3 transition-colors",
                  isAiSidebarOpen ? "text-brand bg-brand/5" : "text-copy-secondary hover:text-copy-primary"
                )}
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-medium">AI Agent</span>
              </Button>
            </div>
          </div>

          {/* Collaborative Canvas */}
          <div className="flex-1 relative">
            <CanvasWrapper projectId={project.id} />
          </div>
        </main>

        {/* Right AI Sidebar Placeholder */}
        <aside 
          className={cn(
            "border-l border-surface-border bg-surface/30 backdrop-blur-md transition-all duration-300 ease-in-out relative flex flex-col",
            isAiSidebarOpen ? "w-80" : "w-0 overflow-hidden opacity-0"
          )}
        >
          <div className="p-4 border-b border-surface-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-copy-primary">
              <Sparkles className="h-4 w-4 text-brand" />
              <span className="font-bold text-sm">Ghost AI Agent</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsAiSidebarOpen(false)}
              className="h-8 w-8 text-copy-muted hover:text-copy-primary"
            >
              <PanelRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 opacity-50 grayscale">
            <MessageSquare className="h-10 w-10 text-copy-faint" />
            <p className="text-xs text-copy-muted font-medium uppercase tracking-widest">
              AI Chat Interface
            </p>
          </div>
          
          <div className="p-4 border-t border-surface-border">
            <div className="h-10 w-full rounded-xl bg-base border border-surface-border flex items-center px-4 text-xs text-copy-faint italic">
              AI chat is coming soon...
            </div>
          </div>
        </aside>
      </div>

      <ShareDialog 
        projectId={project.id}
        projectName={project.name}
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        isOwner={isOwner}
      />
    </div>
  );
}
