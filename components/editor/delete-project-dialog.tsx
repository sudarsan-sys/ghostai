"use client";

import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";

import { useProjectActions } from "@/hooks/use-project-actions";

export function DeleteProjectDialog() {
  const { isOpen, type, selectedProject, closeDialog } = useProjectDialogs();
  const { deleteProject, isLoading } = useProjectActions();

  const isDelete = type === "delete";

  const handleDelete = async () => {
    await deleteProject();
  };

  return (
    <Dialog open={isOpen && isDelete} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px] bg-surface border-surface-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-red-500/10 text-red-500">
                <AlertTriangle className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight text-copy-primary">
              Delete Project
            </DialogTitle>
          </div>
          <DialogDescription className="text-copy-muted">
            Are you sure you want to delete <span className="text-copy-primary font-bold">{selectedProject?.name}</span>? 
            This action cannot be undone and will permanently remove all associated canvas data and specifications.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="mt-6">
          <Button
            variant="ghost"
            onClick={closeDialog}
            disabled={isLoading}
            className="text-copy-secondary hover:text-copy-primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            variant="destructive"
            className="px-6 font-bold"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
