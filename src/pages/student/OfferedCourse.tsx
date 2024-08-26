import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data } = useGetAllOfferedCoursesQuery(undefined);
  console.log(data);
  return (
    <div>
      <p>offered courses</p>
    </div>
  );
};

export default OfferedCourse;
