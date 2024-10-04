import {
  Field,
  Input as FluentInput,
  InputProps,
} from "@fluentui/react-components";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface IInput<T extends FieldValues> extends InputProps {
  placeholder?: string;
  contentBefore?: any;
  contentAfter?: any;
  disabled?: boolean;
  name: Path<T>;
  control: Control<T, unknown>;
  type?:
    | "number"
    | "time"
    | "text"
    | "search"
    | "tel"
    | "url"
    | "email"
    | "date"
    | "datetime-local"
    | "month"
    | "password"
    | "week";
  required?: boolean;
  label?: string;
  defaultValue?: string;
  maxLength?: number;
}

const Input = <T extends FieldValues>({
  contentBefore,
  contentAfter,
  disabled,
  placeholder,
  width,
  type,
  required,
  label,
  name,
  defaultValue,
  control,
  maxLength,
  ...rest
}: IInput<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  return (
    <Field
      required={required}
      label={label}
      validationState={error ? "error" : "none"}
    >
      <FluentInput
        contentBefore={contentBefore}
        contentAfter={contentAfter}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        width={width}
        maxLength={maxLength}
        type={type}
        {...field}
        {...rest}
      />
    </Field>
  );
};

export default Input;
