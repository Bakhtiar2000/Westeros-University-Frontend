import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TQueryParam } from "../../../types";
import { useState } from "react";

export type TTableData = Pick<
  TAcademicSemester, // Picking only name, year, startMonth, endMonth these fields from TAcademicSemester
  "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);

  // params is setting args (arguments) for the query of getAllSemesters
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery([{ name: "sort", value: "year" }, ...params]);
  const tableData = semesterData?.data?.map(
    ({ _id, name, year, endMonth, startMonth }) => ({
      key: _id,
      name,
      year,
      endMonth,
      startMonth,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",

      dataIndex: "name", // This name must match with the property name in the response data
      filters: [
        {
          text: "Spring",
          value: "Spring",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year", // This name must match with the property name in the response data
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth", // This name must match with the property name in the response data
    },
    {
      title: "End Month",
      dataIndex: "endMonth", // This name must match with the property name in the response data
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
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });

      // filter params for semester year
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });

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

export default AcademicSemester;
