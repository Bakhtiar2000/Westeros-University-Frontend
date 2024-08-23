import { Button, Col, Flex } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UniForm from "../../../components/form/UniForm";
import FormInput from "../../../components/form/FormInput";
import PHSelectWithWatch from "../../../components/form/FormSelectWithWatch";

const OfferCourse = () => {
  const [id, setId] = useState("");

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <FormInput disabled={!id} type="text" name="test" label="Test" />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
