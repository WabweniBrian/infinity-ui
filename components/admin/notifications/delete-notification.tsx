"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { deleteNotification } from "@/lib/actions/admin/notifications";

interface DeleteNotificationProps {
  deleteModal: boolean;
  setDeleteModal: (open: boolean) => void;
  currentId: string;
}
const DeleteNotification = ({
  deleteModal,
  setDeleteModal,
  currentId,
}: DeleteNotificationProps) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      const result = await deleteNotification(currentId);
      if (result.success) {
        toast.success("Notification deleted!");
        setDeleteModal(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <AlertDialog open={deleteModal} onOpenChange={setDeleteModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            Are you sure you want to delete this notification? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel onClick={() => setDeleteModal(false)} autoFocus>
            Cancel
          </AlertDialogCancel>
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
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

export default DeleteNotification;
