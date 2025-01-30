import {RectangleLayer} from "@/types/canvas";
import { colorToCss } from "@/lib/utils";
import { useStorage } from "@liveblocks/react";

interface RectangleProps  {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Rectangle = ({
    id,
    onPointerDown,
    selectionColor,
}: RectangleProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if(!layer) {
        return null;
    };

    console.log(`Rendering Rectangle ${id} with Fill:`, layer.fill);

    return (
        <rect
          className="drop-shadow-md"
          onPointerDown={(e) => onPointerDown(e,id)}
          style={{
            transform: `translate(${layer.x}px, ${layer.y}px)`,
          }}
          x={0}
          y={0}
          width={layer.width}
          height={layer.height}
          strokeWidth={1}
          fill={layer.fill ? colorToCss(layer.fill): "#000"}
          stroke={selectionColor || "transparent"}
         />
    )
}