/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import FormSelect from "../../components/form/FormSelect";
import UniForm from "../../components/form/UniForm";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourseManagement.api";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  console.log(facultyCoursesData);

  const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`,
    value: item?.semesterRegistration?._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: item?.course?.title,
    value: item?.course?._id,
  }));

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="ceter">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <FormSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <FormSelect options={courseOptions} name="course" label="Course" />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
