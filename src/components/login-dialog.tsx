import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    // DialogFooter,
    // DialogHeader
} from "./ui/dialog";
// import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { LoginForm } from "./login-form";

export function useLoginDialog() {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    return {
        isOpen,
        openDialog,
        closeDialog,
        setIsOpen,
    };
};

interface LoginDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
};

export function LoginDialog({ isOpen, onOpenChange }: LoginDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='p-5'>
                {/* <DialogHeader>
                    <DialogTitle>Test</DialogTitle>
                    <DialogDescription>An test</DialogDescription>
                </DialogHeader> */}
                <LoginForm className='m-3' />
                {/* <DialogFooter>None</DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}