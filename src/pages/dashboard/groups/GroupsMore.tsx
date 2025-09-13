import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CustomDelete } from "../../../service/delete"
import { instance } from "../../../hooks"
import type { GroupType } from "../../../@types/Group"

const GroupsMore = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    // delete
    // const [deleteId, setDeleteId] = useState<string | null | undefined>(null)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    function handleDeleteStack() {
      CustomDelete(`/groups/${id}`,  setDeleteLoading, setDeleteModal, navigate)
    } 

// single group
const [groupData, setGroupData] = useState<GroupType>()
    useEffect(() => {
        instance().get(`/groups/${id}`).then(res => setGroupData(res.data))
      }, [])
  return (
    <div className="p-5">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-[20px]">
      <button onClick={() => navigate(-1)}><ArrowLeftOutlined className="!text-[22px] cursor-pointer hover:scale-[1.2] duration-300 "/></button>
      <h2 className="font-bold text-[25px]">{groupData?.name}</h2>
    </div>
    <div className="flex items-center gap-5">
      <Button onClick={() => setDeleteModal(true)} className="!bg-red-600" size="large" type="primary" icon={<DeleteFilled classID="!text-[20px]"/>}></Button>
      <Button onClick={() => navigate("update")} className="!bg-green-700" size="large" type="primary" icon={<EditFilled classID="!text-[20px]"/>}>O'zgartirish</Button>
    </div>  
  </div>
  <div className="mt-[40px] flex gap-10">
    <ul className="p-5 rounded-md border-[2px] space-y-5 border-slate-400 w-[40%]">
      <li>
        <span className="text-slate-400">#</span>
        <p className="text-[22px]">{id}</p>
      </li>
      <li>
        <span className="text-slate-400">Guruh nomi</span>
        <p className="text-[22px]">{groupData?.name}</p>
      </li>
      <li>
        <span className="text-slate-400">Asosiy ustoz</span>
        <p className="text-[22px]">{groupData?.mainTeachers && groupData?.mainTeachers[0].name}</p>
      </li>
      <li>
        <span className="text-slate-400">Yordamchi ustoz</span>
        <p className="text-[22px]">{groupData?.supportTeachers && groupData?.supportTeachers[0].name}</p>
      </li>
      <li>
        <span className="text-slate-400">Yo'nalish</span>
        <p className="text-[22px]">{groupData?.stack.name}</p>
      </li>
      <li>
        <span className="text-slate-400">Xona</span>
        <p className="text-[22px]">{groupData?.room.name}</p>
      </li>
      <li>
        <span className="text-slate-400">Yaratilgan sana</span>
        <p className="text-[22px]">{groupData?.createdAt?.split("T")[0]} ↻ {groupData?.createdAt?.split("T")[1].split(".")[0]}</p>
      </li> 
    </ul>

    {/* <img className="object-cover rounded-md" src={`${API}/file/${stacksData?.image}`} alt="stack img" width={400} /> */}
  </div>
  <Modal confirmLoading={deleteLoading} okText="O'chirish" cancelText="bekor qilish" okButtonProps={{ type:"primary", className:"!bg-[#bc8e5b]"}} open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={handleDeleteStack} title={"O'ylab kor"}></Modal>
    </div>
  )
}

export default GroupsMore