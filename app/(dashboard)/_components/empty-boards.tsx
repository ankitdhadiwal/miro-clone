"use client";

import {useOrganization} from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import {toast} from "sonner"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useApiMutation} from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";



export const EmptyBoards = () => {
    const router = useRouter();
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        if(!organization) return;
        
        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
          .then((id) => {
            toast.success("Board Created");
            router.push(`/board/${id}`);
          })
          .catch(() => toast.error("Failed to create board"))
    };


    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
               src="/empty-boards.svg"
               height={110}
               width={110}
               alt="Empty"
            />
        console.log(&quot;Image source:&quot;, imageSrc);



            <h2 className="text-2xl font-semibold mt-6">
                Create your first board!
            </h2>
            <p className="text-muted-foreground textg-sm mt-2">
                Start by creating a board for your organization 
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create Board
                </Button>
            </div>
        </div>
    )
}