"use client";

import type React from "react";
import { useState } from "react";
import BulkActions from "../common/bulk-actions";
import toast from "react-hot-toast";
import {
  deleteComponents,
  toggleComponentsFeature,
  toggleComponentsVisibility,
  toggleComponentsNew,
} from "@/lib/actions/admin/components";
import DeleteSelectedModal from "../common/deleted-selected-modal";
import { FiEye, FiEyeOff, FiStar, FiTrash, FiTag } from "react-icons/fi";

interface ComponentsBulkActionsProps {
  ids: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const ComponentsBulkActions = ({
  ids,
  setSelectedIds,
}: ComponentsBulkActionsProps) => {
  const [deleteSelectedModal, setDeleteSelectedModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const confirmDeleteSelected = () => {
    if (ids.length < 1) {
      toast.error("Please select at least one row");
      return;
    }
    setDeleteSelectedModal(true);
  };

  const handleDeleteSelectedRecords = async () => {
    setIsLoading(true);
    try {
      const results = await deleteComponents(ids);
      if (results.success) {
        setDeleteSelectedModal(false);
        setSelectedIds([]);
        toast.success("Record(s) deleted");
      } else {
        toast.error(results.message || "Failed to delete records");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureComponents = async () => {
    if (ids.length < 1) {
      toast.error("Please select at least one row");
      return;
    }

    setIsLoading(true);
    try {
      const results = await toggleComponentsFeature(ids, true);
      if (results.success) {
        setSelectedIds([]);
        toast.success("Components featured successfully");
      } else {
        toast.error(results.message || "Failed to feature components");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfeatureComponents = async () => {
    if (ids.length < 1) {
      toast.error("Please select at least one row");
      return;
    }

    setIsLoading(true);
    try {
      const results = await toggleComponentsFeature(ids, false);
      if (results.success) {
        setSelectedIds([]);
        toast.success("Components unfeatured successfully");
      } else {
        toast.error(results.message || "Failed to unfeature components");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowComponents = async () => {
    if (ids.length < 1) {
      toast.error("Please select at least one row");
      return;
    }

    setIsLoading(true);
    try {
      const results = await toggleComponentsVisibility(ids, true);
      if (results.success) {
        setSelectedIds([]);
        toast.success("Components are now visible");
      } else {
        toast.error(results.message || "Failed to update components");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHideComponents = async () => {
    if (ids.length < 1) {
      toast.error("Please select at least one row");
      return;
    }

    setIsLoading(true);
    try {
      const results = await toggleComponentsVisibility(ids, false);
      if (results.success) {
        setSelectedIds([]);
        toast.success("Components are now hidden");
      } else {
        toast.error(results.message || "Failed to update components");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsNew = async () => {
    if (ids.length < 1) {
      toast.error("Please select at least one row");
      return;
    }

    setIsLoading(true);
    try {
      const results = await toggleComponentsNew(ids, true);
      if (results.success) {
        setSelectedIds([]);
        toast.success("Components marked as new");
      } else {
        toast.error(results.message || "Failed to update components");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveNew = async () => {
    if (ids.length < 1) {
      toast.error("Please select at least one row");
      return;
    }

    setIsLoading(true);
    try {
      const results = await toggleComponentsNew(ids, false);
      if (results.success) {
        setSelectedIds([]);
        toast.success("New tag removed from components");
      } else {
        toast.error(results.message || "Failed to update components");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BulkActions
        actions={[
          {
            icon: <FiStar />,
            text: "Feature Selected",
            onclick: () => handleFeatureComponents(),
            disabled: isLoading,
          },
          {
            icon: <FiStar />,
            text: "Unfeature Selected",
            onclick: () => handleUnfeatureComponents(),
            disabled: isLoading,
          },
          {
            icon: <FiEye />,
            text: "Show Selected",
            onclick: () => handleShowComponents(),
            disabled: isLoading,
          },
          {
            icon: <FiEyeOff />,
            text: "Hide Selected",
            onclick: () => handleHideComponents(),
            disabled: isLoading,
          },
          {
            icon: <FiTag />,
            text: "Mark as New",
            onclick: () => handleMarkAsNew(),
            disabled: isLoading,
          },
          {
            icon: <FiTag />,
            text: "Remove New Tag",
            onclick: () => handleRemoveNew(),
            disabled: isLoading,
          },
          {
            icon: <FiTrash />,
            text: "Delete Selected",
            onclick: () => confirmDeleteSelected(),
            disabled: isLoading,
          },
        ]}
      />

      <DeleteSelectedModal
        deleteSelectedModal={deleteSelectedModal}
        setDeleteSelectedModal={setDeleteSelectedModal}
        handleDeleteSelectedRecords={handleDeleteSelectedRecords}
      />
    </>
  );
};

export default ComponentsBulkActions;
