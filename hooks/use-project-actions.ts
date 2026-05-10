"use client";

import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useProjectStore } from "@/hooks/use-project-store";

const slugify = (text: string) => 
  text.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const generateSuffix = () => 
  Math.random().toString(36).substring(2, 6);

export function useProjectActions() {
  const { closeDialog, setLoading, isLoading, selectedProject } = useProjectDialogs();
  const { updateProjectName, removeProject } = useProjectStore();
  const router = useRouter();

  const createProject = async (name: string) => {
    setLoading(true);
    try {
      const suffix = generateSuffix();
      const slug = `${slugify(name)}-${suffix}`;
      
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error("Failed to create project");

      const project = await response.json();
      toast.success(`Project "${name}" created`);
      closeDialog();
      router.push(`/editor/${project.id}`);
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renameProject = async (name: string) => {
    if (!selectedProject) return;
    setLoading(true);
    
    const oldName = selectedProject.name;
    
    // Optimistic update
    updateProjectName(selectedProject.id, name);
    
    try {
      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error("Failed to rename project");

      toast.success(`Project renamed to "${name}"`);
      router.refresh();
      // Close dialog after starting refresh to ensure UI remains responsive
      closeDialog();
    } catch (error) {
      // Revert on error
      updateProjectName(selectedProject.id, oldName);
      toast.error("Failed to rename project");
      console.error(error);
    } finally {
      // Only set loading false if we haven't already closed the dialog 
      // (which resets loading anyway)
      setLoading(false);
    }
  };

  const deleteProject = async () => {
    if (!selectedProject) return;
    setLoading(true);
    
    const projectToDelete = { ...selectedProject };
    
    // Optimistic update
    removeProject(selectedProject.id);
    
    try {
      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      toast.success(`Project "${projectToDelete.name}" deleted`);
      closeDialog();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete project");
      router.refresh(); // Re-fetch to restore the list
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    renameProject,
    deleteProject,
    isLoading,
  };
}
