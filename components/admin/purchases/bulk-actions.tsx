"use client";

import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiTrash } from "react-icons/fi";
import BulkActions from "../common/bulk-actions";
import DeleteSelectedModal from "../common/deleted-selected-modal";
import { deleteOrders } from "@/lib/actions/admin/orders";
import { getCustomersFromOrders } from "@/lib/actions/admin/get-customers-from-orders";
import { SendOrderCustomersEmailModal } from "./send-order-customers-email-modal";

interface OrdersBulkActionsProps {
  ids: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const OrdersBulkActions = ({ ids, setSelectedIds }: OrdersBulkActionsProps) => {
  const [deleteSelectedModal, setDeleteSelectedModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customerIds, setCustomerIds] = useState<string[]>([]);
  const [customerCount, setCustomerCount] = useState(0);

  const confirmDeleteSelected = () => {
    if (ids.length < 1) {
      toast.error("Please select at least one order");
      return;
    }
    setDeleteSelectedModal(true);
  };

  const openEmailModal = async () => {
    if (ids.length < 1) {
      toast.error("Please select at least one order");
      return;
    }

    setIsLoading(true);
    try {
      const result = await getCustomersFromOrders(ids);

      if (result.success && result.customerIds.length > 0) {
        setCustomerIds(result.customerIds);
        setCustomerCount(result.customerCount ?? 0);
        setEmailModal(true);
      } else {
        toast.error(
          result.message || "No customers found for the selected orders",
        );
      }
    } catch (error) {
      toast.error("Failed to get customer information");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSelectedRecords = async () => {
    setIsLoading(true);
    try {
      const results = await deleteOrders(ids);
      if (results.success) {
        setDeleteSelectedModal(false);
        setSelectedIds([]);
        toast.success("Order(s) deleted");
      } else {
        toast.error(results.message || "Failed to delete orders");
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
    toast.success("Emails sent successfully to customers");
  };

  return (
    <>
      <BulkActions
        actions={[
          {
            icon: <FiMail />,
            text: "Email Customers",
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

      {emailModal && customerIds.length > 0 && (
        <SendOrderCustomersEmailModal
          customerIds={customerIds}
          customerCount={customerCount}
          orderCount={ids.length}
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

export default OrdersBulkActions;
