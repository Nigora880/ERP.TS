import type { ReactNode } from "react";

  export interface StudentsType {
    id: string;
    name: string;
    surname: string;
    age: number;
    groupId:number;
    regionId: number;
    district: string;
    study: string; 
    phone: string;
    email: string;
    status: boolean; 
    createdAt: string;
  
    group: {
      id: number;
      name: string;
      createdAt: string;
    };
    region: {
      id: number;
      name: string;
      createdAt: string;
    };
  
    label?:string,
    value?:string,
    key?:number,
    statusName?:string,
    stackName?:string,
    action:ReactNode
  }
  