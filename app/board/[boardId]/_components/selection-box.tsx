"use client"

import { Side, XYWH, LayerType} from "@/types/canvas";
import { memo } from "react";
import { useSelf, useStorage } from "@liveblocks/react";

interface SelectionBoxProps {
    onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
};

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(({
    onResizeHandlePointerDown,
}: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) => 
        me.presence.selection.length === 1 ? me.presence.selection[0] : null 
    );

    const isShowingHandles = useStorage((root) => 
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    )


    return (
        <div>

        </div>
    )

});

SelectionBox.displayName = "SelectionBox";