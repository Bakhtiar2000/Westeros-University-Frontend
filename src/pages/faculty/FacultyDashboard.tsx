import { useGetMeQuery } from "../../redux/features/user/user.api";

const FacultyDashboard = () => {
  const { data: user, isLoading, isFetching } = useGetMeQuery(undefined);
  if (isLoading || isFetching) {
    return <p className="text-center text-3xl font-semibold mt-40">Loading...</p>;
  }
  return (
    <div>
      <h1 className="text-center text-4xl mt-20">Welcome {user?.data?.fullName}</h1>
    </div>
  );
};

export default FacultyDashboard;
