"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toggleUserStatus } from "@/lib/actions/admin/users";

interface ToggleUserStatusModalProps {
  toggleStatusModal: boolean;
  setToggleStatusModal: (open: boolean) => void;
  user: {
    id: string;
    isActive: boolean;
  };
}

const ToggleUserStatusModal = ({
  toggleStatusModal,
  setToggleStatusModal,
  user,
}: ToggleUserStatusModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleUserStatus = async () => {
    setIsLoading(true);
    const results = await toggleUserStatus(user.id);
    setIsLoading(false);
    if (results.success) {
      toast.success(
        `The user has been ${user.isActive ? "deactivated" : "activated"}.`,
      );
      setToggleStatusModal(false);
      router.refresh();
    } else {
      toast.error("Failed to update user status.");
    }
  };

  return (
    <Dialog open={toggleStatusModal} onOpenChange={setToggleStatusModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user.isActive ? "Deactivate" : "Activate"} User
          </DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to {user.isActive ? "deactivate" : "activate"}{" "}
          this user?
        </p>
        {user.isActive && (
          <p className="text-red-500">
            Users whose accounts are deactivated will not be able to log in or
            access respective dashboards.
          </p>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setToggleStatusModal(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant={user.isActive ? "destructive" : "default"}
            onClick={handleToggleUserStatus}
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : user.isActive
                ? "Deactivate User"
                : "Activate User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleUserStatusModal;
