import { lazy } from "react";
import LoginHome from "./dashboard/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";
import Groups from "./dashboard/Groups";
import Teachers from "./dashboard/Teachers";
import Students from "./dashboard/Students";

import Stacks from "./stacks/Stacks";
import StacksCreate from "./stacks/StacksCreate";
import StacksMore from "./stacks/StacksMore";

const Login = lazy(() => import("./auth/Login"))

export {LoginHome, DashboardHome, Groups, Login, Stacks, Teachers, Students, StacksCreate, StacksMore}