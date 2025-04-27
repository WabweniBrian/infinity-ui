"use client";

import RowActions from "@/components/common/row-actions";
import {
  getFormComponents,
  getFormEditPurchase,
  getFormUsers,
  getOrder,
  getOrderById,
} from "@/lib/actions/admin/orders";
import { getUser } from "@/lib/actions/admin/users";
import { Pack, PaymentStatus, UserRole } from "@prisma/client";
import { Download, Eye, Mail, RefreshCw } from "lucide-react";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { SendEmailModal } from "../users/send-email-modal";
import DeleteOrder from "./delete-order-modal";
import { OrderDetailsModal } from "./order-details-modal";
import { EditPurchaseModal } from "./edit-purchase-modal";
import { UpdateStatusModal } from "./update-status-modal";

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
  address?: string | null;
  phone?: string | null;
  zipCode?: string | null;
  paymentProvider?: string | null;
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
  address?: string | null;
  phone?: string | null;
  zipCode?: string | null;
}

const OrderActions = ({
  id,
  userId,
  status,
}: {
  id: string;
  userId: string;
  status: PaymentStatus;
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [singleOrder, setSingleOrder] = useState<Order | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const confirmDelete = () => {
    setDeleteModal(true);
  };

  const onEdit = async () => {
    setOrder(await getFormEditPurchase(id));
    setComponents(await getFormComponents());
    setUsers(await getFormUsers());
    setEditModal(true);
  };

  const onUpdateStatus = async () => {
    const orderData = await getOrder(id);
    setOrder(orderData);
    setStatusModal(true);
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
            icon: <RefreshCw className="h-4 w-4" />,
            text: "Update Status",
            onclick: () => onUpdateStatus(),
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

      {/* Delete Modal */}
      {deleteModal && (
        <DeleteOrder
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          currentId={id}
        />
      )}

      {/* Edit Modal */}
      {editModal && order && (
        <EditPurchaseModal
          open={editModal}
          onOpenChange={setEditModal}
          order={order}
          components={components}
          users={users}
        />
      )}

      {/* Update Status Modal */}
      {statusModal && order && (
        <UpdateStatusModal
          open={statusModal}
          onOpenChange={setStatusModal}
          orderId={order.id}
          currentStatus={order.status}
          orderNumber={order.orderNumber}
        />
      )}

      {/* Email Modal */}
      {emailModal && user && (
        <SendEmailModal user={user} onClose={() => setEmailModal(false)} />
      )}

      {/* View Order Modal */}
      {viewModal && singleOrder && (
        <OrderDetailsModal
          order={singleOrder}
          onClose={() => setViewModal(false)}
          onEmailUser={onEmailUser}
        />
      )}
    </div>
  );
};

export default OrderActions;
