"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { deleteCategory } from "@/lib/actions/categories";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface DeleteCategoryProps {
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentId: string;
}
const DeleteCategory = ({
  deleteModal,
  setDeleteModal,
  currentId,
}: DeleteCategoryProps) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      const result = await deleteCategory(currentId);
      if (result.success) {
        toast.success("Category deleted!");
        setDeleteModal(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
      <DialogContent>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this category?</p>
          <div className="my-4 justify-end gap-3 flex-align-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteModal(false)}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isPending}
            >
              {isPending ? (
                <div className="gap-x-2 flex-align-center">
                  <ImSpinner2 className="animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
