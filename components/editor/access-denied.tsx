"use client";

import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AccessDenied() {
  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-primary-dim),transparent_70%)] pointer-events-none opacity-40" />
      
      <div className="z-10 space-y-8 max-w-md animate-in fade-in zoom-in duration-700">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
          <ShieldAlert className="h-10 w-10" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-copy-primary">
            Access Denied
          </h1>
          <p className="text-copy-muted text-lg leading-relaxed">
            You don't have permission to view this project, or the project does not exist. 
            Please check the URL or contact the owner.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/editor">
            <Button 
              variant="outline" 
              className="border-surface-border text-copy-secondary hover:text-copy-primary px-8 rounded-xl h-12"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
