import { Button, Card, Descriptions } from "antd";
import { useGetMeQuery } from "../../redux/features/user/user.api";

const StudentDashboard = () => {
  const { data: studentData, isLoading } = useGetMeQuery(undefined);
  console.log(studentData)

  if (isLoading) {
    return <p className="text-center text-5xl font-semibold mt-40">Loading...</p>;
  }

  if (!studentData) {
    return <p className="text-center text-5xl font-semibold mt-40">student not found</p>;
  }

  return (
    <Card style={{ margin: "0px" }}>
      <h1 className="text-4xl my-3">Welcome {studentData?.data?.fullName}</h1>
      <p className="text-xl mb-10 uppercase">{studentData?.data?.user?.role}</p>
      <div className="flex justify-between items-center">
        <img
          className="w-32 h-32 object-cover object-center rounded mb-6"
          src={studentData?.data?.profileImg ? studentData?.data?.profileImg : "https://img.freepik.com/premium-vector/3d-realistic-person-people-vector-illustration_884296-4859.jpg?w=826"}
          alt="Profile Image"
          width={100}
        />
        <Button className="bg-[#001529] text-white">Update</Button>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{studentData?.data?.id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">{studentData?.data?.fullName}</Descriptions.Item>
        <Descriptions.Item label="Gender">{studentData?.data?.gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">{new Date(studentData?.data?.dateOfBirth).toLocaleDateString()}</Descriptions.Item>
        <Descriptions.Item label="Email">{studentData?.data?.email}</Descriptions.Item>
        <Descriptions.Item label="Contact No">{studentData?.data?.contactNo}</Descriptions.Item>
        <Descriptions.Item label="Emergency Contact No">{studentData?.data?.emergencyContactNo}</Descriptions.Item>
        <Descriptions.Item label="Blood Group">{studentData?.data?.bloodGroup}</Descriptions.Item>
        <Descriptions.Item label="Present Address">{studentData?.data?.presentAddress}</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">{studentData?.data?.permanentAddress}</Descriptions.Item>
        <Descriptions.Item label="Academic Department">{studentData?.data?.academicDepartment?.name}</Descriptions.Item>
        <Descriptions.Item label="Academic Faculty">{studentData?.data?.academicFaculty?.name}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default StudentDashboard;
