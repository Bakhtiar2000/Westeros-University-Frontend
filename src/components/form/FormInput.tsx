import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const FormInput = ({ type, name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label && <label htmlFor={name}>{label}: </label>}
      <Controller
        name={name} // registered the field here
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default FormInput;
