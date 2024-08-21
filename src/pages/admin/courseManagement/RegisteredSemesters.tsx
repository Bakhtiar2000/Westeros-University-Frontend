/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { TResponse, TSemester } from "../../../types";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<TSemester, "status" | "startDate" | "endDate">;
const items = [
  { label: "Upcoming", key: "UPCOMING" },
  { label: "Ongoing", key: "ONGOING" },
  { label: "Ended", key: "ENDED" },
];
const RegisteredSemesters = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, endDate, startDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      endDate: moment(new Date(endDate)).format("MMMM"),
      startDate: moment(new Date(startDate)).format("MMMM"),
      status,
    })
  );

  const handleStatusUpdate = async (data: { key: any }) => {
    console.log(data);
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    try {
      const res = (await updateSemesterStatus(updateData)) as TResponse<{
        status: string;
      }>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Semester Status Updated");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item == "ONGOING") color = "blue";
        else if (item == "UPCOMING") color = "green";
        else if (item == "ENDED") color = "red";
        return <Tag color={color}>{item}</Tag>;
      },
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
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
            {/* As _id is set as key, we use item.key instead of item._id */}
          </Dropdown>
        );
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination, // If there is any unused args, use underscore before the variable name
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     filters.name?.forEach((item) => {
  //       queryParams.push({ name: "name", value: item });
  //     });
  //     setParams(queryParams);
  //   }
  // };

  if (isLoading) {
    <p className="text-center text-5xl font-semibold mt-40">Loading...</p>;
  }

  return (
    <Table
      loading={isFetching} // Shows loading animation from ant design
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

export default RegisteredSemesters;
