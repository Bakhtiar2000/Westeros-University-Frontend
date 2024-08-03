/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    // This is set default just to reduce the pain of writing data all the time while testing. This should be removed before production
    defaultValues: {
      userId: "A-0001",
      password: "12345",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };

    const res = await login(userInfo).unwrap(); //here .unwrap() Unwraps a mutation call and provide the raw response.
    console.log(res);
    const user = verifyToken(res.data.accessToken);
    console.log(user);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
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
