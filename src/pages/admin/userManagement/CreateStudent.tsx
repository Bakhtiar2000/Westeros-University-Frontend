import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import UniForm from "../../../components/form/UniForm";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import FormDatePicker from "../../../components/form/FormDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDummyData = {
  password: "12345",
  student: {
    name: {
      firstName: "Mustafa",
      middleName: "",
      lastName: "Kabir",
    },
    gender: "male",
    bloodGroup: "B-",
    dateOfBirth: "2001-05-10",

    email: "mustafa@example.com",
    contactNo: "+1234567892",
    emergencyContactNo: "+0987654323",
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

// Only for development stage
const studentDefaultValues = {
  name: {
    firstName: "Mustafa",
    middleName: "Jahan",
    lastName: "Kabir",
  },
  gender: "male",
  bloodGroup: "B-",

  email: "testing2@example.com",
  contactNo: "+1234567892",
  emergencyContactNo: "+0987654323",
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

  // admissionSemester: "665de33616ef1a58ead4e1f7",
  academicDepartment: "665e0623829cf291c95afdd5",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();
  console.log({ data, error });
  const { data: semesterData, isLoading: semesterIsLoading } =
    useGetAllSemestersQuery(undefined);
  const { data: departmentData, isLoading: departmentIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: "12345",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);
    addStudent(formData);

    //Checking just for development phase. To console formData, we have to use Object.formEntries
    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      {/* antd col has 24 span in total. So 12 span is considered as half width */}
      <Col span={24}>
        <UniForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          {/* -----------------Personal Info--------------------- */}
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="name.middleName"
                label="Middle Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                options={genderOptions}
                name="gender"
                label="Gender"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                // field object, provided by Controller of react-hook-form, contains several properties to manage the input's state, including onChange, value, name, ref etc.
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    {/* Form.Item ensures that the input field and its associated label (Picture) are properly aligned */}
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])} //This overrides the default onChange handler to update the form's state with the selected file
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          {/* -----------------Contact Info--------------------- */}
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          {/* -----------------Guardian--------------------- */}
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.fatherContactNumber"
                label="Father Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="guardian.motherContactNumber"
                label="Mother Contact No"
              />
            </Col>
          </Row>

          {/* -----------------Local Guardian--------------------- */}
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          {/* -----------------Academic Info--------------------- */}
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                options={semesterOptions}
                disabled={semesterIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                options={departmentOptions}
                disabled={departmentIsLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
