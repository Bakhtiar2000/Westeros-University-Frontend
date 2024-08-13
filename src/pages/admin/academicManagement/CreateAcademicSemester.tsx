import { FieldValues, SubmitHandler } from "react-hook-form";
import UniForm from "../../../components/form/UniForm";
import { Button, Col, Flex } from "antd";
import FormSelect from "../../../components/form/FormSelect";

const CreateAcademicSemester = () => {
  const nameOptions = [
    {
      value: "01",
      label: "Autumn",
    },
    {
      value: "02",
      label: "Summer",
    },
    {
      value: "03",
      label: "Fall",
    },
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const name = nameOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <FormSelect label="Name" name="name" options={nameOptions} />
          <FormSelect label="Year" name="year" options={yearOptions} />
          <FormSelect
            label="Start Month"
            name="startMonth"
            options={nameOptions}
          />
          <FormSelect
            label="End Month"
            name="endMMonth"
            options={nameOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
