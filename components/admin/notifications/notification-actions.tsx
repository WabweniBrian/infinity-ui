"use client";

import {
  getNotification,
  getNotificationById,
  getUsers,
} from "@/lib/actions/admin/notifications";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiEdit, FiEye, FiTrash } from "react-icons/fi";
import { markNotificationRead } from "../../../lib/actions/admin/notifications";
import DeleteNotification from "./delete-notification";
import EditNotification from "./edit-notification";
import { NotificationDetailsModal } from "./notification-details-modal";
import RowActions from "@/components/common/row-actions";

type Notification = {
  id: string;
  userId: string | null;
  type: string;
  isAdmin: boolean | null;
  title: string;
  message: string;
};

type TNotification = {
  id: string;
  userId: string | null;
  type: string;
  isRead: boolean | null;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
};

type User = {
  id: string;
  name: string;
};

interface NotificationActionsProps {
  id: string;
  isRead: boolean;
  isAdmin: boolean;
}

const NotificationActions = ({
  id,
  isRead,
  isAdmin,
}: NotificationActionsProps) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [formNotification, setFormNotification] = useState<Notification | null>(
    null,
  );
  const [notification, setNotification] = useState<TNotification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  const onEdit = async () => {
    setIsLoading(true);
    try {
      setFormNotification(await getNotification(id));
      setUsers(await getUsers());
      setEditModal(true);
    } catch (error) {
      toast.error("Failed to load notification data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openNotificationDetails = async () => {
    setIsLoading(true);
    try {
      setNotification(await getNotificationById(id));
      setViewModal(true);
    } catch (error) {
      toast.error("Failed to load notification details");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkNotificationRead = async () => {
    setIsLoading(true);
    try {
      const result = await markNotificationRead(id);
      if (result.success) {
        toast.success("Notification marked as read");
      } else {
        toast.error(result.message || "Failed to update notification");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <RowActions
        actions={[
          {
            icon: <FiEdit />,
            text: "Edit",
            onclick: () => onEdit(),
            disabled: isLoading,
          },
          {
            icon: <FiEye />,
            text: "View",
            onclick: () => openNotificationDetails(),
            disabled: isLoading,
          },
          {
            icon: <FiCheckCircle />,
            text: isRead ? "Read" : "Mark as Read",
            onclick: () => handleMarkNotificationRead(),
            disabled: isLoading || isRead || !isAdmin,
          },

          {
            icon: <FiTrash />,
            text: "Delete",
            onclick: () => confirmDelete(),
            disabled: isLoading,
          },
        ]}
      />
      <DeleteNotification
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        currentId={id}
      />

      {editModal && (
        <EditNotification
          open={editModal}
          onOpenChange={setEditModal}
          notification={formNotification!}
          users={users}
        />
      )}

      {viewModal && (
        <NotificationDetailsModal
          notification={notification!}
          onClose={() => setViewModal(false)}
        />
      )}
    </div>
  );
};

export default NotificationActions;
