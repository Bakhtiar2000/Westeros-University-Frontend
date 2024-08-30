/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourseManagement.api";
import { Button, Modal, Table, TableColumnsType } from "antd";
import { TTableData } from "../admin/academicManagement/AcademicSemester";
import { useState } from "react";
import UniForm from "../../components/form/UniForm";
import FormInput from "../../components/form/FormInput";
import { toast } from "sonner";
import { TResponse } from "../../types";

const MyStudents = () => {
  const { registeredSemesterId, courseId } = useParams();
  const { data: facultyCoursesData, isLoading: isFacultyCoursesDataLoading } =
    useGetAllFacultyCoursesQuery([
      { name: "semesterRegistration", value: registeredSemesterId },
      { name: "course", value: courseId },
    ]);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }: any) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      render: (item: any) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  if (isFacultyCoursesDataLoading)
    return (
      <p className="font-bold text-2xl text-center mt-20">Loading data...</p>
    );

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit = async (data: any) => {
    const toastId = toast.loading("Adding Marks ...");
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    try {
      const res = (await addMark(studentMark)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Marks added", { id: toastId });
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
      <Button onClick={showModal}>Add Marks</Button>
      <Modal
        title={`Add Marks for the student ${studentInfo?.name}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <UniForm onSubmit={handleSubmit}>
          <FormInput type="text" name="classTest1" label="Class Test 1" />
          <FormInput type="text" name="classTest2" label="Class Test 2" />
          <FormInput type="text" name="midTerm" label="Midterm" />
          <FormInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Modal>
    </>
  );
};

export default MyStudents;
