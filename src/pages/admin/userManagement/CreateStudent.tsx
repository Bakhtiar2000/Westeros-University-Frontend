import { FieldValues, SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import UniForm from "../../../components/form/UniForm";
import { Button, Col, Row } from "antd";

const studentDummyData = {
  password: "12345",
  student: {
    name: {
      firstName: "Mustafa",
      middleName: "",
      lastName: "Kabir",
    },
    gender: "male",
    email: "mustafa@example.com",
    dateOfBirth: "2001-05-10",
    contactNo: "+1234567892",
    emergencyContactNo: "+0987654323",
    bloodGroup: "B-",
    presentAddress: "987 Maple Street, Village, Country",
    permanentAddress: "123 Pine Street, Village, Country",
    guardian: {
      fatherName: "William Johnson",
      fatherOccupation: "Architect",
      fatherContactNumber: "+1123456791",
      motherName: "Emma Johnson",
      motherOccupation: "Professor",
      motherContactNumber: "+1987654323",
    },
    localGuardian: {
      name: "Sophia Green",
      occupation: "Pharmacist",
      contactNo: "+1234987656",
      address: "321 Local Boulevard, Village, Country",
    },
    admissionSemester: "665de33616ef1a58ead4e1f7",
    academicDepartment: "665e0623829cf291c95afdd5",
    isDeleted: false,
  },
};

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // Checking just for development phase
    console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      {/* antd col has 24 span in total. So 12 span is considered as half width */}
      <Col span={24}>
        <UniForm onSubmit={onSubmit}>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name" label="name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name" label="name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name" label="name" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
