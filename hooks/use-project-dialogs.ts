"use client";

import { create } from "zustand";

type DialogType = "create" | "rename" | "delete" | null;

interface Project {
  id: string;
  name: string;
  slug: string;
}

interface ProjectDialogState {
  isOpen: boolean;
  type: DialogType;
  selectedProject: Project | null;
  isLoading: boolean;
  
  // Actions
  openDialog: (type: DialogType, project?: Project | null) => void;
  closeDialog: () => void;
  setLoading: (loading: boolean) => void;
}

export const useProjectDialogs = create<ProjectDialogState>((set) => ({
  isOpen: false,
  type: null,
  selectedProject: null,
  isLoading: false,

  openDialog: (type, project = null) => 
    set({ isOpen: true, type, selectedProject: project }),
  
  closeDialog: () => 
    set({ isOpen: false, type: null, selectedProject: null, isLoading: false }),
    
  setLoading: (loading) => set({ isLoading: loading }),
}));
