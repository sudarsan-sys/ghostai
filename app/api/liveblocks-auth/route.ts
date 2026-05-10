import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { liveblocks, getUserColor } from "@/lib/liveblocks";
import { getProjectWithAccess } from "@/lib/project-access";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the room ID from the request
    const { room } = await request.json();

    if (!room) {
      return new NextResponse("Room ID is required", { status: 400 });
    }

    // Verify project access (room ID is the project ID)
    const project = await getProjectWithAccess(room);

    if (!project) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Ensure the Liveblocks room exists
    // We don't necessarily need to create it here as ID tokens 
    // work with any room ID, but it's good practice to ensure metadata is synced.
    try {
      await liveblocks.getRoom(room);
    } catch (error: any) {
      // If room doesn't exist, create it
      if (error.status === 404) {
        await liveblocks.createRoom(room, {
          defaultAccesses: [], // Private by default
          metadata: {
            name: project.name,
          },
        });
      }
    }

    // Prepare user info for metadata
    const userInfo = {
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.username || "Anonymous",
      avatar: user.imageUrl,
      color: getUserColor(userId),
    };

    // Prepare the Liveblocks session
    const session = liveblocks.prepareSession(
      userId,
      { userInfo }
    );

    // Grant full access to the requested room (project ID)
    session.allow(room, session.FULL_ACCESS);

    // Authorize the session and return the token
    const { status, body } = await session.authorize();

    return new Response(body, { status });
  } catch (error) {
    console.error("[LIVEBLOCKS_AUTH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
