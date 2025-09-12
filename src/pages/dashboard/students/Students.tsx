import { Button, Input } from "antd"
import { CustomTable, PageCaption } from "../../../components"
import type { StudentsType } from "../../../@types/StudentsType"
import { useEffect, useState } from "react"
import { instance } from "../../../hooks"
import { useNavigate } from "react-router-dom"
import { MoreOutlined } from "@ant-design/icons"

const Students = () => {
  const navigate = useNavigate()
  const [_loading, setLoading] = useState<boolean>(false)
    
  const column = [
    {title:"ID", dataIndex:"key"},
    {title:"Ism", dataIndex:"name"},
    {title:"Familiya", dataIndex:"surname"},
    {title:"Yo'nalish", dataIndex:"stackName"},
    {title:"Status", dataIndex:"statusName"},
    {title:"Batafsil", dataIndex:"action"},
  ]
  
  const [students, setStudents] = useState<StudentsType[]>([])
  useEffect(() => {
    instance().get("/students").then(res => {
      
      setStudents(res.data.data.map((item: StudentsType, index: number) => {
        item.key = index + 1
        item.stackName = item.group.name 
        item.statusName = item.status ? "O'qimoqda" : ""
        item.action = <Button onClick={() => navigate(`/students/${item.id}`)} size="middle" icon={<MoreOutlined className="!text-[18px] translate-y-[2px]" />} type="primary" className="!bg-[#bc8e5b] !p-0"></Button>
        return item
      }));
    }).finally(() => {
      setLoading(false)
    })
  }, [])


  return (
    <div className="p-5">
    <PageCaption  title="O'quvchilar" count={students.length}/>
    <div className="mt-5 flex items-center gap-5">
      <Input className="!w-[350px] " placeholder="Qidirish" size="large" allowClear/>
    </div>
    <div className="mt-5">
      <CustomTable columns={column} data={students}/>
    </div>

  </div>
  )
}

export default Students