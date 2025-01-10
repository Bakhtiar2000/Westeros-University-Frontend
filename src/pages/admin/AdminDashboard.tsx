import { Card, Descriptions } from "antd";
import { useGetMeQuery } from "../../redux/features/user/user.api";

const AdminDashboard = () => {
  const { data: adminData, isLoading } = useGetMeQuery(undefined);
  console.log(adminData)

  if (isLoading) {
    return <p className="text-center text-5xl font-semibold mt-40">Loading...</p>;
  }

  if (!adminData) {
    return <p className="text-center text-5xl font-semibold mt-40">admin not found</p>;
  }

  return (
    <Card style={{ margin: "0px" }}>
      <h1 className="text-4xl my-3">Welcome {adminData?.data?.fullName}</h1>
      <p className="text-xl mb-10 uppercase">{adminData?.data?.user?.role}</p>
      <img
        className="w-32 h-32 object-cover object-center rounded mb-6"
        src={adminData?.data?.profileImg ? adminData?.data?.profileImg : "https://img.freepik.com/premium-vector/3d-realistic-person-people-vector-illustration_884296-4859.jpg?w=826"}
        alt="Profile Image"
        width={100}
      />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{adminData?.data?.id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">{adminData?.data?.fullName}</Descriptions.Item>
        <Descriptions.Item label="Gender">{adminData?.data?.gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">{new Date(adminData?.data?.dateOfBirth).toLocaleDateString()}</Descriptions.Item>
        <Descriptions.Item label="Email">{adminData?.data?.email}</Descriptions.Item>
        <Descriptions.Item label="Contact No">{adminData?.data?.contactNo}</Descriptions.Item>
        <Descriptions.Item label="Emergency Contact No">{adminData?.data?.emergencyContactNo}</Descriptions.Item>
        <Descriptions.Item label="Blood Group">{adminData?.data?.bloodGroup}</Descriptions.Item>
        <Descriptions.Item label="Present Address">{adminData?.data?.presentAddress}</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">{adminData?.data?.permanentAddress}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default AdminDashboard;
