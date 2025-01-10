import { Card, Descriptions } from "antd";
import { useGetMeQuery } from "../../redux/features/user/user.api";

const FacultyDashboard = () => {
  const { data: facultyData, isLoading } = useGetMeQuery(undefined);
  console.log(facultyData)

  if (isLoading) {
    return <p className="text-center text-5xl font-semibold mt-40">Loading...</p>;
  }

  if (!facultyData) {
    return <p className="text-center text-5xl font-semibold mt-40">Faculty not found</p>;
  }

  return (
    <Card style={{ margin: "0px" }}>
      <h1 className="text-4xl my-3">Welcome {facultyData?.data?.fullName}</h1>
      <p className="text-xl mb-10 uppercase">{facultyData?.data?.user?.role}</p>
      <img
        className="w-32 h-32 object-cover object-center rounded mb-6"
        src={facultyData?.data?.profileImg ? facultyData?.data?.profileImg : "https://img.freepik.com/premium-vector/3d-realistic-person-people-vector-illustration_884296-4859.jpg?w=826"}
        alt="Profile Image"
        width={100}
      />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{facultyData?.data?.id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">{facultyData?.data?.fullName}</Descriptions.Item>
        <Descriptions.Item label="Gender">{facultyData?.data?.gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">{new Date(facultyData?.data?.dateOfBirth).toLocaleDateString()}</Descriptions.Item>
        <Descriptions.Item label="Email">{facultyData?.data?.email}</Descriptions.Item>
        <Descriptions.Item label="Contact No">{facultyData?.data?.contactNo}</Descriptions.Item>
        <Descriptions.Item label="Emergency Contact No">{facultyData?.data?.emergencyContactNo}</Descriptions.Item>
        <Descriptions.Item label="Blood Group">{facultyData?.data?.bloodGroup}</Descriptions.Item>
        <Descriptions.Item label="Present Address">{facultyData?.data?.presentAddress}</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">{facultyData?.data?.permanentAddress}</Descriptions.Item>
        <Descriptions.Item label="Academic Department">{facultyData?.data?.academicDepartment?.name}</Descriptions.Item>
        <Descriptions.Item label="Academic Faculty">{facultyData?.data?.academicFaculty?.name}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default FacultyDashboard;
