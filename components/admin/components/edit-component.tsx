"use client";

import Select from "@/components/custom/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateComponent } from "@/lib/actions/components";
import { ComponentSchemaType } from "@/types";
import { componentSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

type Category = {
  value: string;
  label: string;
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

interface EditComponentFormProps {
  categories: Category[];
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  component: Component;
}

const EditComponentForm = ({
  categories,
  editModal,
  setEditModal,
  component,
}: EditComponentFormProps) => {
  const form = useForm<ComponentSchemaType>({
    resolver: zodResolver(componentSchema),
    defaultValues: {
      name: component.name,
      slug: component.slug,
      description: component.description || "",
      categoryId: component.categoryId,
      componentPath: component.Componentpath,
      dependencies: component.dependencies.map((d) => ({ value: d })),
      styling: component.styling.map((s) => ({ value: s })),
      codeSnippets: component.codeSnippets.map((c) => ({ ...c })),
    },
  });

  const {
    fields: dependencyFields,
    append: appendDependency,
    remove: removeDependency,
  } = useFieldArray({
    control: form.control,
    name: "dependencies",
  });

  const {
    fields: stylingFields,
    append: appendStyling,
    remove: removeStyling,
  } = useFieldArray({
    control: form.control,
    name: "styling",
  });

  const {
    fields: codeSnippetFields,
    append: appendCodeSnippet,
    remove: removeCodeSnippet,
  } = useFieldArray({
    control: form.control,
    name: "codeSnippets",
  });

  const onSubmit = async (values: ComponentSchemaType) => {
    const formattedValues = {
      ...values,
      dependencies: values.dependencies.map((d) => d.value),
      styling: values.styling.map((s) => s.value),
    };
    const results = await updateComponent(component.id, formattedValues);
    if (results.success) {
      toast.success("Component updated");
      setEditModal(false);
    } else {
      toast.error(results.message);
    }
  };

  return (
    <Dialog open={editModal} onOpenChange={setEditModal}>
      <DialogContent className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
            <div className="space-y-4 rounded-xl border p-3">
              <h1 className="text-xl font-bold">General Details</h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter component name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of your UI component.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter slug" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL-friendly version of the name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter component description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description of the component.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      defaultValue={field.value}
                      options={categories}
                      onSelect={field.onChange}
                      text="Select a category"
                    />
                    <FormDescription>
                      The category this component belongs to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="componentPath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Path</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter component path" {...field} />
                    </FormControl>
                    <FormDescription>
                      The file path of the component.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5 space-y-4 rounded-xl border p-3">
              <h1 className="text-xl font-bold">Dependencies</h1>
              {dependencyFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`dependencies.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input {...field} />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeDependency(index)}
                          >
                            -
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => appendDependency({ value: "" })}
              >
                Add Dependency
              </Button>
            </div>

            <div className="mt-5 space-y-4 rounded-xl border p-3">
              <h1 className="text-xl font-bold">Styling Options</h1>
              {stylingFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`styling.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input {...field} />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeStyling(index)}
                          >
                            -
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => appendStyling({ value: "" })}
              >
                Add Styling Option
              </Button>
            </div>

            <div className="mt-5 space-y-4 rounded-xl border p-3">
              <h1 className="text-xl font-bold">Code Snippets</h1>
              {codeSnippetFields.map((field, index) => (
                <div key={field.id} className="mb-4 rounded-md border p-4">
                  <FormField
                    control={form.control}
                    name={`codeSnippets.${index}.fileName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`codeSnippets.${index}.extension`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Extension</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`codeSnippets.${index}.language`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`codeSnippets.${index}.code`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="mt-2"
                    onClick={() => removeCodeSnippet(index)}
                  >
                    Remove Code Snippet
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendCodeSnippet({
                    fileName: "",
                    extension: "",
                    language: "",
                    code: "",
                  })
                }
              >
                Add Code Snippet
              </Button>
            </div>

            <Button
              type="submit"
              className="mt-5"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="gap-x-2 flex-center-center">
                  <ImSpinner2 className="animate-spin text-lg" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditComponentForm;
