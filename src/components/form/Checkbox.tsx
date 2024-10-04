import {
  CheckboxProps,
  Field,
  Checkbox as FluentCheckbox,
} from "@fluentui/react-components";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface ICheckbox<T extends FieldValues> extends CheckboxProps {
  name: Path<T>;
  label?: string;
  control: Control<T, unknown>;
  required?: boolean;
}
const Checkbox = <T extends FieldValues>({
  label,
  required,
  name,
  control,
  ...rest
}: ICheckbox<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  return (
    <Field required={required} validationState={error ? "error" : "none"}>
      <div>
        <FluentCheckbox {...field} {...rest} />
        {label}
      </div>
    </Field>
  );
};

export default Checkbox;
