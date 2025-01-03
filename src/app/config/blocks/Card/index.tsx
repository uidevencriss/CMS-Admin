import React, { ReactElement, Suspense } from "react";
import { ComponentConfig } from "../../../../core/types";
import styles from "./styles.module.css";
import { getClassNameFactory } from "../../../../core/lib";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const getClassName = getClassNameFactory("Card", styles);

// Lazy loaded icons ko Suspense ke saath wrap karna
const icons = Object.keys(dynamicIconImports).reduce<
  Record<string, ReactElement>
>((acc, iconName) => {
  const El = React.lazy((dynamicIconImports as any)[iconName]); // Dynamic imports

  return {
    ...acc,
    [iconName]: (
      <Suspense fallback={<span>Loading...</span>}>
        <El />
      </Suspense>
    ),
  };
}, {});

// Options ke liye dynamic list
const iconOptions = Object.keys(dynamicIconImports).map((iconName) => ({
  label: iconName,
  value: iconName,
}));

export type CardProps = {
  title: string;
  description: string;
  icon?: string;
  mode: "flat" | "card";
};

export const Card: ComponentConfig<CardProps> = {
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
    icon: {
      type: "select",
      options: iconOptions,
    },
    mode: {
      type: "radio",
      options: [
        { label: "card", value: "card" },
        { label: "flat", value: "flat" },
      ],
    },
  },
  defaultProps: {
    title: "Title",
    description: "Description",
    icon: "Feather",
    mode: "flat",
  },
  render: ({ title, icon, description, mode }) => {
    return (
      <div className={getClassName({ [mode]: mode })}>
        <div className={getClassName("icon")}>{icon && icons[icon]}</div>
        <div className={getClassName("title")}>{title}</div>
        <div className={getClassName("description")}>{description}</div>
      </div>
    );
  },
};
