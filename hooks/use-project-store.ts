import { create } from "zustand";

interface Project {
  id: string;
  name: string;
  slug: string;
}

interface ProjectStore {
  ownedProjects: Project[];
  sharedProjects: Project[];
  setProjects: (owned: Project[], shared: Project[]) => void;
  updateProjectName: (id: string, name: string) => void;
  removeProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  ownedProjects: [],
  sharedProjects: [],
  setProjects: (ownedProjects, sharedProjects) => set({ ownedProjects, sharedProjects }),
  updateProjectName: (id, name) => set((state) => ({
    ownedProjects: state.ownedProjects.map(p => p.id === id ? { ...p, name } : p),
    sharedProjects: state.sharedProjects.map(p => p.id === id ? { ...p, name } : p),
  })),
  removeProject: (id) => set((state) => ({
    ownedProjects: state.ownedProjects.filter(p => p.id !== id),
    sharedProjects: state.sharedProjects.filter(p => p.id !== id),
  })),
}));
