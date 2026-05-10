# Current Issue: Liveblocks Room Access Denied (Code 4001)

## Error Summary
The collaborative canvas is failing to connect to the Liveblocks WebSocket server with a `4001` error: "You have no access to this room".

## Error Message
```text
[browser] Liveblocks You have no access to this room
[browser] Liveblocks Connection to websocket server closed. Reason: You have no access to this room (code: 4001).
```

## Analysis
- **Root Cause**: The application is using **ID Tokens** (`liveblocks.identifyUser`) for authentication. By default, ID tokens require room permissions to be managed in the Liveblocks Dashboard. Since we are managing permissions in our own database (Prisma), the Liveblocks server rejects the connection because it doesn't see a matching permission rule in its own system.
- **Secondary Issue**: Previous logs showed an `INVALID_SECRET_KEY` error, which suggests the `LIVEBLOCKS_SECRET_KEY` in `.env` might be incorrect or not properly loaded.
- **Architecture Mismatch**: Our `liveblocks-auth` route verifies access using `getProjectWithAccess(room)`, but `identifyUser` doesn't pass this authorization state to the Liveblocks room.

## Action Plan
1. **Switch to Access Tokens**: Refactor `app/api/liveblocks-auth/route.ts` to use `liveblocks.prepareSession`.
2. **Explicit Authorization**: Use `session.allow(room, session.FULL_ACCESS)` inside the auth route after the database check passes.
3. **Verify Secret Key**: Ensure the provided secret key is valid and matches the environment.
4. **Restart Server**: Ensure the environment variables are fully reloaded.

## Status
- [x] Identified and analyzed error
- [x] Refactor to Access Token authentication
- [x] Sanitize Secret Key
- [/] Verify room access
