/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "antd";
import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";
import { useState } from "react";


const MyEnrolledCourses = () => {
    const { data: enrolledCoursesData, isLoading, isFetching } = useGetMyEnrolledCoursesQuery(undefined);
    const tableData = enrolledCoursesData?.data?.map(({ _id, course, faculty, courseMarks, grade, academicSemester }) => ({
        key: _id,
        course: course.title,
        code: course.prefix + " " + course.code,
        faculty: faculty.fullName,
        semester: academicSemester.name + " " + academicSemester.year,
        courseMarks,
        grade

    }));
    const columns = [
        {
            title: "Course",
            key: "course",
            dataIndex: "course",
        },
        {
            title: "Code",
            key: "code",
            dataIndex: "code",
        },
        {
            title: "Faculty",
            key: "faculty",
            dataIndex: "faculty",
        },
        {
            title: "Semester",
            key: "semester",
            dataIndex: "semester",
        },
        {
            title: "Marks",
            render: (item: any) => {
                return <CourseMarks item={item} />
            }
        },
        {
            title: "Grade",
            key: "grade",
            dataIndex: "grade",
        },

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

const CourseMarks = (item: any) => {
    console.log(item)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>

            <Button onClick={showModal}> See Marks
            </Button>

            <Modal
                title={`Marks obtained in ${item?.item?.course} course`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <p className="border-t border-black mb-3"></p>
                <div>
                    <p>First Interim: {item?.item?.courseMarks.classTest1}</p>
                    <p>Mid Term: {item?.item?.courseMarks.midTerm}</p>
                    <p>Second Interim: {item?.item?.courseMarks.classTest2}</p>
                    <p>Final Term: {item?.item?.courseMarks.finalTerm}</p>
                </div>
            </Modal>
        </>
    );
};

export default MyEnrolledCourses;