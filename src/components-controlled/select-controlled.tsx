import { Select, SelectProps } from "../components/select";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type SelectControlledProps<T extends FieldValues> = Omit<
  SelectProps,
  "onChange" | "value" | "name"
> & {
  control: Control<T>;
  name: Path<T>;
};

export const SelectControlled = <T extends FieldValues>({
  control,
  options,
  name,
}: SelectControlledProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <Select options={options} onChange={onChange} value={value} name={name} />
  );
};
