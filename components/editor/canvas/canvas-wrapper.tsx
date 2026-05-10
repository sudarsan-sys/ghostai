"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { LiveblocksProvider, RoomProvider } from "@/liveblocks.config";
import { Loader2, AlertCircle } from "lucide-react";
import { CanvasRenderer } from "./canvas-renderer";

interface CanvasWrapperProps {
  projectId: string;
}

export function CanvasWrapper({ projectId }: CanvasWrapperProps) {
  return (
    <LiveblocksProvider>
      <RoomProvider 
        id={projectId} 
        initialPresence={{ cursor: null, isThinking: false }}
      >
        <ClientSideSuspense fallback={<CanvasLoading />}>
          {() => <CanvasRenderer />}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

function CanvasLoading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-base space-y-4">
      <div className="relative">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
        <div className="absolute inset-0 blur-xl bg-brand/20 rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <p className="text-sm font-bold uppercase tracking-widest text-copy-primary">
          Connecting to Workspace
        </p>
        <p className="text-xs text-copy-muted">
          Initializing collaborative session...
        </p>
      </div>
    </div>
  );
}

export function CanvasErrorFallback({ error }: { error: Error }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-base p-6 text-center">
      <div className="p-4 rounded-2xl bg-red-500/10 text-red-500 mb-4">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="text-lg font-bold text-copy-primary mb-2">Connection Failed</h2>
      <p className="text-sm text-copy-muted max-w-xs mb-6">
        We couldn't connect to the realtime server. This might be due to your network or a temporary service issue.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-surface border border-surface-border text-copy-primary rounded-xl font-bold hover:bg-subtle transition-all"
      >
        Retry Connection
      </button>
    </div>
  );
}
