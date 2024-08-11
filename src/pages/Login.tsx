/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
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
  const { register } = useForm({
    // This is set default just to reduce the pain of writing data all the time while testing. This should be removed before production
    defaultValues: {
      userId: "A-0001",
      password: "12345",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // const loginToastId = toast.loading("Logging In");
    // const userInfo = {
    //   id: data.userId,
    //   password: data.password,
    // };

    // try {
    //   const res = await login(userInfo).unwrap(); //here .unwrap() Unwraps a mutation call and provide the raw response.
    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   dispatch(setUser({ user: user, token: res.data.accessToken }));
    //   toast.success("logged In", { id: loginToastId, duration: 2000 });
    //   navigate(`/${user.role}/dashboard`);
    // } catch (error) {
    //   toast.error("Something went wrong", { id: loginToastId, duration: 2000 });
    // }
  };

  return (
    <UniForm onSubmit={onSubmit}>
      <div>
        <FormInput type="text" name="userId" label="Id: " />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <FormInput type="password" name="password" label="Password: " />
      </div>
      <Button htmlType="submit">Login</Button>
      {/*  // In ant design, type keyword is over-written as htmlType */}
    </UniForm>
  );
};

export default Login;
