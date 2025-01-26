"use client"

import { ReactNode } from "react";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { Loading } from "@/app/board/[boardId]/_components/loading";


interface RoomProps {
    children: ReactNode
    roomId: string;
};

export const Room = ({
    children,
    roomId
}:RoomProps) => {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        <RoomProvider id={roomId} initialPresence={{}}>
            <ClientSideSuspense fallback={<Loading />}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
        </LiveblocksProvider>
    );
};

