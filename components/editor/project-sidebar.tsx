import { Plus, X, MoreVertical, Pencil, Trash2, FolderCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  slug: string;
}

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialOwnedProjects: Project[];
  initialSharedProjects: Project[];
  currentProjectId?: string;
}

import { useProjectStore } from "@/hooks/use-project-store";

export function ProjectSidebar({ 
  isOpen, 
  onClose, 
  initialOwnedProjects, 
  initialSharedProjects,
  currentProjectId
}: ProjectSidebarProps) {
  const { openDialog } = useProjectDialogs();
  const { ownedProjects, sharedProjects, setProjects } = useProjectStore();

  useEffect(() => {
    setProjects(initialOwnedProjects, initialSharedProjects);
  }, [initialOwnedProjects, initialSharedProjects, setProjects]);

  const myProjects = ownedProjects;

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-80 bg-surface border-r border-surface-border z-50 transition-transform duration-300 ease-in-out shadow-2xl flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <h2 className="text-lg font-bold tracking-tight text-copy-primary">Workspace</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-8 w-8 text-copy-muted hover:text-copy-primary hover:bg-subtle transition-all"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <Tabs defaultValue="my-projects" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-subtle p-1 rounded-xl mb-6">
              <TabsTrigger 
                value="my-projects"
                className="rounded-lg text-xs font-bold uppercase tracking-widest data-[state=active]:bg-elevated data-[state=active]:text-copy-primary data-[state=active]:shadow-sm transition-all"
              >
                My Projects
              </TabsTrigger>
              <TabsTrigger 
                value="shared"
                className="rounded-lg text-xs font-bold uppercase tracking-widest data-[state=active]:bg-elevated data-[state=active]:text-copy-primary data-[state=active]:shadow-sm transition-all"
              >
                Shared
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-projects" className="space-y-2 outline-none">
              {myProjects.length > 0 ? (
                myProjects.map((project) => {
                  const isCurrent = project.id === currentProjectId;
                  return (
                    <div 
                      key={project.id}
                      className="group flex items-center gap-2"
                    >
                      <Link 
                        href={`/editor/${project.id}`}
                        className={cn(
                          "flex-1 flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer min-w-0",
                          isCurrent 
                            ? "bg-brand/10 border border-brand/30 shadow-sm" 
                            : "bg-base/40 border border-transparent hover:border-surface-border hover:bg-subtle/50"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={cn(
                            "p-2 rounded-lg bg-surface border transition-colors",
                            isCurrent ? "border-brand/40" : "border-surface-border group-hover:border-brand/30"
                          )}>
                            <FolderCode className={cn(
                              "h-4 w-4 transition-colors",
                              isCurrent ? "text-brand" : "text-copy-secondary group-hover:text-brand"
                            )} />
                          </div>
                          <div className="flex flex-col min-w-0 text-left">
                            <span className={cn(
                              "text-sm font-medium truncate",
                              isCurrent ? "text-brand" : "text-copy-primary"
                            )}>
                              {project.name}
                            </span>
                            <span className="text-[10px] text-copy-faint truncate font-mono">
                              {project.slug}
                            </span>
                          </div>
                        </div>
                      </Link>
                      
                      <DropdownMenu>
                      <DropdownMenuTrigger 
                        className={cn(
                          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium transition-all outline-none select-none hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 opacity-0 group-hover:opacity-100 text-copy-muted hover:text-copy-primary"
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-elevated border-surface-border w-40">
                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer focus:bg-subtle"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDialog("rename", project);
                          }}
                        >
                          <Pencil className="h-4 w-4 text-copy-secondary" />
                          <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer focus:bg-red-500/10 text-red-500 focus:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDialog("delete", project);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                  );
                })

              ) : (
                <div className="flex flex-col items-center justify-center h-48 px-6 text-center text-copy-muted border border-dashed border-border-subtle rounded-2xl bg-base/50">
                  <p className="text-sm font-medium">No projects yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shared" className="space-y-2 outline-none">
              {sharedProjects.length > 0 ? (
                sharedProjects.map((project) => {
                  const isCurrent = project.id === currentProjectId;
                  return (
                    <Link 
                      key={project.id}
                      href={`/editor/${project.id}`}
                      className={cn(
                        "group flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer",
                        isCurrent 
                          ? "bg-brand/10 border-brand/30 shadow-sm" 
                          : "bg-base/40 border border-transparent hover:border-surface-border hover:bg-subtle/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg bg-surface border transition-colors",
                          isCurrent ? "border-brand/40" : "border-surface-border group-hover:border-brand/30"
                        )}>
                          <FolderCode className={cn(
                            "h-4 w-4 transition-colors",
                            isCurrent ? "text-brand" : "text-copy-secondary group-hover:text-brand"
                          )} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className={cn(
                            "text-sm font-medium",
                            isCurrent ? "text-brand" : "text-copy-primary"
                          )}>
                            {project.name}
                          </span>
                          <span className="text-[10px] text-copy-faint italic">
                            Collaborator
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-48 px-6 text-center text-copy-muted border border-dashed border-border-subtle rounded-2xl bg-base/50">
                  <p className="text-sm font-medium">Nothing shared with you</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-surface-border bg-surface/50 backdrop-blur-sm">
          <Button 
            onClick={() => openDialog("create")}
            className="w-full bg-brand text-base hover:bg-brand/90 font-bold py-6 rounded-2xl shadow-xl shadow-brand/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
