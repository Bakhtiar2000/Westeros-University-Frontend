import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const FormInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name} // registered the field here
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              size="large"
              type={type}
              id={name}
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
