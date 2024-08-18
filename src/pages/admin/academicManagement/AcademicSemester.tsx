import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

// export type TTableData = Pick<
//   TAcademicSemester,
//   "name" | "year" | "startMonth" | "endMonth"
// >;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const AcademicSemester = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData } = useGetAllSemestersQuery(undefined);
  const tableData = semesterData?.data?.map(
    ({ _id, name, year, endMonth, startMonth }) => ({
      _id,
      name,
      year,
      endMonth,
      startMonth,
    })
  );
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      // key: "name",
      dataIndex: "name", // this name must match with the property name in the response data
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
      // key: "year",
      dataIndex: "year", // this name must match with the property name in the response data
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
      // key: "startMonth",
      dataIndex: "startMonth", // this name must match with the property name in the response data
    },
    {
      title: "End Month",
      // key: "endMonth",
      dataIndex: "endMonth", // this name must match with the property name in the response data
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
