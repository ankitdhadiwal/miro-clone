"use client";


import {useState} from "react";
import {CanvasMode, CanvasState} from "@/types/canvas";
import { useHistory, useCanUndo, useCanRedo } from "@liveblocks/react";
import { CursorsPresence } from "./cursors-presence";
import {Info} from "./info";
import {Participants} from "./participants";
import { Toolbar } from "./toolbar";


interface CanvasProps {
    boardId: string,
}
export const Canvas = ({
    boardId,
}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    return (
        <main className="h-screen w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar 
               canvasState={canvasState}
               setCanvasState={setCanvasState}
               canRedo={canRedo}
               canUndo={canUndo}
               undo={history.undo}
               redo={history.redo}
            />
            <svg
              className="h-[100vh] w-[100vw]"
            >
                <g>
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}