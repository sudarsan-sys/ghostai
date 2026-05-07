"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";

import { UserButton } from "@clerk/nextjs";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function EditorNavbar({ isSidebarOpen, onToggleSidebar }: EditorNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 border-b border-surface-border bg-base flex items-center px-4 z-50">
      <div className="flex-1 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-copy-secondary hover:text-copy-primary transition-colors"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      
      <div className="flex-1 flex justify-center">
        <span className="text-sm font-medium text-copy-muted tracking-wider uppercase">
          Ghost AI
        </span>
      </div>
      
      <div className="flex-1 flex justify-end items-center">
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: "h-8 w-8 border border-surface-border"
            }
          }}
        />
      </div>
    </header>
  );
}
