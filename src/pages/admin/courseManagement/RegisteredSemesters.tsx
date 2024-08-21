import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicSemester, TQueryParam } from "../../../types";
import { useState } from "react";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement.api";

export type TTableData = Pick<
  TAcademicSemester, // Picking only name, year, startMonth, endMonth these fields from TAcademicSemester
  "name" | "year" | "startMonth" | "endMonth"
>;

const RegisteredSemesters = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, endDate, startDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      endDate,
      startDate,
      status,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
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

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination, // If there is any unused args, use underscore before the variable name
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      // filter params for semester name (Spring, Fall, Summer)
      // filters.name?.forEach((item) => {
      //   queryParams.push({ name: "name", value: item });
      // });

      setParams(queryParams);
    }
  };

  if (isLoading) {
    <p className="text-center text-5xl font-semibold mt-40">Loading...</p>;
  }

  return (
    <Table
      loading={isFetching} // Shows loading animation from ant design
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default RegisteredSemesters;
