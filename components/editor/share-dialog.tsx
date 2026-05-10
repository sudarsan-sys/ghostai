"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  X, 
  Link as LinkIcon, 
  Check, 
  MoreHorizontal,
  UserMinus,
  Loader2,
  ShieldCheck,
  Users
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface Collaborator {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  role: "owner" | "collaborator";
}

interface ShareDialogProps {
  projectId: string;
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
  isOwner: boolean;
}

export function ShareDialog({
  projectId,
  projectName,
  isOpen,
  onClose,
  isOwner,
}: ShareDialogProps) {
  const [email, setEmail] = useState("");
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchCollaborators = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/collaborators`);
      if (res.ok) {
        const data = await res.json();
        setCollaborators(data);
      }
    } catch (error) {
      console.error("Failed to fetch collaborators", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCollaborators();
    }
  }, [isOpen, projectId]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !isOwner) return;

    setIsInviting(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/collaborators`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        toast.success(`Invited ${email}`);
        setEmail("");
        fetchCollaborators();
      } else {
        const error = await res.text();
        toast.error(error || "Failed to invite collaborator");
      }
    } catch (error) {
      toast.error("An error occurred during invitation");
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemove = async (targetEmail: string) => {
    if (!isOwner) return;

    try {
      const res = await fetch(`/api/projects/${projectId}/collaborators?email=${targetEmail}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(`Removed ${targetEmail}`);
        fetchCollaborators();
      } else {
        toast.error("Failed to remove collaborator");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const copyLink = () => {
    const url = `${window.location.origin}/editor/${projectId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Project link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-surface border-surface-border p-0 gap-0 overflow-hidden rounded-2xl shadow-2xl">
        <div className="p-6 space-y-6">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-xl bg-brand/10 text-brand">
                <Users className="h-5 w-5" />
              </div>
              <DialogTitle className="text-xl font-bold tracking-tight text-copy-primary">
                Share Project
              </DialogTitle>
            </div>
            <DialogDescription className="text-copy-muted">
              Invite others to collaborate on <span className="text-copy-primary font-medium">{projectName}</span>.
            </DialogDescription>
          </DialogHeader>

          {isOwner && (
            <form onSubmit={handleInvite} className="flex gap-2">
              <Input
                placeholder="Enter email address..."
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-subtle border-surface-border text-copy-primary focus:border-brand h-11 rounded-xl"
                disabled={isInviting}
              />
              <Button 
                type="submit" 
                disabled={isInviting || !email.trim()}
                className="bg-brand hover:bg-brand/90 px-5 h-11 rounded-xl font-bold shadow-lg shadow-brand/20 transition-all"
              >
                {isInviting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                <span className="ml-2 hidden sm:inline">Invite</span>
              </Button>
            </form>
          )}

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-copy-faint px-1">
              Collaborators
            </h3>
            
            <div className="space-y-1 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-3 opacity-50">
                  <Loader2 className="h-6 w-6 animate-spin text-brand" />
                  <p className="text-xs font-medium text-copy-muted uppercase tracking-widest">Loading team...</p>
                </div>
              ) : (
                collaborators.map((collab) => (
                  <div 
                    key={collab.email} 
                    className="group flex items-center justify-between p-2 rounded-xl hover:bg-subtle transition-all border border-transparent hover:border-surface-border"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative">
                        {collab.imageUrl ? (
                          <img 
                            src={collab.imageUrl} 
                            alt={collab.name || collab.email} 
                            className="h-10 w-10 rounded-xl object-cover bg-surface border border-surface-border"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand font-bold">
                            {collab.name?.[0] || collab.email[0].toUpperCase()}
                          </div>
                        )}
                        {collab.role === "owner" && (
                          <div className="absolute -top-1 -right-1 bg-brand text-white rounded-full p-0.5 border-2 border-surface shadow-sm">
                            <ShieldCheck className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-copy-primary truncate">
                          {collab.name || collab.email.split("@")[0]}
                        </span>
                        <span className="text-[11px] text-copy-muted truncate">
                          {collab.email}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                        collab.role === "owner" ? "text-brand bg-brand/10" : "text-copy-faint bg-surface-border/30"
                      )}>
                        {collab.role}
                      </span>
                      {isOwner && collab.role !== "owner" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(collab.email)}
                          className="h-8 w-8 text-copy-muted hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all rounded-lg"
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-subtle/50 border-t border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-copy-muted">
            <LinkIcon className="h-3 w-3" />
            Anyone with access can view this project
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyLink}
            className={cn(
              "h-9 px-4 rounded-xl gap-2 font-bold transition-all",
              copied ? "text-green-500 bg-green-500/10" : "text-copy-primary hover:bg-surface border border-surface-border"
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
