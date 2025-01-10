/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Pagination,
    Space,
    Table,
    TableColumnsType,
    TableProps,
} from "antd";
import { TQueryParam, TResponse, TFaculty } from "../../../types";
import { useState } from "react";
import { useChangeStatusMutation, useGetAllFacultiesQuery, useGetSingleFacultyByIdQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type TTableData = Pick<TFaculty, "fullName" | "id" | "email" | "contactNo">;

const FacultyData = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);

    const { data: facultyData, isLoading, isFetching } = useGetAllFacultiesQuery([
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params,
    ]);

    const metaData = facultyData?.meta;
    const tableData = facultyData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
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
            title: "ID",
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
                return <ActionInfo faculty={item.key} />;
            },
            width: "1%",
        },
    ];

    const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParam[] = [];
            filters.name?.forEach((item) => queryParams.push({ name: "name", value: item }));
            filters.id?.forEach((item) => queryParams.push({ name: "id", value: item }));
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
    const { data: facultyInfo } = useGetSingleFacultyByIdQuery(item);
    console.log(facultyInfo);
    const onSubmit = async (event: any) => {
        event.preventDefault();
        const toastId = toast.loading("Updating faculty status...");
        const facultyData = {
            userId: facultyInfo?.data?.user?._id,
            data: facultyInfo?.data?.user?.status === "active" ? { status: "inactive" } : { status: "active" },
        };

        console.log(facultyData);

        try {
            const res = (await changeStatus(facultyData)) as TResponse<any>;
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Faculty status updated", { id: toastId });
            }
        } catch (err) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Space>
            <Button>
                <Link to={`/admin/faculty-data/${item.faculty}`}>Details</Link>
            </Button>
            <Button>
                <Link to={`/admin/update-faculty-data/${item.faculty}`}>Update</Link>
            </Button>
            <form onSubmit={onSubmit}>
                <Button htmlType="submit">
                    {facultyInfo?.data?.user?.status === "active" ? (
                        <span className="text-red-500">Deactivate</span>
                    ) : (
                        <span>Activate</span>
                    )}
                </Button>
            </form>
        </Space>
    );
};

export default FacultyData;
