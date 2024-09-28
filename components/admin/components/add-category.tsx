/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { addCategory } from "@/lib/actions/categories";
import { useEdgeStore } from "@/lib/edgestore";
import { ImSpinner2 } from "react-icons/im";
import { ImageUpload } from "@/components/common/image-upload";
import { X } from "lucide-react";
import { CategorySchemaType } from "@/types";
import { categorySchema } from "@/validation/schemas";

const AddCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const { edgestore } = useEdgeStore();
  const [deleting, setDeleting] = useState(false);

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      categoryType: undefined,
    },
  });

  const onSubmit = async (values: CategorySchemaType) => {
    const results = await addCategory({
      name: values.name,
      description: values.description,
      image,
      categoryType: values.categoryType,
    });
    if (results.success) {
      toast.success("Category created");
      setOpen(false);
      form.reset();
      setImage("");
    } else {
      toast.error(results.message);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new category for components. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Marketing_And_Ecommerce">
                        Marketing and Ecommerce
                      </SelectItem>
                      <SelectItem value="Dashboard">Dashboard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label htmlFor="category">
                Image (Delete old image to upload new one)
              </label>
              {image && (
                <div className="relative">
                  <img
                    src={image}
                    alt="Image"
                    className="mx-auto my-2 h-[150px] w-full object-cover"
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
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <div className="gap-x-2 flex-center-center">
                    <ImSpinner2 className="animate-spin text-lg" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
