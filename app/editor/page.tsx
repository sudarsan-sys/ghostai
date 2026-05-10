import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EditorClientContent } from "@/components/editor/editor-client-content";

export default async function EditorPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  // Fetch owned projects
  const ownedProjects = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch shared projects
  const sharedProjects = email ? await prisma.project.findMany({
    where: {
      collaborators: {
        some: {
          email: email,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }) : [];

  // Map to common interface
  const formattedOwned = ownedProjects.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.id, // Assuming ID is used as slug for now as per previous Turn's [projectId] route
  }));

  const formattedShared = sharedProjects.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.id,
  }));

  return (
    <EditorClientContent 
      ownedProjects={formattedOwned} 
      sharedProjects={formattedShared} 
    />
  );
}
