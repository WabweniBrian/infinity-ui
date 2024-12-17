/* eslint-disable @next/next/no-img-element */
"use client";

import Modal from "@/components/custom/modal";
import Select from "@/components/custom/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { addComponent } from "@/lib/actions/components";
import { generateSlug } from "@/lib/utils";
import { ComponentSchemaType } from "@/types";
import { componentSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { Tag, TagInput } from "emblor";
import { useEdgeStore } from "@/lib/edgestore";
import { X } from "lucide-react";
import { ImageUpload } from "@/components/common/image-upload";

type Category = {
  value: string;
  label: string;
};

interface AddComponentFormProps {
  categories: Category[];
}

const AddComponentForm = ({ categories }: AddComponentFormProps) => {
  const [open, setOpen] = useState(false);
  const [keywords, setKeywords] = useState<Tag[]>([]);
  const [dependencies, setDependencies] = useState<Tag[]>([]);
  const [styling, setStyling] = useState<Tag[]>([]);
  const [image, setImage] = useState("");
  const { edgestore } = useEdgeStore();
  const [deleting, setDeleting] = useState(false);
  const [keywordsActiveIndex, setKeywordsActiveIndex] = useState<number | null>(
    null,
  );
  const [dependenciesActiveIndex, setDependenciesActiveIndex] = useState<
    number | null
  >(null);
  const [stylingActiveIndex, setStylingActiveIndex] = useState<number | null>(
    null,
  );

  const form = useForm<ComponentSchemaType>({
    resolver: zodResolver(componentSchema),
    defaultValues: {
      name: "",
      isfree: true,
      description: "",
      categoryId: "",
      componentPath: "",
      codeSnippets: [{ fileName: "", extension: "", language: "", code: "" }],
    },
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
      dependencies: dependencies?.map((tag) => tag.text) as string[],
      styling: styling?.map((tag) => tag.text) as string[],
      keywords: keywords?.map((tag) => tag.text) as string[],
      slug: generateSlug(values.name),
      image,
    };
    const results = await addComponent(formattedValues);
    if (results.success) {
      toast.success("Component added");
      setOpen(false);
      form.reset({
        name: "",
        isfree: true,
        description: "",
        categoryId: "",
        componentPath: "",
        codeSnippets: [{ fileName: "", extension: "", language: "", code: "" }],
      });
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
    <>
      <Button onClick={() => setOpen(true)}>+ Add Component</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 p-4">
            <div className="space-y-4 rounded-xl border p-3">
              <h1 className="text-xl font-bold">General Details</h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter component name"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter component description"
                        {...field}
                        disabled={form.formState.isSubmitting}
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
                      <Input
                        placeholder="Enter component path"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      The file path of the component.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="isfree"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label htmlFor="isfree" className="cursor-pointer">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={form.formState.isSubmitting}
                          id="isfree"
                        />
                        <span className="ml-2">Is Free</span>
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Keywords Section */}
            <div className="mt-5 space-y-4 rounded-xl border p-3">
              <h1 className="text-xl font-bold">Keywords</h1>
              <TagInput
                tags={keywords}
                setTags={setKeywords}
                placeholder="Add a keyword"
                styleClasses={{
                  inlineTagsContainer:
                    "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-brand p-1 gap-1",
                  input:
                    "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
                  tag: {
                    body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                    closeButton:
                      "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
                  },
                }}
                activeTagIndex={keywordsActiveIndex}
                setActiveTagIndex={setKeywordsActiveIndex}
              />
            </div>

            {/* Dependencies Section */}
            <div className="mt-5 space-y-4 rounded-xl border p-3">
              <h1 className="text-xl font-bold">Dependencies</h1>
              <TagInput
                tags={dependencies}
                setTags={setDependencies}
                placeholder="Add a dependency"
                styleClasses={{
                  inlineTagsContainer:
                    "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-brand p-1 gap-1",
                  input:
                    "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
                  tag: {
                    body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                    closeButton:
                      "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
                  },
                }}
                activeTagIndex={dependenciesActiveIndex}
                setActiveTagIndex={setDependenciesActiveIndex}
              />
            </div>

            {/* Styling Options Section */}
            <div className="mt-5 space-y-4 rounded-xl border p-3">
              <h1 className="text-xl font-bold">Styling Options</h1>
              <TagInput
                tags={styling}
                setTags={setStyling}
                placeholder="Add a styling option"
                styleClasses={{
                  inlineTagsContainer:
                    "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-transparent focus-within:outline-none focus-within:ring-2 focus-within:ring-brand p-1 gap-1",
                  input:
                    "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
                  tag: {
                    body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                    closeButton:
                      "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
                  },
                }}
                activeTagIndex={stylingActiveIndex}
                setActiveTagIndex={setStylingActiveIndex}
              />
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
                          <Input
                            {...field}
                            disabled={form.formState.isSubmitting}
                          />
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
                          <Input
                            {...field}
                            disabled={form.formState.isSubmitting}
                          />
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
                          <Input
                            {...field}
                            disabled={form.formState.isSubmitting}
                          />
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
                          <Textarea
                            {...field}
                            disabled={form.formState.isSubmitting}
                          />
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

            <div className="mt-6">
              <label htmlFor="image">
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
      </Modal>
    </>
  );
};

export default AddComponentForm;
