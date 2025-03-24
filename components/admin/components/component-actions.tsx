"use client";

import RowActions from "@/components/common/row-actions";
import { getFormCategories } from "@/lib/actions/categories";
import { getFormComponent } from "@/lib/actions/components";
import { useState } from "react";
import {
  FiEdit,
  FiEye,
  FiTrash,
  FiStar,
  FiEyeOff,
  FiTag,
} from "react-icons/fi";
import DeleteComponent from "./delete-component";
import EditComponentDialog from "./edit-component";
import type { CodeSnippet, Component } from "@prisma/client";
import {
  getComponentById,
  toggleComponentFeature,
  toggleComponentVisibility,
  toggleComponentNew,
} from "@/lib/actions/admin/components";
import { ComponentDetailsModal } from "./component-details-modal";
import toast from "react-hot-toast";

type Category = {
  id: string;
  name: string;
};

type TComponent = Component & {
  category: { name: string; slug: string };
  codeSnippets: CodeSnippet[];
};

type FormComponent = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  Componentpath: string;
  isfree: boolean;
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

interface ComponentActionsProps {
  component: {
    id: string;
    isNew: boolean;
    isFeatured: boolean;
    show: boolean;
  };
}

const ComponentActions = ({
  component: { id, isNew, isFeatured, show },
}: ComponentActionsProps) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [formComponent, setFormComponent] = useState<FormComponent | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [component, setComponent] = useState<TComponent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  const onEdit = async () => {
    setIsLoading(true);
    try {
      const component = await getFormComponent(id);
      const categories = await getFormCategories();
      setFormComponent(component);
      setCategories(categories);
      setEditModal(true);
    } catch (error) {
      toast.error("Failed to load component data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openComponentDetails = async () => {
    setIsLoading(true);
    try {
      const component = await getComponentById(id);
      setComponent(component);
      setViewModal(true);
    } catch (error) {
      toast.error("Failed to load component details");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFeature = async () => {
    setIsLoading(true);
    try {
      const result = await toggleComponentFeature(id);
      if (result.success) {
        toast.success(
          result.isFeatured ? "Component featured" : "Component unfeatured",
        );
      } else {
        toast.error(result.message || "Failed to update component");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVisibility = async () => {
    setIsLoading(true);
    try {
      const result = await toggleComponentVisibility(id);
      if (result.success) {
        toast.success(
          result.show ? "Component is now visible" : "Component is now hidden",
        );
      } else {
        toast.error(result.message || "Failed to update component");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleNew = async () => {
    setIsLoading(true);
    try {
      const result = await toggleComponentNew(id);
      if (result.success) {
        toast.success(
          result.isNew
            ? "Component marked as new"
            : "Component unmarked as new",
        );
      } else {
        toast.error(result.message || "Failed to update component");
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
            onclick: () => openComponentDetails(),
            disabled: isLoading,
          },
          {
            icon: <FiStar />,
            text: isFeatured ? "Unfeature" : "Feature",
            onclick: () => handleToggleFeature(),
            disabled: isLoading,
          },
          {
            icon: show ? <FiEyeOff /> : <FiEye />,
            text: show ? "Hide" : "Show",
            onclick: () => handleToggleVisibility(),
            disabled: isLoading,
          },
          {
            icon: <FiTag />,
            text: isNew ? "Remove New Tag" : "Mark as New",
            onclick: () => handleToggleNew(),
            disabled: isLoading,
          },
          {
            icon: <FiTrash />,
            text: "Delete",
            onclick: () => confirmDelete(),
            disabled: isLoading,
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
          component={formComponent!}
          categories={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      )}

      {viewModal && (
        <ComponentDetailsModal
          component={component!}
          onClose={() => setViewModal(false)}
        />
      )}
    </div>
  );
};

export default ComponentActions;
