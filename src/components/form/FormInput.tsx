import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const FormInput = ({ type, name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name} // registered the field here
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} size="large" type={type} id={name} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
