import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogProvider } from "@/components/providers/dialog-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "Autonomous Agent Workflow Workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInForceRedirectUrl="/editor"
      signUpForceRedirectUrl="/editor"
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "var(--accent-primary)",
          colorBackground: "var(--bg-surface)",
          borderRadius: "1rem",
        },
        elements: {
          card: "bg-surface border-surface-border shadow-2xl rounded-3xl",
          headerTitle: "text-2xl font-bold tracking-tight text-copy-primary",
          headerSubtitle: "text-copy-muted",
          socialButtonsBlockButton: "bg-base border-surface-border hover:bg-elevated text-copy-primary transition-all",
          dividerLine: "bg-surface-border",
          dividerText: "text-copy-muted uppercase text-[10px] tracking-widest",
          formFieldLabel: "text-copy-secondary font-medium",
          formFieldInput: "bg-subtle border-surface-border text-copy-primary focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all",
          formButtonPrimary: "bg-brand text-base hover:bg-brand/90 font-bold py-6 transition-all hover:scale-[1.02] active:scale-[0.98]",
          footerActionText: "text-copy-muted",
          footerActionLink: "text-brand hover:text-brand/80 transition-colors",
          userButtonPopoverCard: "bg-elevated border-surface-border",
        }
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      >
        <body className="min-h-full flex flex-col bg-base text-copy-primary">
          <TooltipProvider>
            <DialogProvider>
              {children}
            </DialogProvider>
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
