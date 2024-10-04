import {
  Textarea as FluentTextArea,
  TextareaProps,
  Field,
} from "@fluentui/react-components";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface ITextArea<T extends FieldValues> extends TextareaProps {
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  name: Path<T>;
  control: Control<T, unknown>;
  width?: string;
}
const Textarea = <T extends FieldValues>({
  placeholder,
  disabled,
  label,
  required,
  control,
  name,
  width,
  ...rest
}: ITextArea<T>) => {
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
      <FluentTextArea
        disabled={disabled}
        placeholder={placeholder}
        {...field}
        {...rest}
      />
    </Field>
  );
};

export default Textarea;
