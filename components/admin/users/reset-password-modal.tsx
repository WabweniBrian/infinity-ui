"use client";

import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { EyeIcon, EyeOff } from "lucide-react";
import { resetUserPassword } from "@/lib/actions/admin/users";

interface ResetPasswordModalProps {
  resetPasswordModal: boolean;
  setResetPasswordModal: (open: boolean) => void;
  userId: string;
}

const ResetPasswordModal = ({
  resetPasswordModal,
  setResetPasswordModal,
  userId,
}: ResetPasswordModalProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const results = await resetUserPassword(userId, newPassword);
    setIsLoading(false);
    if (results.success) {
      toast.success("User's password has been reset.");
      setResetPasswordModal(false);
      setNewPassword("");
    } else {
      toast.error("Failed to reset user's password.");
    }
  };

  return (
    <Dialog open={resetPasswordModal} onOpenChange={setResetPasswordModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset User Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleResetPassword}>
          <div className="relative">
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-600 dark:text-gray-200" />
              )}
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setResetPasswordModal(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || newPassword.length < 6}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;
