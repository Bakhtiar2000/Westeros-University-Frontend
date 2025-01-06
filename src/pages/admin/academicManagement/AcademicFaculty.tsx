import { Table } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {
  const { data: academicFacultyData, isLoading, isFetching } = useGetAcademicFacultiesQuery(undefined);
  const tableData = academicFacultyData?.data?.map(({ _id, name }) => ({ key: _id, name }));
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    }
  ];
  if (isLoading) {
    <p className="text-center text-5xl font-semibold mt-40">Loading...</p>;
  }
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
  );
};

export default AcademicFaculty;
