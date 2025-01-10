/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import UniForm from "../../../components/form/UniForm";
import FormSelect from "../../../components/form/FormSelect";
import { toast } from "sonner";
import { TResponse } from "../../../types";

// export type TTableData = Pick<TCourse, "title" | "prefix" | "code">;

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);
  console.log(courses)

  const tableData = courses?.data?.map(({ _id, title, prefix, code, preRequisiteCourses }) => ({
    key: _id,
    title,
    code: `${prefix}-${code}`,
    preRequisiteCourses
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Pre-requisites",
      render: (item: any) => {
        return <PreRequisites courses={item} />

      },
    },
    {
      title: "Faculties Assigned",
      render: (item: any) => {
        return <AssignedFaculties faculties={item} />

      },
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return (
          <>
            <AddFacultyModal facultyInfo={item} />
            <Button className="ml-2">Remove Faculty</Button>
          </>
        );
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = async (data: any) => {
    const toastId = toast.loading("Adding Faculties ...");
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    try {
      const res = (await addFaculties(facultyData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculties added", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title={`Add Faculty for the course ${facultyInfo?.code}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <UniForm onSubmit={handleSubmit}>
          <FormSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Modal>
    </>
  );
};

const PreRequisites = ({ courses }: any) => {
  console.log(courses)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {
        courses.preRequisiteCourses.length === 0 ? (
          <p>No Pre-requisites</p>
        ) : (
          <Button onClick={showModal}>
            {courses.preRequisiteCourses.length} Pre-requisites
          </Button>
        )
      }
      <Modal
        title={`Pre-requisites for the course ${courses?.title}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p className="border-t border-black mb-3"></p>
        {courses.preRequisiteCourses.map((course: any, index: number) => (
          <p className="mb-1" key={index}>{index + 1}. {course.course.title} ({course.course.prefix}-{course.course.code})</p>
        ))}
      </Modal>
    </>
  );
};

const AssignedFaculties = ({ faculties }: any) => {
  const { data: facultiesData } = useGetCourseFacultiesQuery(faculties.key);
  console.log(facultiesData)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>

      <Button onClick={showModal}>Faculties </Button>

      <Modal
        title={`Faculties assigned for ${faculties?.title} course`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p className="border-t border-black mb-3"></p>
        {(facultiesData as any)?.data?.faculties.length !== 0 && (facultiesData as any)?.data?.faculties.map((faculty: any, index: number) => (
          <p className="mb-1" key={index}>{index + 1}. {faculty.fullName}</p>
        ))}
      </Modal>
    </>
  );
};


export default Courses;
