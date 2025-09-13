import type { ReactNode } from "react";
import type { TeacherType } from "./TeacherType";

export interface GroupsType {
    id:number;
    stackId:number;
    name:string;
    status:boolean;
    roomId:number;
    createdAt:string;
    stack: {
        id:number;
        name:string;
        image:string;
        createdAt:string;
    };
    room: {
        id:number;
        numberId:number;
        name:string;
        createdAt:string;
    };
    key:number;
    roomName?:string,
    stackName?:string,
    action:ReactNode
    mainTeachers?:TeacherType[],
    Students?:any,
    supportTeachers?:TeacherType[]
}