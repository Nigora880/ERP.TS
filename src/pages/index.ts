import { lazy } from "react";
import LoginHome from "./dashboard/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";
import Groups from "./dashboard/Groups";

const Login = lazy(() => import("./auth/Login"))

export {LoginHome, DashboardHome, Groups, Login}