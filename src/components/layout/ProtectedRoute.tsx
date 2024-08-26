import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  // const user = useAppSelector(selectCurrentUser);
  //extracting user from redux is not safe from hacking as its data is in local storage.
  // So we use jwt token verification to extract user

  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
