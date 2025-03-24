"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { ImSpinner2 } from "react-icons/im";

interface DeleteSelectedModalProps {
  deleteSelectedModal: boolean;
  setDeleteSelectedModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteSelectedRecords: () => void;
}

const DeleteSelectedModal = ({
  deleteSelectedModal,
  setDeleteSelectedModal,
  handleDeleteSelectedRecords,
}: DeleteSelectedModalProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog
      open={deleteSelectedModal}
      onOpenChange={setDeleteSelectedModal}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            Are you sure you want to delete all the selected row(s)? This action
            is irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel
            onClick={() => setDeleteSelectedModal(false)}
            autoFocus
          >
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => startTransition(handleDeleteSelectedRecords)}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-x-2">
                <ImSpinner2 className="animate-spin" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Confirm"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSelectedModal;
