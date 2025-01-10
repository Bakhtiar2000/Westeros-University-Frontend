/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParam, TResponse, TStudent } from "../../../types";
import { useState } from "react";
import { useChangeStatusMutation, useGetAllStudentsQuery, useGetSingleStudentByIdQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNo">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: studentData, isLoading, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
    key: _id,
    fullName,
    id,
    email,
    contactNo,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Roll No",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      render: (item) => {
        return <ActionInfo student={item.key} />
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => queryParams.push({ name: "name", value: item }));
      filters.year?.forEach((item) => queryParams.push({ name: "year", value: item }));
      setParams(queryParams);
    }
  };

  if (isLoading) {
    return <p className="text-center text-5xl font-semibold mt-40">Loading...</p>;
  }

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        total={metaData?.total}
        pageSize={metaData?.limit}
      />
    </>
  );
};


const ActionInfo = (item: any) => {
  const [changeStatus] = useChangeStatusMutation();
  const { data: userInfo } = useGetSingleStudentByIdQuery(item);
  console.log(userInfo)
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const toastId = toast.loading("Updating user status...");
    const userData = {
      userId: userInfo?.data?.user?._id,
      data: userInfo?.data?.user?.status == "in-progress" ? { status: "blocked" } : { status: "in-progress" }
    };

    console.log(userData)

    try {
      const res = (await changeStatus(userData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("User status updated", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Space>
      <Button>
        <Link to={`/admin/student-data/${item.student}`}>Details</Link>
      </Button>
      <Button>
        <Link to={`/admin/update-student-data/${item.student}`}>Update</Link>
      </Button>
      <form onSubmit={onSubmit}>
        <Button htmlType="submit">
          {userInfo?.data?.user?.status == "in-progress" ?
            <span className="text-red-500">Block</span> :
            <span>Unblock</span>
          }
        </Button>
      </form>
    </Space>
  );
}

export default StudentData;
