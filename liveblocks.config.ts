import { createClient } from "@liveblocks/client";
import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  // publicApiKey: "", // We use authEndpoint
});

// Presence represents the properties that will exist on every User in the Room
// and that will happen in real-time (cursor, typing, etc.)
export type Presence = {
  cursor: { x: number; y: number } | null;
  isThinking: boolean;
};

// Storage represents the shared state that persists even after every User leaves the Room
// (the canvas elements, etc.)
export type Storage = {
  // We'll define this later in the canvas phase
};

// UserMeta represents static information about the user that is synchronized 
// through the authentication endpoint
export type UserMeta = {
  id: string;
  info: {
    name: string;
    avatar: string;
    color: string;
  };
};

// RoomEvent represents custom events that can be broadcast to the Room
export type RoomEvent = {
  // type: "NOTIFICATION", 
  // ...
};

// ThreadMetadata represents custom metadata on threads
export type ThreadMetadata = {
  // resolved: boolean;
  // ...
};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
    useThreadSubscription,
    useMarkThreadAsRead,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client);

export const {
  suspense: {
    LiveblocksProvider,
    useMarkInboxNotificationAsRead,
    useMarkAllInboxNotificationsAsRead,
    useInboxNotifications,
    useUnreadInboxNotificationsCount,
    // useDeleteInboxNotification,
  },
} = createLiveblocksContext(client);
