"use client"

import { ReactNode } from "react";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";


interface RoomProps {
    children: ReactNode
    roomId: string;
};

export const Room = ({
    children,
    roomId
}:RoomProps) => {
    return (
        <LiveblocksProvider publicApiKey={"pk_dev_ACQxDytrdBcKe3mIYmcUfcTFPk_cZdWKDnysnSVg7BB5dPSZ1Hp1hxOepJWncN6x"}>
        <RoomProvider id={roomId} initialPresence={{}}>
            <ClientSideSuspense fallback={<div>Loading....</div>}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
        </LiveblocksProvider>
    );
};

