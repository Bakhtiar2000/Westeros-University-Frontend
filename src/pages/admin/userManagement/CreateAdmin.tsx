import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import UniForm from "../../../components/form/UniForm";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import FormSelect from "../../../components/form/FormSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import FormDatePicker from "../../../components/form/FormDatePicker";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { TAdmin, TResponse } from "../../../types";
import { toast } from "sonner";

const adminDefaultValues = {
  designation: "faculty",
  name: {
    firstName: "Khurshed",
    middleName: "Alam",
    lastName: "Chawdhury",
  },
  gender: "male",
  bloodGroup: "B+",
  email: "khurshed@gmail.com",
  contactNo: "+1234567890",
  emergencyContactNo: "+0987654321",
  presentAddress: "123 banani, Dhaka, Bangladesh",
  permanentAddress: "456 Pine Street, Nikunja, Dhaka, Bangladesh",
};

const CreateAdmin = () => {
  const [addAdmin, { data, error }] = useAddAdminMutation();
  console.log({ data, error });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Admin ...");
    const adminData = {
      password: "12345",
      admin: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.profileImg);

    try {
      const res = (await addAdmin(formData)) as TResponse<TAdmin>
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Admin Created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <UniForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
          {/* -----------------Personal Info--------------------- */}
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormSelect options={bloodGroupOptions} name="bloodGroup" label="Blood group" />
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
              <FormInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="emergencyContactNo" label="Emergency Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="presentAddress" label="Present Address" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <FormInput type="text" name="permanentAddress" label="Permanent Address" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
