"use client";

import RowActions from "@/components/common/row-actions";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteUser from "./delete-user-modal";
import EditUser from "./edit-user-modal";
import { getUser, getUserById } from "@/lib/actions/admin/users";
import { AuthMenthod, PaymentStatus, UserRole } from "@prisma/client";
import { Eye, Mail, ShieldCheck, ShieldX, UserRoundCog } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import toast from "react-hot-toast";
import ResetPasswordModal from "./reset-password-modal";
import ToggleUserStatusModal from "./toggle-user-status";
import { SendEmailModal } from "./send-email-modal";
import { UserDetailsModal } from "./user-details-modal";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

type Purchase = {
  id: string;
  amount: number;
  date: Date;
  status: PaymentStatus;
  component: {
    name: string;
  } | null;
};

type Notification = {
  id: string;
  createdAt: Date;
  isRead: boolean | null;
  title: string;
  message: string;
};

type UserType = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  isEmailVerified: boolean | null;
  image: string | null;
  hasPurchased: boolean;
  method: AuthMenthod;
  createdAt: Date;
  updatedAt: Date;
  purchases: Purchase[];
  notifications: Notification[];
};

const UserActions = ({
  id,
  isActive,
  role,
}: {
  id: string;
  isActive: boolean;
  role: string;
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [toggleStatusModal, setToggleStatusModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [singleUser, setSingleUser] = useState<UserType | null>(null);
  const { user: currentUser } = useAuth();

  const confirmDelete = async () => {
    if (currentUser?.role !== "Admin") {
      toast.error("You do not have permission to perform this action");
      return;
    }
    if (currentUser.id === id) {
      toast.error("You cannot delete your own account");
      return;
    }
    setDeleteModal(true);
  };

  const onEdit = async () => {
    if (role === "Admin" && currentUser?.role !== "Admin") {
      toast.error("You do not have permission to edit an admin details");
      return;
    }
    const user = await getUser(id);
    setUser(user);
    setEditModal(true);
  };

  const onEmailUser = async () => {
    const user = await getUser(id);
    setUser(user);
    setEmailModal(true);
  };

  const onViewUser = async () => {
    const user = await getUserById(id);
    setSingleUser(user);
    setViewModal(true);
  };

  const onResetPassword = () => {
    if (currentUser?.role !== "Admin") {
      toast.error("You do not have permission to perform this action");
      return;
    }
    setResetPasswordModal(true);
  };

  const onToggleUserStatus = async () => {
    if (currentUser?.id === id) {
      toast.error("You cannot deactivate your own account");
      return;
    }
    if (role === "Admin" && currentUser?.role !== "Admin") {
      toast.error("You do not have permission to deactivate an admin account");
      return;
    }
    const user = await getUser(id);
    setUser(user);
    setToggleStatusModal(true);
  };

  return (
    <div>
      <RowActions
        actions={[
          {
            icon: <FiEdit />,
            text: "Edit",
            onclick: () => onEdit(),
          },
          {
            icon: <Eye className="h-4 w-4" />,
            text: "View User",
            onclick: () => onViewUser(),
          },
          {
            icon: <Mail className="h-4 w-4" />,
            text: "Email User",
            onclick: () => onEmailUser(),
          },
          {
            icon: <UserRoundCog className="h-4 w-4" />,
            text: "Reset User Password",
            onclick: () => onResetPassword(),
          },
          {
            icon: isActive ? (
              <ShieldX className="h-4 w-4" />
            ) : (
              <ShieldCheck className="h-4 w-4" />
            ),
            text: isActive ? "Deactivate User" : "Activate User",
            onclick: () => onToggleUserStatus(),
          },
          {
            icon: <FiTrash />,
            text: "Delete",
            onclick: () => confirmDelete(),
          },
        ]}
      />
      <DeleteUser
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        currentId={id}
      />

      {editModal && (
        <EditUser
          editModal={editModal}
          setEditModal={setEditModal}
          user={user!}
        />
      )}

      {emailModal && (
        <SendEmailModal user={user!} onClose={() => setEmailModal(false)} />
      )}

      {viewModal && (
        <UserDetailsModal
          user={singleUser!}
          onClose={() => setViewModal(false)}
          onEmailUser={onEmailUser}
        />
      )}

      <ResetPasswordModal
        resetPasswordModal={resetPasswordModal}
        setResetPasswordModal={setResetPasswordModal}
        userId={id}
      />

      <ToggleUserStatusModal
        toggleStatusModal={toggleStatusModal}
        setToggleStatusModal={setToggleStatusModal}
        user={{
          id: user?.id!,
          isActive: user?.isActive!,
        }}
      />
    </div>
  );
};

export default UserActions;
