"use client"

import {useRouter} from "next/navigation";

import { Plus } from "lucide-react";
import {api} from "@/convex/_generated/api";
import {cn} from "@/lib/utils";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

type NewBoardButtonProps = {
    orgId: string,
    disabled?: boolean;
};

export const NewBoardButton = ({orgId, disabled}: NewBoardButtonProps) => {
    const router = useRouter();
    const { mutate, pending} = useApiMutation(api.board.create);

    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled",
        })
          .then((id) => {
            toast.success("Board Created.");
            router.push(`/board/${id}`);
          })
          .catch(() => toast.error("Failed to create board."));
    }

    return (
        <button
         disabled= {pending || disabled}
         onClick={onClick}
         className={cn(
            "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg flex flex-col items-center justify-center py-6",
           (pending || disabled)  && "opacity-75 hover:bg-blue-600 cursor-not-allowed   "
             ? "opacity-75 cursor-not-allowed"
             : "hover:bg-blue-800",
         )}
        >
            <Plus className="h-12 w-12 text-white stroke-1" />  
            <p className="text-sm text-white font-ligth">New Board</p>
        </button>
    );
};