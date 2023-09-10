import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import NonLayout from "../layouts/NonLayout/NonLayout";
import Exam from "../pages/Exam/Exam";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Result from "../pages/Result/Result";
import Score from "../pages/Score/Score";
import SeeResult from "../pages/SeeResult/SeeResult";

type Props = {
  children: JSX.Element;
};

interface Route {
  path: string;
  component: () => JSX.Element;
  layout: ({ children }: Props) => JSX.Element;
}

export const publicRoutes: Route[] = [
  { path: "/login", component: Login, layout: NonLayout },
  { path: "/register", component: Register, layout: NonLayout },
  { path: "/forget-password", component: ForgotPassword, layout: NonLayout },
  { path: "/change-password", component: ResetPassword, layout: NonLayout },
];

export const privateRoutes: Route[] = [
  { path: "/exam/:id", component: Exam, layout: NonLayout },
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/result", component: SeeResult, layout: DefaultLayout },
  { path: "/profile", component: Profile, layout: DefaultLayout },
  { path: "/result/:id", component: Result, layout: DefaultLayout },
  { path: "/score/:id", component: Score, layout: DefaultLayout },
];
