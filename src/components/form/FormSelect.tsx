import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TFormSelectProps = {
  label: string;
  name: string;
  options:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
  disabled?: boolean;
};

const FormSelect = ({ label, name, options, disabled }: TFormSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            style={{ width: "100%" }}
            size="large"
            options={options}
            disabled={disabled}
          />
          {error && <small className="text-red-500">{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default FormSelect;
