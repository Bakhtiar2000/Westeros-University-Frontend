import { useFormContext } from "react-hook-form";

const FormInput = ({ type, name, label }) => {
  const { register } = useFormContext();
  return (
    <>
      {label && <label htmlFor={name}>{label}: </label>}
      <input type={type} id={name} {...register(name)} />
    </>
  );
};

export default FormInput;
