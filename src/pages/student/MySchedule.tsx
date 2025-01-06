/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const MySchedule = () => {
  const { data: enrolledCourses, isFetching } = useGetAllEnrolledCoursesQuery(undefined);
  console.log(enrolledCourses)

  const tableData = enrolledCourses?.data?.map(({ _id, course, faculty, offeredCourse }) => ({
    key: _id,
    courseName: course?.title,
    facultyName: faculty.fullName,
    section: offeredCourse.section,
    days: offeredCourse.days,
    startTime: offeredCourse.startTime,
    endTime: offeredCourse.endTime
  }));
  const columns = [
    {
      title: "Course",
      key: "courseName",
      dataIndex: "courseName",
    },
    {
      title: "Faculty",
      key: "facultyName",
      dataIndex: "facultyName",
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

export default MySchedule;
