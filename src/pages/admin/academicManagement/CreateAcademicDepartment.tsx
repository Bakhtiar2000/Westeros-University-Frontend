import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicDepartmentMutation, useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment, TResponse } from "../../../types";
import { toast } from "sonner";
import { Button, Col, Flex } from "antd";
import UniForm from "../../../components/form/UniForm";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: academicFacultiesData, isLoading: academicFacultiesIsLoading } =
    useGetAcademicFacultiesQuery(undefined);
  const academicFacultiesOptions = academicFacultiesData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Department ...");
    try {
      const res = (await addAcademicDepartment(
        data
      )) as TResponse<TAcademicDepartment>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Department Created", { id: toastId });
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
          <FormInput type="text" name="name" label="Academic Department Name" />
          <FormSelect label="Academic Faculty" name="academicFaculty" options={academicFacultiesOptions} disabled={academicFacultiesIsLoading} />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
