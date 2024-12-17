"use client";

import RowActions from "@/components/common/row-actions";
import { getFormCategories } from "@/lib/actions/categories";
import { getFormComponent } from "@/lib/actions/components";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteComponent from "./delete-component";
import EditComponentDialog from "./edit-component";

type Category = {
  id: string;
  name: string;
};

type Component = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  Componentpath: string;
  dependencies: string[];
  styling: string[];
  keywords: string[];
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
    const component = await getFormComponent(id);
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
