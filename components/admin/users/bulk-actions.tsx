"use client";

import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiTrash } from "react-icons/fi";
import BulkActions from "../common/bulk-actions";
import DeleteSelectedModal from "../common/deleted-selected-modal";
import { deleteUsers } from "@/lib/actions/admin/users";
import { SendBulkEmailModal } from "./send-bulk-email-modal";

interface UsersBulkActionsProps {
  ids: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const UsersBulkActions = ({ ids, setSelectedIds }: UsersBulkActionsProps) => {
  const [deleteSelectedModal, setDeleteSelectedModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const confirmDeleteSelected = () => {
    if (ids.length < 1) {
      toast.error("Please select at least one user");
      return;
    }
    setDeleteSelectedModal(true);
  };

  const openEmailModal = () => {
    if (ids.length < 1) {
      toast.error("Please select at least one user");
      return;
    }
    setEmailModal(true);
  };

  const handleDeleteSelectedRecords = async () => {
    setIsLoading(true);
    try {
      const results = await deleteUsers(ids);
      if (results.success) {
        setDeleteSelectedModal(false);
        setSelectedIds([]);
        toast.success("Record(s) deleted");
      } else {
        toast.error(results.message || "Failed to delete records");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSuccess = () => {
    setEmailModal(false);
    toast.success("Emails sent successfully");
  };

  return (
    <>
      <BulkActions
        actions={[
          {
            icon: <FiMail />,
            text: "Email Users",
            onclick: openEmailModal,
            disabled: isLoading,
          },
          {
            icon: <FiTrash />,
            text: "Delete Selected",
            onclick: confirmDeleteSelected,
            disabled: isLoading,
          },
        ]}
      />

      {emailModal && (
        <SendBulkEmailModal
          userIds={ids}
          userCount={ids.length}
          onClose={() => setEmailModal(false)}
          onSuccess={handleEmailSuccess}
        />
      )}

      <DeleteSelectedModal
        deleteSelectedModal={deleteSelectedModal}
        setDeleteSelectedModal={setDeleteSelectedModal}
        handleDeleteSelectedRecords={handleDeleteSelectedRecords}
      />
    </>
  );
};

export default UsersBulkActions;
