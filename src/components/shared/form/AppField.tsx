import type { AnyFieldApi } from "@tanstack/react-form";
import React from "react";
import { Label } from "../../ui/label";
import { cn } from "@/src/lib/utils";

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return String(error);
};

type AppfieldProps = {
  field: AnyFieldApi;
  lable: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const AppField = ({
  field,
  lable,
  type = "text",
  placeholder,
  append,
  prepend,
  className,
  disabled = false,
}: AppfieldProps) => {
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;
  const hasError = firstError !== null;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label
        htmlFor={field.name}
        className={cn(hasError && "text-destructive")}
      >
        {lable}
      </Label>
      <div className=" relative">
        {prepend && (
          <span
            className={
              "absolute inset-y-0 left-0 items-center pl-3 pointer-events-none z-10"
            }
          >
            {prepend}
          </span>
        )}
        <input
          id={field.name}
          name={field.name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${field.name}-error` : undefined}
          className={cn(prepend && "pl-10", append && "pr-10", hasError && "border-destructive focus-visible:ring-destructive/20")}
        />
        {append && (
          <span
            className={
              "absolute inset-y-0 right-0 items-center pr-3 pointer-events-none z-10"
            }
          >
            {append}
          </span>
        )}
        {hasError && (
          <p
            id={`${field.name}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {firstError}
          </p>
        )}
      </div>
    </div>
  );
};

export default AppField;
