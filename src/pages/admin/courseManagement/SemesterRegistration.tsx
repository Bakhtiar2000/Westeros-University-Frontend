import { FieldValues, SubmitHandler } from "react-hook-form";
import UniForm from "../../../components/form/UniForm";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TAcademicSemester } from "../../../types";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import FormDatePicker from "../../../components/form/FormDatePicker";
import FormInput from "../../../components/form/FormInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
  const [addSemester, { data, error }] = useAddRegisteredSemesterMutation();
  console.log({ data, error });
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" }, // sending params for useGetAllSemestersQuery
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item?._id,
    label: `${item?.name} ${item?.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Semester ...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    try {
      const res = (await addSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <FormSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <FormSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <FormDatePicker name="startDate" label="Start Date" />
          <FormDatePicker name="endDate" label="End Date" />
          <FormInput type="text" name="minCredit" label="Min Credit" />
          <FormInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
