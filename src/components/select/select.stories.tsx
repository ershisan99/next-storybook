import { Select } from "./";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SelectControlled } from "../../components-controlled/select-controlled";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};

type Story = StoryObj<typeof Select>;
const options = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Cat", value: "CAT" },
];
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("light");
    console.log(value);
    return (
      <div className={"w-full h-64 grid place-items-center bg-dark-700"}>
        <Select
          options={options}
          value={value}
          onChange={setValue}
          placeholder={"Select theme"}
        />
      </div>
    );
  },
};

const formSchema = z.object({
  username: z.string().optional(),
  password: z.number(),
  email: z.string().email({}),
  gender: z.enum(["MALE", "FEMALE", "CAT"]),
});

export type FormSchema = z.infer<typeof formSchema>;

export const Form = {
  render: () => {
    const {
      control,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormSchema>({
      mode: "onChange",
      resolver: zodResolver(formSchema),
    });
    console.log(errors);
    return (
      <form
        className={"w-full h-64 grid place-items-center bg-dark-700"}
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input {...register("username")} />

        <input
          {...register("password", {
            valueAsNumber: true,
          })}
        />
        <input {...register("email")} />
        <SelectControlled options={options} control={control} name={"gender"} />

        <button
          type={"submit"}
          className={"bg-light-300 text-dark-500 p-4 rounded"}
        >
          Submit
        </button>
      </form>
    );
  },
};

export default meta;
