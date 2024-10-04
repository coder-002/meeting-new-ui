import {
  Field,
  SelectProps,
  Select as FluentSelect,
} from "@fluentui/react-components";
import { Control, FieldValues, useController, Path } from "react-hook-form";

interface ISelect<T extends FieldValues> extends SelectProps {
  placeholder?: string;
  label?: string;
  name: Path<T>;
  options: ISelectOption[];
  required?: boolean;
  control: Control<T, unknown>;
}
interface ISelectOption {
  label: string;
  value: string | number;
}
const Select = <T extends FieldValues>({
  placeholder,
  label,
  name,
  required,
  control,
  options,
  ...rest
}: ISelect<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });
  return (
    <Field
      required={required}
      label={label}
      validationState={error ? "error" : "none"}
    >
      <FluentSelect {...rest} {...field}>
        {placeholder && (
          <option value="" selected>
            {placeholder}
          </option>
        )}
        {options.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </FluentSelect>
    </Field>
  );
};

export default Select;
