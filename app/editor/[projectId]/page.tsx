import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getProjectWithAccess } from "@/lib/project-access";
import { WorkspaceContent } from "@/components/editor/workspace-content";
import { AccessDenied } from "@/components/editor/access-denied";

interface WorkspacePageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { userId } = await auth();
  const { projectId } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const project = await getProjectWithAccess(projectId);

  if (!project) {
    return <AccessDenied />;
  }

  // Fetch projects for the sidebar (similar to the home page)
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const owned = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  const shared = email ? await prisma.project.findMany({
    where: {
      collaborators: {
        some: { email: email },
      },
    },
    orderBy: { createdAt: "desc" },
  }) : [];

  const initialOwnedProjects = owned.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.id,
  }));

  const initialSharedProjects = shared.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.id,
  }));

  const isOwner = project.ownerId === userId;

  return (
    <WorkspaceContent 
      project={{
        id: project.id,
        name: project.name,
      }}
      isOwner={isOwner}
      initialOwnedProjects={initialOwnedProjects}
      initialSharedProjects={initialSharedProjects}
    />
  );
}
