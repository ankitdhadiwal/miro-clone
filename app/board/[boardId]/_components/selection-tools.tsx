"use client"

import {memo} from "react";
import { useSelf, useMutation } from "@liveblocks/react";
import {Camera, Color} from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Hint } from "@/components/hint";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";



interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
};

export const SelectionTools = memo(({
    camera,
    setLastUsedColor,
}: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const setFill = useMutation((
        { storage },
        fill: Color,
    ) => {
        if (!selection) return;

        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
            console.log(`Updating layer ${id} with color`, (fill)); //debugging
            liveLayers.get(id)?.set("fill", fill);
        })
    }, [selection, setLastUsedColor]);

    const deleteLayers = useDeleteLayers();


    const selectionBounds = useSelectionBounds();

    if(!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;


    return (
        <div
         className="absoulte p-3 rounded-md bg-white shadow-sm border flex select-none w-fit "
         style={{
            transform: `translate(
               calc(${x}px - 50%),
               calc(${y - 16}px - 100%)
            )`
         }}
        >
           <ColorPicker 
             onChange={setFill}
           />
           <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
            <Hint label="Delete">
                <Button
                  variant="board"
                  size="icon"
                  onClick={deleteLayers}
                >
                    <Trash2 />
                </Button>
            </Hint>
           </div>
        </div>
    )

});

SelectionTools.displayName = "SelectionTools";