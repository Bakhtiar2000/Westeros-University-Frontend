/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import FormSelect from "../../components/form/FormSelect";
import UniForm from "../../components/form/UniForm";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourseManagement.api";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormSelectWithWatch from "../../components/form/FormSelectWithWatch";
import { useState } from "react";

const MyCourses = () => {
  const [semesterId, setSemesterId] = useState("");
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();

  // Setting unique values as options
  const semesterOptions: any = Array.from(
    new Map(
      facultyCoursesData?.data?.map((item: any) => [
        item?.semesterRegistration?._id,
        {
          label: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`,
          value: item?.semesterRegistration?._id,
        },
      ])
    ).values()
  );

  // Extracting courseOPtions fom selected semester
  const courseOptions = facultyCoursesData?.data
    ?.filter((item: any) => item?.semesterRegistration?._id === semesterId)
    .map((item: any) => ({
      label: item?.course?.title,
      value: item?.course?._id,
    }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data?.semesterRegistration}/${data?.course}`);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <FormSelectWithWatch
            onValueChange={setSemesterId}
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <FormSelect
            disabled={!semesterId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
