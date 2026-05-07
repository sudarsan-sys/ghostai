"use client";

import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* Backdrop for mobile or focus overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-80 bg-surface border-r border-surface-border z-50 transition-transform duration-300 ease-in-out shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-surface-border">
            <h2 className="text-lg font-semibold text-copy-primary">Projects</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="h-8 w-8 text-copy-muted hover:text-copy-primary transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close Sidebar</span>
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <Tabs defaultValue="my-projects" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-subtle p-1 rounded-lg">
                <TabsTrigger 
                  value="my-projects"
                  className="data-[state=active]:bg-elevated data-[state=active]:text-copy-primary transition-all"
                >
                  My Projects
                </TabsTrigger>
                <TabsTrigger 
                  value="shared"
                  className="data-[state=active]:bg-elevated data-[state=active]:text-copy-primary transition-all"
                >
                  Shared
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-projects" className="mt-6">
                <div className="flex flex-col items-center justify-center h-48 px-6 text-center text-copy-muted border border-dashed border-border-subtle rounded-2xl bg-base/50">
                  <p className="text-sm">You haven&apos;t created any projects yet.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="shared" className="mt-6">
                <div className="flex flex-col items-center justify-center h-48 px-6 text-center text-copy-muted border border-dashed border-border-subtle rounded-2xl bg-base/50">
                  <p className="text-sm">No projects have been shared with you.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-surface-border bg-surface/50 backdrop-blur-sm">
            <Button className="w-full bg-brand text-base hover:bg-brand/90 font-medium py-6 rounded-xl shadow-lg shadow-brand/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="mr-2 h-5 w-5" />
              New Project
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
