import { FieldValues, SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import UniForm from "../../../components/form/UniForm";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <FormInput type="text" name="name" label="name" />
          <FormInput type="text" name="year" label="year" />
          <FormSelect label="name" />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
