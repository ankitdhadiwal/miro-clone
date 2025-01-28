"use client"

import { ReactNode } from "react";
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { Loading } from "@/app/board/[boardId]/_components/loading";
import { Layer } from "@/types/canvas";
import { LiveMap, LiveList, LiveObject} from "@liveblocks/client";


interface RoomProps {
    children: ReactNode
    roomId: string;
};

export const Room = ({
    children,
    roomId
}:RoomProps) => {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
        <RoomProvider 
            id={roomId} 
            initialPresence={{
            cursor: null,
            selection: [],
        }}
          initialStorage={{
            layers: new LiveMap<string, LiveObject<Layer>>(),
            layerIds: new LiveList<string>([]),
        }}
        >
            <ClientSideSuspense fallback={<Loading />}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
        </LiveblocksProvider>
    );
};

