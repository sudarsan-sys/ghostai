"use client";

import { useState } from "react";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  slug: string;
}

import { useProjectActions } from "@/hooks/use-project-actions";

export function RenameProjectDialog() {
  const { isOpen, type, selectedProject, closeDialog } = useProjectDialogs();

  const isRename = type === "rename";

  const onOpenChange = (open: boolean) => {
    if (!open) closeDialog();
  };

  return (
    <Dialog open={isOpen && isRename} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px] bg-surface border-surface-border"
      >
        <RenameDialogInner 
          selectedProject={selectedProject} 
          closeDialog={closeDialog} 
        />
      </DialogContent>
    </Dialog>
  );
}

interface RenameDialogInnerProps {
  selectedProject: Project | null;
  closeDialog: () => void;
}

function RenameDialogInner({ selectedProject, closeDialog }: RenameDialogInnerProps) {
  const [name, setName] = useState(selectedProject?.name ?? "");
  const { renameProject, isLoading } = useProjectActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedProject || name === selectedProject.name) {
      if (name === selectedProject?.name) closeDialog();
      return;
    }

    await renameProject(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold tracking-tight text-copy-primary">
          Rename Project
        </DialogTitle>
        <DialogDescription className="text-copy-muted">
          Current project name: <span className="text-copy-primary font-medium">{selectedProject?.name}</span>
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-6 py-6">
        <div className="grid gap-2">
          <Label htmlFor="rename-input" className="text-sm font-medium text-copy-secondary">
            New Project Name
          </Label>
          <Input
            id="rename-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
            className="bg-subtle border-surface-border text-copy-primary focus:border-brand"
            autoFocus
            disabled={isLoading}
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button
          type="button"
          variant="ghost"
          onClick={closeDialog}
          disabled={isLoading}
          className="text-copy-secondary hover:text-copy-primary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !name.trim() || name === selectedProject?.name}
          className="bg-brand text-base hover:bg-brand/90 px-6"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  );
}
