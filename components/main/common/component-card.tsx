"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getComponent } from "@/lib/actions/components";
import { Component, ComponentData } from "@/types";
import ComponentPreview from "./component-preview";

interface ComponentCardProps {
  component: ComponentData;
}

const ComponentCard = ({ component }: ComponentCardProps) => {
  const [open, setOpen] = useState(false);
  const [singleComponent, setSingleComponent] = useState<Component | null>(
    null,
  );

  const getSingleComponent = async () => {
    const componentData = await getComponent(component.id);
    setSingleComponent(componentData);
    setOpen(true);
  };

  return (
    <>
      <div
        className="group cursor-pointer overflow-hidden rounded-xl"
        onClick={getSingleComponent}
      >
        <div className="relative aspect-video h-[300px] w-full overflow-hidden">
          <Image
            src={component?.image || `/default-image.jpg`}
            alt={component.name}
            layout="fill"
            objectFit="cover"
            priority
            className="h-full w-full object-cover transition-all ease-linear [object-position:top_center] [transition-duration:_5s] group-hover:[object-position:bottom_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="mb-2 text-lg font-semibold text-white">
              {component.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {component.keywords.slice(0, 2).map((keyword) => (
                <Badge key={keyword} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
              {component.keywords.length > 2 && (
                <Badge
                  variant="outline"
                  className="border-white text-xs text-white"
                >
                  +{component.keywords.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <ComponentPreview
          onClose={() => setOpen(false)}
          component={singleComponent!}
          isOpen={open}
        />
      )}
    </>
  );
};

export default ComponentCard;
