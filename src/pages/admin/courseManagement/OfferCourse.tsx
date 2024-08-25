import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import moment from "moment";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import UniForm from "../../../components/form/UniForm";
import FormSelect from "../../../components/form/FormSelect";
import FormSelectWithWatch from "../../../components/form/FormSelectWithWatch";
import FormInput from "../../../components/form/FormInput";
import { weekDaysOptions } from "../../../constants/global";
import FormTimePicker from "../../../components/form/FormTimePicker";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  //________________________________QUERIES___________________________________

  // 1. semesterRegistrationData with query
  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" }, // Only upcoming semesters are to be offered
  ]);

  // 2. academicFacultyData
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  // 3. academicDepartmentData
  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  // 4. coursesData
  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  // 5. facultiesData with skip enabled
  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId }); // As Long as the courseId is not selected, facultiesData will not be fetched

  //________________________________OPTIONS_________________________________

  // 1. semesterRegistrationOptions
  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  // 2. academicFacultyOptions
  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  // 3. academicDepartmentOptions
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  // 4. courseOptions
  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  // 5. facultiesOptions (As it was skipped initially whe query was fetched, we needed to declare its type)
  const facultiesOptions = facultiesData?.data?.faculties?.map(
    (item: { _id: string; fullName: string }) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <FormSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <FormSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <FormSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <FormSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <FormSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <FormInput type="text" name="section" label="Section" />
          <FormInput type="text" name="maxCapacity" label="Max Capacity" />
          <FormSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <FormTimePicker name="startTime" label="Start Time" />
          <FormTimePicker name="endTime" label="End Time" />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
