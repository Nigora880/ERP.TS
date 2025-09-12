import type { ReactNode } from "react";

export interface TeacherType {
    id: string;
    name: string;
    surname: string;
    age: number;
    stackId:number;
    regionId: number;
    district: string;
    statusId: number;
    experience: string;
    gender:string;
    email: string;
    phone: string;
    isMerried: string;
    study: string;
    createdAt: string;
    stack: {
      id: number;
      name: string;
      image: string;
      createdAt: string;
    };
    region: {
      id: number;
      name: string;
      createdAt: string;
    };
    status: {
      id: number;
      name: string;
      createdAt: string;
    };
    workCompanies: [
      {
        teacherId: string;
        workCompanyId: number;
        workCompany: {
          id: number;
          name: string;
          createdAt: string;
        };
      }
    ];
    label?:string,
    value?:string,
    stackName?:string,
    key?:number,
    statusName?:string,
    action:ReactNode
  }