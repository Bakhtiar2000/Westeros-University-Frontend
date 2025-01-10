
import { Card, Descriptions } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleStudentByIdQuery } from "../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data: studentData, isLoading } = useGetSingleStudentByIdQuery({ student: studentId as string });

  if (isLoading) {
    return <p className="text-center text-5xl font-semibold mt-40">Loading...</p>;
  }

  if (!studentData) {
    return <p className="text-center text-5xl font-semibold mt-40">Student not found</p>;
  }

  return (
    <Card title="Student Details" style={{ margin: "20px" }}>
      <img className="w-32 h-32 object-cover object-center rounded mb-6" src={studentData?.data?.profileImg ? studentData?.data?.profileImg : "https://img.freepik.com/premium-vector/3d-realistic-person-people-vector-illustration_884296-4859.jpg?w=826"} alt="Profile Image" width={100} />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{studentData?.data?.id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">{studentData?.data?.fullName}</Descriptions.Item>
        <Descriptions.Item label="Gender">{studentData?.data?.gender}</Descriptions.Item>
        <Descriptions.Item label="Email">{studentData?.data?.email}</Descriptions.Item>
        <Descriptions.Item label="Contact No">{studentData?.data?.contactNo}</Descriptions.Item>
        <Descriptions.Item label="Emergency Contact No">{studentData?.data?.emergencyContactNo}</Descriptions.Item>
        <Descriptions.Item label="Blood Group">{studentData?.data?.bloodGroup}</Descriptions.Item>
        <Descriptions.Item label="Present Address">{studentData?.data?.presentAddress}</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">{studentData?.data?.permanentAddress}</Descriptions.Item>
        <Descriptions.Item label="Guardian">
          <Card style={{ margin: "0px" }}>
            <Descriptions column={1}>
              <Descriptions.Item label="Father Name">{studentData?.data?.guardian?.fatherName}</Descriptions.Item>
              <Descriptions.Item label="Father Contact">{studentData?.data?.guardian?.fatherContactNumber}</Descriptions.Item>
              <Descriptions.Item label="Father Occupation">{studentData?.data?.guardian?.fatherOccupation}</Descriptions.Item>
              <Descriptions.Item label="Mother Name">{studentData?.data?.guardian?.motherName}</Descriptions.Item>
              <Descriptions.Item label="Mother Contact">{studentData?.data?.guardian?.motherContactNumber}</Descriptions.Item>
              <Descriptions.Item label="Mother Occupation">{studentData?.data?.guardian?.motherOccupation}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Descriptions.Item>
        <Descriptions.Item label="Local Guardian">
          <Card style={{ margin: "0px" }}>
            <Descriptions column={1}>
              <Descriptions.Item label="Name">{studentData?.data?.localGuardian?.name}</Descriptions.Item>
              <Descriptions.Item label="Contact">{studentData?.data?.localGuardian?.contactNo}</Descriptions.Item>
              <Descriptions.Item label="Occupation">{studentData?.data?.localGuardian?.occupation}</Descriptions.Item>
              <Descriptions.Item label="Address">{studentData?.data?.localGuardian?.address}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Descriptions.Item>
        <Descriptions.Item label="Admission Semester">{studentData?.data?.admissionSemester?.name} {studentData?.data?.admissionSemester?.year}</Descriptions.Item>
        <Descriptions.Item label="Academic Department">{studentData?.data?.academicDepartment?.name}</Descriptions.Item>
        <Descriptions.Item label="Academic Faculty">{studentData?.data?.academicDepartment?.academicFaculty?.name}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default StudentDetails;
