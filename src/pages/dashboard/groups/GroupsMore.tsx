import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate, useParams } from "react-router-dom"

const GroupsMore = () => {
    const {id} = useParams()
    const navigate = useNavigate()
  return (
    <div className="p-5">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-[20px]">
      <button onClick={() => navigate(-1)}><ArrowLeftOutlined className="!text-[22px] cursor-pointer hover:scale-[1.2] duration-300 "/></button>
      <h2 className="font-bold text-[25px]">single groups</h2>
    </div>
    <div className="flex items-center gap-5">
      <Button onClick={() => handleDelete()} className="!bg-red-600" size="large" type="primary" icon={<DeleteFilled classID="!text-[20px]"/>}></Button>
      <Button onClick={() => navigate("update")} className="!bg-green-700" size="large" type="primary" icon={<EditFilled classID="!text-[20px]"/>}>O'zgartirish</Button>
    </div>  
  </div>
    </div>
  )
}

export default GroupsMore