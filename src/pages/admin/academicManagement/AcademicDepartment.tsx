import { Button, Table } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicDepartment = () => {
  const { data: academicDepartmentData, isLoading, isFetching } = useGetAcademicDepartmentsQuery(undefined);
  const tableData = academicDepartmentData?.data?.map(({ _id, name, academicFaculty }) => ({
    key: _id,
    name,
    academicFacultyName: academicFaculty?.name,
  }));

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      key: "academicFacultyName",
      dataIndex: "academicFacultyName",
    },
    {
      title: "Action",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <p className="text-center text-3xl font-semibold mt-40">Loading...</p>;
  }

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
  );
};

export default AcademicDepartment;
