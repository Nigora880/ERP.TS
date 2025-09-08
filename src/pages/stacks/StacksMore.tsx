import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { StackType } from "../../@types/StackType"
import { API, instance } from "../../hooks"
import { toast } from "react-toastify"
import type { GroupsType } from "../../@types/GroupsType"
import { Button, Modal } from "antd"
import { ArrowLeftOutlined, DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons"
import { CustomTable } from "../../components"

const StacksMore = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [stacksData, setStacksData] = useState<StackType>()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)


  // delete part
const [deleteId, setDeleteId] = useState<string | null | undefined>(null)
const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
function handleDelete() {
  setDeleteModal(true)
  setDeleteId(id)
}
function handleDeleteStack() {
  setDeleteLoading(true)
  instance().delete(`/stacks/${deleteId}`).then(() => {
    toast.success("O'chirildi", {
      onClose: () => {
        setDeleteLoading(false);
        setDeleteModal(false)
        navigate(-1)
      },
      autoClose: 1000,
    })
  }).catch(() => {
    toast.error("bu yonalish ichida guruh mavjud", {
      onClose: () => {
        setDeleteLoading(false);
        setDeleteModal(false)

      },
      autoClose: 1000,
    })
  })
}
// delete part

useEffect(() => {
  instance().get(`/stacks/${id}`).then(res => {
    setStacksData(res.data)
  })
}, [])

const [stackGroups, setStackGroup] = useState([])
const column = [
  {title:"ID", dataIndex:"id"},
  {title:"Guruh nomi", dataIndex:"name"},
  {title:"Xona", dataIndex:"roomName"},
  {title:"Yo'nalish", dataIndex:"StackName"},
  {title:"Batafsil", dataIndex:"action"},
]

useEffect(() => {
  instance().get("/groups", {params:{stackId:id}}).then(res => {
    setStackGroup(res.data.data.map((item:GroupsType, index:number) => {
      item.key = index + 1
      item.roomName = item.room.name
      item.stackName = item.stack.name
      item.action = <Button size="middle" icon={<MoreOutlined className="!text-[18px]"/>} type="primary" className="!bg-[#bc8e5b] !p-0"></Button>
      return item
    }));
  })
},[])
 console.log(stackGroups);
 
    return (
 <div className="p-5">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-[20px]">
      <button onClick={() => navigate(-1)}><ArrowLeftOutlined className="!text-[22px] cursor-pointer hover:scale-[1.2] duration-300 "/></button>
      <h2 className="font-bold text-[25px]">{stacksData?.name}</h2>
    </div>
    <div className="flex items-center gap-5">
      <Button onClick={() => handleDelete()} className="!bg-red-600" size="large" type="primary" icon={<DeleteFilled classID="!text-[20px]"/>}></Button>
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
        <span className="text-slate-400">Yo'nalish nomi</span>
        <p className="text-[22px]">{stacksData?.name}</p>
      </li>
      <li>
        <span className="text-slate-400">Yaratilgan vaqt</span>
        <p className="text-[22px]">{stacksData?.createdAt?.split("T")[0]} ↻ {stacksData?.createdAt?.split("T")[1].split(".")[0]}</p>
      </li>
    </ul>
    <img className="object-cover rounded-md" src={`${API}/file/${stacksData?.image}`} alt="stack img" width={400} />
  </div>
  <div className="mt-[40px]">
    <CustomTable columns={column} data={stackGroups}/>
  </div>
  <Modal confirmLoading={deleteLoading} okText="O'chirish" cancelText="bekor qilish" okButtonProps={{ type:"primary", className:"!bg-[#bc8e5b]"}} open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={handleDeleteStack} title={"O'ylab kor"}></Modal>
 </div>
  )
}

export default StacksMore