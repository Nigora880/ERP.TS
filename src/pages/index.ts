import { lazy } from "react";
import LoginHome from "./dashboard/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";
import Groups from "./dashboard/Groups";
import Stacks from "./dashboard/Stacks";
import Teachers from "./dashboard/Teachers";
import Students from "./dashboard/Students";

const Login = lazy(() => import("./auth/Login"))

export {LoginHome, DashboardHome, Groups, Login, Stacks, Teachers, Students}