/* eslint-disable @typescript-eslint/no-explicit-any */
// import Spline from '@splinetool/react-spline';
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UniForm from "../components/form/UniForm";
import FormInput from "../components/form/FormInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    <div className='flex justify-center items-center gap-5 w-full'>
      {/* <div className='bg-black w-[1000px] h-[800px]'>
        <Spline
          scene="https://prod.spline.design/o0yw7lgpQCLdgB1P/scene.splinecode"
        />
      </div> */}

      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <UniForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <FormInput type="text" name="userId" label="Id" />
          <FormInput type="password" name="password" label="Password" />
          <Button htmlType="submit">Login</Button>
          {/*  // In ant design, type keyword is over-written as htmlType */}
        </UniForm>
      </Row>
    </div>
  );
};

export default Login;
