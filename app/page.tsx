import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { HomeContent } from "@/components/home/home-content";

export default async function RootPage() {
  const { userId } = await auth();
  
  let ownedProjects: any[] = [];
  let sharedProjects: any[] = [];

  if (userId) {
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    // Fetch owned projects
    const owned = await prisma.project.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Fetch shared projects
    const shared = email ? await prisma.project.findMany({
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

    ownedProjects = owned.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.id,
    }));

    sharedProjects = shared.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.id,
    }));
  }

  return (
    <HomeContent 
      ownedProjects={ownedProjects} 
      sharedProjects={sharedProjects} 
    />
  );
}
