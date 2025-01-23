"use client"

import { Link2, Trash2, Pencil} from "lucide-react";
import {toast} from "sonner";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {ConfirmModal } from "./confirm-modal";
import {Button} from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
 } from "@radix-ui/react-dropdown-menu";


interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
} : ActionProps) => {
    const { onOpen } = useRenameModal();
    const {mutate, pending} = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
          .then(() => toast.success("Link Copied"))
          .catch(() => toast.error("Failed to copy link"))
        
    };

    const onDelete = () => {
        mutate({ id })
           .then(() => toast.success("Board Deleted"))
           .catch(() => toast.error("Failed to delete the board"));
    };


    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent 
               onClick={(e) => e.stopPropagation()}
               side={side}
               sideOffset={sideOffset}
               className="w-60 z-50 bg-white shadow-lg"
            >
                <DropdownMenuItem
                  onClick = {onCopyLink}
                  className="flex items-center space-x-2 px-4 py-2 cursor-pointer text-sm">
                 <Link2 className="h-4 w-4 mr-2"/>
                  Copy Link 
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick = {() => onOpen(id, title)}
                  className="flex items-center space-x-2 px-4 py-2 cursor-pointer text-sm">
                 <Pencil className="h-4 w-4 mr-2"/>
                  Rename 
                </DropdownMenuItem>

                <ConfirmModal
                  header="Delete Board?"
                  description="This will delete the board and all of its contents."
                  disabled={pending}
                  onConfirm={onDelete}
                >
                <Button
                  variant = "ghost"
                  className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                     Delete
                </Button>
               </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};