"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const DeleteAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const deleteAccount = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/auth/delete-account`);
      toast.success(response.data);
      logout();
    } catch (error: any) {
      toast.error("Error deleting account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl border p-2 sm:p-4">
      <div className="flex-col gap-6 flex-center-between md:flex-row">
        <div>
          <h2 className="text-2xl font-semibold">Delete Account</h2>
          <p className="mt-1">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </p>
        </div>

        <Dialog
          open={isModalOpen}
          onOpenChange={() => setIsModalOpen(!isModalOpen)}
        >
          <DialogTrigger asChild>
            <div className="flex-shrink-0 self-end">
              <Button variant="destructive">Delete account</Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <div className="p-4">
              <h1 className="mb-2 text-xl font-semibold">
                Are you absolutely sure?
              </h1>
              <p>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>

              <div className="mt-4 justify-end gap-x-3 flex-align-center">
                <Button
                  variant="outline"
                  autoFocus
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="uppercase"
                  disabled={loading}
                  onClick={deleteAccount}
                >
                  {loading ? (
                    <div className="gap-x-2 flex-center-center">
                      <ImSpinner2 className="animate-spin" />
                      <span>Deleting...</span>
                    </div>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DeleteAccount;
