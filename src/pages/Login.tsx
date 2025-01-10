/* eslint-disable @typescript-eslint/no-explicit-any */
// import Spline from '@splinetool/react-spline';
import { Button, Modal, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useForgotPasswordMutation, useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UniForm from "../components/form/UniForm";
import FormInput from "../components/form/FormInput";
import logo from "../assets/logo.png"
import { useState } from "react";
import { TResponse } from "../types";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (data: any) => {
    const toastId = toast.loading("Sending request ...");

    try {
      const res = (await forgotPassword(data)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Please check your mail", { id: toastId });
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

  const defaultValues = {
    userId: "2024010003",
    password: "12345",
  };

  const [login] = useLoginMutation();
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const loginToastId = toast.loading("Logging In");
    const userInfo = {
      id: data.userId,
      password: data.password,
    };

    try {
      const res = await login(userInfo).unwrap(); //here .unwrap() Unwraps a mutation call and provide the raw response.
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("logged In", { id: loginToastId, duration: 2000 });

      if (res?.data?.needsPasswordChange) navigate(`/change-password`);
      else navigate(`/${user.role}/dashboard`);
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong", { id: loginToastId, duration: 2000 });
    }
  };
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://img.freepik.com/premium-vector/back-school-seamless-pattern-doodle-style-background-education-hand-drawn-objects-symbols_43029-2255.jpg?w=1380')",
        }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative flex justify-center items-center h-full">
        <Row className="flex flex-col items-center" justify="center" align="middle" style={{ height: "100vh" }}>
          <UniForm className="bg-white px-16 md py-8 rounded-lg shadow-2xl" onSubmit={onSubmit} defaultValues={defaultValues}>
            <img className="mx-auto w-[180px] h-[120px] object-cover" src={logo} alt="" />
            <FormInput type="text" name="userId" label="Id" />
            <FormInput type="password" name="password" label="Password" />
            <p onClick={showModal} className="flex justify-end -mt-5 mb-5 text-xs cursor-pointer text-blue-500 hover:underline">Forgot password?</p>
            <Modal
              title={`Change Password`}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <UniForm onSubmit={handleSubmit}>
                <FormInput type="text" name="id" label="Your University Id" />
                <Button htmlType="submit">Submit</Button>
              </UniForm>
            </Modal>
            <Button htmlType="submit">Login</Button>
          </UniForm>
        </Row>
      </div>
    </div>

  );
};

export default Login;
