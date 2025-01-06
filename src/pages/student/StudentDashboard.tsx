import { useGetMeQuery } from "../../redux/features/user/user.api";

const StudentDashboard = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined);
  if (isLoading) {
    return <p className="text-center text-3xl font-semibold mt-40">Loading...</p>;
  }
  return (
    <div>
      <h1 className="text-center text-4xl mt-20">Welcome {user?.data?.fullName}</h1>
    </div>
  );
};

export default StudentDashboard;
