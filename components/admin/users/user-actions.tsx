"use client";

import RowActions from "@/components/common/row-actions";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteUser from "./delete-user-modal";
import EditUser from "./edit-user-modal";
import { getUser } from "@/lib/actions/users";
import { UserRole } from "@prisma/client";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

const UserActions = ({ id }: { id: string }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  const onEdit = async () => {
    const user = await getUser(id);
    setUser(user);
    setEditModal(true);
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
    </div>
  );
};

export default UserActions;
