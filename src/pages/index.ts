import { lazy } from "react";
import LoginHome from "./dashboard/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";

import Teachers from "./dashboard/teachers/Teachers";
import TeachersCreate from "./dashboard/teachers/TeachersCreate";

import Students from "./dashboard/students/Students";
import StudentsCreate from "./dashboard/students/StudentsCreate";

import Groups from "./dashboard/groups/Groups";
import GroupCreate from "./dashboard/groups/GroupCreate";

import Stacks from "./stacks/Stacks";
import StacksCreate from "./stacks/StacksCreate";
import StacksMore from "./stacks/StacksMore";



const Login = lazy(() => import("./auth/Login"))

export {LoginHome, DashboardHome, Groups, Login, Stacks, Teachers, Students, StacksCreate, StacksMore, GroupCreate, TeachersCreate, StudentsCreate}