/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    // This is set default just to reduce the pain of writing data all the time while testing. This should be removed before production
    defaultValues: {
      userId: "A-0001",
      password: "12345",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const loginToastId = toast.loading("Logging In");
    const userInfo = {
      id: data.userId,
      password: data.password,
    };

    try {
      const res = await login(userInfo).unwrap(); //here .unwrap() Unwraps a mutation call and provide the raw response.
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("logged In", { id: loginToastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: loginToastId, duration: 2000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register("userId")} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
      {/*  // In ant design, type keyword is over-written as htmlType */}
    </form>
  );
};

export default Login;
