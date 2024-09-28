"use client";

import RowActions from "@/components/common/row-actions";
import { getComponent } from "@/lib/actions/components";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteComponent from "./delete-component";
import EditComponentDialog from "./edit-component";
import { getFormCategories } from "@/lib/actions/categories";

type Category = {
  id: string;
  name: string;
};

type Component = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  Componentpath: string;
  dependencies: string[];
  styling: string[];
  categoryId: string;
  codeSnippets: {
    id: string;
    fileName: string;
    extension: string;
    language: string;
    code: string;
  }[];
};

const ComponentActions = ({ id }: { id: string }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [component, setComponent] = useState<Component | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const confirmDelete = async () => {
    setDeleteModal(true);
  };


  const onEdit = async () => {
    const component = await getComponent(id);
    const categories = await getFormCategories();
    setComponent(component);
    setCategories(categories);
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
      <DeleteComponent
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        currentId={id}
      />

      {editModal && (
        <EditComponentDialog
          editModal={editModal}
          setEditModal={setEditModal}
          component={component!}
          categories={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      )}
    </div>
  );
};

export default ComponentActions;
