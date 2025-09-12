import { Button, Input } from "antd"
import { CustomTable, PageCaption } from "../../../components"
import { useEffect, useState } from "react"
import { instance } from "../../../hooks"
  import type { TeacherType } from "../../../@types/TeacherType"
import { MoreOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const Teachers = () => {
  const navigate = useNavigate()
  const [_loading, setLoading] = useState<boolean>(false)
  const column = [
    {title:"ID", dataIndex:"key"},
    {title:"Ism", dataIndex:"name"},
    {title:"Familiya", dataIndex:"surname"},
    {title:"Yo'nalish", dataIndex:"stackName"},
    {title:"Lavozim", dataIndex:"statusName"},
    {title:"Batafsil", dataIndex:"action"},
  ]

   // Teachers get all
   const [teachers, setTeachers] = useState<TeacherType[]>([])
  useEffect(() => {
    instance().get("/teachers").then(res => {
      setTeachers(res.data.data.map((item: TeacherType, index: number) => {
        item.key = index + 1
        item.stackName = item.stack.name
        item.statusName = item.status.name
        item.action = <Button onClick={() => navigate(`/teachers/${item.id}`)} size="middle" icon={<MoreOutlined className="!text-[18px] translate-y-[2px]" />} type="primary" className="!bg-[#bc8e5b] !p-0"></Button>
        return item
      }));
    }).finally(() => {
      setLoading(false)
    })
  }, [])



  return (
    <div className="p-5">
      <PageCaption  title="Ustozlar" count={teachers.length}/>
      <div className="mt-5 flex items-center gap-5">
        <Input className="!w-[350px] " placeholder="Qidirish" size="large" allowClear/>
      </div>
      <div className="mt-5">
        <CustomTable columns={column} data={teachers}/>
      </div>

    </div>
  )
}

export default Teachers