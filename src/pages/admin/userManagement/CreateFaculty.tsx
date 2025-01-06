import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import UniForm from "../../../components/form/UniForm";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import FormDatePicker from "../../../components/form/FormDatePicker";
import {
  useGetAcademicDepartmentsQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";

// Default values for development
const facultyDefaultValues = {
  name: {
    firstName: "Nayla",
    middleName: "Yasmin",
    lastName: "Sinthya",
  },
  gender: "female",
  bloodGroup: "A+",

  email: "nayla@gmail.com",
  contactNo: "+1234567890",
  emergencyContactNo: "+0987654321",
  presentAddress: "123 banani, Dhaka, Bangladesh",
  permanentAddress: "456 Pine Street, Nikunja, Dhaka, Bangladesh",

  academicDepartment: "665e0623829cf291c95afdd5",
};

const CreateFaculty = () => {
  const [addFaculty, { data, error }] = useAddFacultyMutation();
  console.log({ data, error });
  const { data: departmentData, isLoading: departmentIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      password: "12345",
      faculty: {
        designation: "faculty",
        ...data
      },
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.profileImg);
    addFaculty(formData);

    // For development phase, console formData using Object.fromEntries
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <UniForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
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
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          {/* -----------------Contact Info--------------------- */}
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="contactNo" label="Contact No." />
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

          {/* -----------------Academic Info--------------------- */}
          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect
                options={departmentOptions}
                disabled={departmentIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
