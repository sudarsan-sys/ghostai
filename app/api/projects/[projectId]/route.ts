import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { userId } = await auth();
    const { projectId } = await params;
    const body = await req.json();
    const { name, description } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    // Check ownership
    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!existingProject) {
      return new NextResponse("Project not found", { status: 404 });
    }

    if (existingProject.ownerId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name: name || undefined,
        description,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { userId } = await auth();
    const { projectId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    // Check ownership
    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!existingProject) {
      return new NextResponse("Project not found", { status: 404 });
    }

    if (existingProject.ownerId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
