/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import {
  useEnrolCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../types";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrolCourseMutation();

  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item?.section,
      _id: item?._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });

    return acc;
  }, {});

  // Data is modified to get the courses as a group if they are the same course of different sections
  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: any) => {
    const toastId = toast.loading("Enrolling Offered Course...");
    const enrollData = {
      offeredCourse: id,
    };

    try {
      const res = (await enroll(enrollData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course Enrolled", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (!modifiedData.length) {
    return <p>No available courses</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section: any) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{" "}
                      {section.days.map((day: any) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
