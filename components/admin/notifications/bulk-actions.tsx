"use client";

import {
  deleteNotifications,
  markNotificationsRead,
} from "@/lib/actions/admin/notifications";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiTrash } from "react-icons/fi";
import BulkActions from "../common/bulk-actions";
import DeleteSelectedModal from "../common/deleted-selected-modal";

interface NotificationsBulkActionsProps {
  ids: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const NotificationsBulkActions = ({
  ids,
  setSelectedIds,
}: NotificationsBulkActionsProps) => {
  const [deleteSelectedModal, setDeleteSelectedModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const confirmDeleteSelected = () => {
    if (ids.length < 1) {
      toast.error("Please select at least one row");
      return;
    }
    setDeleteSelectedModal(true);
  };

  const handleDeleteSelectedRecords = async () => {
    setIsLoading(true);
    try {
      const results = await deleteNotifications(ids);
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

  const handleMarkNotificationsRead = async () => {
    if (ids.length < 1) {
      toast.error("Please select at least one row");
      return;
    }

    setIsLoading(true);
    try {
      const results = await markNotificationsRead(ids);
      if (results.success) {
        setSelectedIds([]);
        toast.success("Notifications marked as read!");
      } else {
        toast.error(results.message || "Failed to mark as read");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BulkActions
        actions={[
          {
            icon: <FiCheckCircle />,
            text: "Mark as Read",
            onclick: () => handleMarkNotificationsRead(),
            disabled: isLoading,
          },
          {
            icon: <FiTrash />,
            text: "Delete Selected",
            onclick: () => confirmDeleteSelected(),
            disabled: isLoading,
          },
        ]}
      />

      <DeleteSelectedModal
        deleteSelectedModal={deleteSelectedModal}
        setDeleteSelectedModal={setDeleteSelectedModal}
        handleDeleteSelectedRecords={handleDeleteSelectedRecords}
      />
    </>
  );
};

export default NotificationsBulkActions;
