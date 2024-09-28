/* eslint-disable @next/next/no-img-element */
"use client";

import { ImageUpload } from "@/components/common/image-upload";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { Dialog, DialogContent } from "../ui/dialog";
import { useAuth } from "@/hooks/use-auth";

interface EditProfileImageProps {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const UpdateProfileImage = ({
  editModal,
  setEditModal,
  image,
  setImage,
}: EditProfileImageProps) => {
  const { edgestore } = useEdgeStore();
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();

  const onReset = () => {
    setEditModal(false);
  };

  const handleSubmit = async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    try {
      setLoading(true);
      await updateUser({ image });
      toast.success("Image Updated successfully");
      onReset();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async () => {
    try {
      setDeleting(true);
      await edgestore.publicFiles.delete({
        url: image,
      });
      setImage("");
      toast.success("Image deleted");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={editModal} onOpenChange={() => setEditModal(!editModal)}>
      <DialogContent>
        <div className="mt-5">
          <h3 className="mb-2 text-lg font-bold">Edit Profile Image</h3>
          <div>
            <label htmlFor="category">
              Image (Delete old image to upload new one)
            </label>
            {image && (
              <div className="relative">
                <img
                  src={image}
                  alt="Image"
                  className="mx-auto my-2 h-[150px] w-[150px] rounded-full object-cover"
                />
                <div
                  className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform cursor-pointer"
                  onClick={deleteFile}
                >
                  <div className="border-border0 flex h-5 w-5 items-center justify-center rounded-md border bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:bg-black">
                    {deleting ? (
                      <ImSpinner2 className="animate-spin text-sm text-gray-500 dark:text-gray-400" />
                    ) : (
                      <X
                        className="text-gray-500 dark:text-gray-400"
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            {!image && <ImageUpload setImage={setImage} />}
          </div>

          <div className="mt-4 justify-end gap-3 flex-align-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onReset();
              }}
            >
              Cancel
            </Button>
            <Button disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <div className="gap-x-2 flex-align-center">
                  <ImSpinner2 className="animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileImage;
