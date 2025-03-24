"use client";

import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiTrash } from "react-icons/fi";
import BulkActions from "../common/bulk-actions";
import DeleteSelectedModal from "../common/deleted-selected-modal";
import { deleteOrders } from "@/lib/actions/admin/orders";

interface OrdersBulkActionsProps {
  ids: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const OrdersBulkActions = ({ ids, setSelectedIds }: OrdersBulkActionsProps) => {
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
      const results = await deleteOrders(ids);
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

  return (
    <>
      <BulkActions
        actions={[
          {
            icon: <FiMail />,
            text: "Email Customers",
            onclick: () => alert("Emailing customers..."),
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

export default OrdersBulkActions;
