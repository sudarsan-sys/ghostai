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

import { useProjectActions } from "@/hooks/use-project-actions";

export function CreateProjectDialog() {
  const { isOpen, type, closeDialog } = useProjectDialogs();
  const { createProject, isLoading } = useProjectActions();
  const [name, setName] = useState("");

  const isCreate = type === "create";

  // Derive slug from name during render to avoid useEffect/setState sync issues
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Handle resets when the dialog opens/closes
  const onOpenChange = (open: boolean) => {
    if (!open) {
      setName("");
      closeDialog();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createProject(name);
  };

  return (
    <Dialog open={isOpen && isCreate} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-surface border-surface-border">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight text-copy-primary">
              Create Project
            </DialogTitle>
            <DialogDescription className="text-copy-muted">
              Start a new architecture workspace. Choose a name that describes your system.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-medium text-copy-secondary">
                Project Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Payments Microservice"
                className="bg-subtle border-surface-border text-copy-primary focus:border-brand"
                autoFocus
                disabled={isLoading}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="slug" className="text-sm font-medium text-copy-secondary">
                Room ID Preview
              </Label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-base border border-surface-border text-copy-faint text-sm">
                <span className="shrink-0 opacity-50">ghostai.io/</span>
                <span className="text-brand font-medium truncate">
                  {slug || "your-project-slug"}
                </span>
              </div>
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
              disabled={isLoading || !name.trim()}
              className="bg-brand text-base hover:bg-brand/90 px-6"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
