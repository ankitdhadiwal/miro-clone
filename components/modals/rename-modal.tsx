"use client";

import {type FormEventHandler, useEffect, useState} from "react";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogClose, DialogFooter, DialogTitle
    } from "@/components/ui/dialog";
import {api} from "@/convex/_generated/api";
import {Input} from "@/components/ui/input";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {useRenameModal} from "@/store/use-rename-modal";

export const RenameModal = () => {
    const {mutate, pending} = useApiMutation(api.board.update);

    const {isOpen, onClose, initialValues } = useRenameModal();
    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
          .then(() => {
            toast.success("Board renamed. ");
            onClose();
          })
           .catch(() => toast.error("Failed to rename board."));
    };
    

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Board Title</DialogTitle>
                </DialogHeader>

                <DialogDescription>Enter a new title for this board</DialogDescription>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                      disabled={pending}
                      required
                      maxLength={60}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} 
                      placeholder="Board Title"
                    />

                    <DialogFooter>
                        <DialogClose>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
