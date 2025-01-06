/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import { useGetAllOfferedCoursesQuery, useGetSingleCourseByIdQuery, useGetSingleFacultyByIdQuery, useGetSingleSemesterByIdQuery } from "../../../redux/features/admin/courseManagement.api";

const OfferedCourses = () => {
  const { data: offeredCourses, isFetching } = useGetAllOfferedCoursesQuery(undefined);

  const tableData = offeredCourses?.data?.map(({ _id, course, academicSemester, faculty, section, days, startTime, endTime }) => ({
    key: _id,
    course,
    academicSemester,
    faculty,
    section,
    days,
    startTime,
    endTime
  }));

  const columns = [
    {
      title: "Course",
      key: "course",
      render: (item: any) => {
        return <CourseInfo course={item.course} />;
      },
    },
    {
      title: "Semester",
      key: "academicSemester",
      render: (item: any) => {
        return <SemesterInfo semester={item.academicSemester} />;
      },
    },
    {
      title: "Faculty",
      key: "faculty",
      render: (item: any) => {
        return <FacultyInfo faculty={item.faculty} />;
      },
    },
    {
      title: "Section",
      key: "section",
      dataIndex: "section",
    },
    {
      title: "Days",
      key: "days",
      render: (item: any) => {
        return (
          <div className="flex items-center gap-1">
            {item.days.map((day: string, index: number) => (
              <p key={index}>{day},</p>
            ))}
          </div>
        );
      },
    },
    {
      title: "Start Time",
      key: "startTime",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      key: "endTime",
      dataIndex: "endTime",
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
  );
};

const CourseInfo = (courseId: any) => {
  const { data: singleCourse } = useGetSingleCourseByIdQuery(courseId);
  return singleCourse?.data?.title;
}
const SemesterInfo = (semesterId: any) => {
  const { data: singleSemester } = useGetSingleSemesterByIdQuery(semesterId);
  return singleSemester?.data?.name + " " + singleSemester?.data?.year;
}
const FacultyInfo = (facultyId: any) => {
  const { data: singleFaculty } = useGetSingleFacultyByIdQuery(facultyId);
  return singleFaculty?.data?.fullName;
}

export default OfferedCourses;
