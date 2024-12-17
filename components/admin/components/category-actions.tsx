"use client";

import RowActions from "@/components/common/row-actions";
import { getCategory } from "@/lib/actions/categories";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteCategory from "./delete-category";
import EditCategoryDialog from "./edit-category";

type Category = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
};

const CategoryActions = ({ id }: { id: string }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  const onEdit = async () => {
    const category = await getCategory(id);
    setCategory(category);
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
      <DeleteCategory
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        currentId={id}
      />

      {editModal && (
        <EditCategoryDialog
          editModal={editModal}
          setEditModal={setEditModal}
          category={category!}
        />
      )}
    </div>
  );
};

export default CategoryActions;
