import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export interface UserIdentity {
  userId: string;
  email: string | null;
}

/**
 * Gets the current authenticated user's identity from Clerk.
 */
export async function getUserIdentity(): Promise<UserIdentity | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? null;

  return { userId, email };
}

/**
 * Checks if the current user has access to a project as an owner or collaborator.
 * Returns the project if access is granted, null otherwise.
 */
export async function getProjectWithAccess(projectId: string) {
  const identity = await getUserIdentity();
  if (!identity) return null;

  const { userId, email } = identity;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      collaborators: true,
    },
  });

  if (!project) return null;

  // Check if owner
  if (project.ownerId === userId) return project;

  // Check if collaborator
  if (email && project.collaborators.some((c) => c.email === email)) {
    return project;
  }

  return null;
}
