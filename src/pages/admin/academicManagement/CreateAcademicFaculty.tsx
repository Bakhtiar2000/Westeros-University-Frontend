import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty, TResponse } from "../../../types";
import { toast } from "sonner";
import { Button, Col, Flex } from "antd";
import UniForm from "../../../components/form/UniForm";
import FormInput from "../../../components/form/FormInput";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Faculty ...");
    const academicFacultyData = {
      name: data.name,
    };
    try {
      const res = (await addAcademicFaculty(
        academicFacultyData
      )) as TResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Faculty Created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm
          onSubmit={onSubmit}
        >
          <FormInput type="text" name="name" label="Academic Faculty Name" />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
