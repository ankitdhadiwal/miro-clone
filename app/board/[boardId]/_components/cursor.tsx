"use client"

import { memo } from "react";
import { MousePointer2 } from "lucide-react";

import { connectionIdToColor } from "@/lib/utils";

interface CursorProps {
    connectionId: number;
};

export const Cursor = memo(({
    connectionId,
}: CursorProps) => {
    return (
        <p></p>
    );
});

Cursor.displayName = "Cursor";