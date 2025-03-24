"use client";

import RowActions from "@/components/common/row-actions";
import {
  getComponents,
  getOrder,
  getOrderById,
  getUsers,
} from "@/lib/actions/admin/orders";
import { getUser } from "@/lib/actions/admin/users";
import { Pack, PaymentStatus, UserRole } from "@prisma/client";
import { Download, Eye, Mail } from "lucide-react";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { SendEmailModal } from "../users/send-email-modal";
import DeleteUser from "./delete-order-modal";
import { OrderDetailsModal } from "./order-details-modal";

type TUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

type User = {
  id: string;
  name: string;
};

type Component = {
  id: string;
  name: string;
};

type OrderType = {
  id: string;
  isBundle: boolean;
  isPack: boolean;
  isComponent: boolean;
  pack: Pack | null;
  amount: number;
  status: PaymentStatus;
  orderNumber: string | null;
  userId: string;
  componentId: string | null;
};

interface UserOrderStats {
  totalOrders: number;
  totalSpent: number;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface ComponentData {
  id: string;
  name: string;
  slug: string;
}

interface UserOrderStats {
  totalOrders: number;
  totalSpent: number;
}

interface Order {
  id: string;
  orderNumber: string;
  amount: number;
  date: Date;
  status: string;
  isComponent: boolean;
  isBundle: boolean;
  isPack: boolean;
  pack: string | null;
  componentId: string | null;
  user: UserData;
  component: ComponentData | null;
  userStats?: UserOrderStats;
}

const OrderActions = ({ id, userId }: { id: string; userId: string }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [singleOrder, setSingleOrder] = useState<Order | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [components, setComponents] = useState<Component[]>([]);

  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  const onEdit = async () => {
    setOrder(await getOrder(id));
    setUsers(await getUsers());
    setComponents(await getComponents());
    setEditModal(true);
  };

  const onEmailUser = async () => {
    setUser(await getUser(userId));
    setEmailModal(true);
  };

  const onViewOrder = async () => {
    setSingleOrder(await getOrderById(id, userId));
    setViewModal(true);
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
            text: "View Order",
            onclick: () => onViewOrder(),
          },
          {
            icon: <Mail className="h-4 w-4" />,
            text: "Email Customer",
            onclick: () => onEmailUser(),
          },
          {
            icon: <Download className="h-4 w-4" />,
            text: "Download Invoice",
            onclick: () => alert("Downloading invoice...."),
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

      {emailModal && (
        <SendEmailModal user={user!} onClose={() => setEmailModal(false)} />
      )}

      {viewModal && (
        <OrderDetailsModal
          order={singleOrder!}
          onClose={() => setViewModal(false)}
          onEmailUser={onEmailUser}
        />
      )}
    </div>
  );
};

export default OrderActions;
