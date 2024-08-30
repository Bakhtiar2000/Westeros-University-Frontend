import { useGetAllFacultiesQuery } from "../../redux/features/admin/userManagement.api";

const MyCourses = () => {
  const { data } = useGetAllFacultiesQuery(undefined);
  console.log(data);
  return (
    <div>
      <h2> My Courses</h2>
    </div>
  );
};

export default MyCourses;
