import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../hooks"
import { toast } from "react-toastify"
import { ArrowLeftOutlined, DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import type { TeacherType } from "../../../@types/TeacherType"
import { CustomTable } from "../../../components"

const TeacherMore = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [teachersData, setTeachersData] = useState<TeacherType>()
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    // Delete part 
    const [deleteId, setDeleteId] = useState<string | null | undefined>(null)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    function handleDelete() {
        setDeleteModal(true)
        setDeleteId(id)
    }
    function handleDeleteStack() {
        setDeleteLoading(true)
        instance().delete(`/stacks/${deleteId}`).then(() => {
            toast.success("O'chirildi!", {
                onClose: () => {
                    setDeleteLoading(false);
                    setDeleteModal(false)
                    navigate(-1)
                },
                autoClose: 1000,
            })
        }).catch(() => {
            toast.error("Bu o'qituvchi, o'chirish sizgamas!", {
                onClose: () => {
                    setDeleteLoading(false);
                    setDeleteModal(false)
                },
                autoClose: 1500,
            })
        })
    }
    // Delete part 

    // Shu Stack Id ga teng bolgan Stackni , singleStack get all
    useEffect(() => {
        instance().get(`/teachers/${id}`).then(res => {
            setTeachersData(res.data)
        })
    }, [])
    

    // Shu Stackdagi guruxlar
    const [teachersLoading, setTeachersLoading] = useState<boolean>(true)
    const [stackGroups, setStackGroup] = useState([])
    useEffect(() => {
  if (!id) return
  instance().get(`/teachers/${id}`).then(res => {
    setTeachersData(res.data)
    setStackGroup(
      res?.data?.groups?.map((item: any, index: number) => ({
        key: index + 1,
        id: item.id,
        name: item.name,
        stackName: item.stack?.name,
        action: <Button icon={<MoreOutlined />} type="primary"></Button>
      }))
    )
    setTeachersLoading(false)
  })
}, [id])

    const column = [
       { title:"ID", dataIndex:"id"},
       { title:"Guruh nomi", dataIndex:"name"},
       { title:"Yo'nalish", dataIndex:"stackName"},
       { title:"Batafsil", dataIndex:"action"},
    ]

    useEffect(() => {
        instance().get("/teachers", {params:{stackId:id}}).then(res => {
            setStackGroup(res.data.map((item:TeacherType, index:number) => {
                item.key = index + 1
                item.stackName = item.stack.name
                item.action = <Button size="middle" icon={<MoreOutlined className="!text-[18px] translate-y-[2px]"/>} type="primary" className="!bg-[#bc8e5b] !p-0"></Button>
                return item
            }));
            setTeachersLoading(false)
        })
    },[])
    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                    <button onClick={() => navigate(-1)}> <ArrowLeftOutlined className="!text-[22px] cursor-pointer hover:scale-[1.2] duration-300" /> </button>
                    <h2 className="font-bold text-[25px]">{teachersData?.name}ning shaxsiy ma'lumotlari</h2>
                </div>
                <div className="flex items-center gap-5">
                    <Button onClick={() => handleDelete()} className="!bg-red-500" size="large" type="primary" icon={<DeleteFilled className="!text-[20px]" />}></Button>
                    <Button onClick={() => navigate("update")} className="!bg-green-600" size="large" type="primary" icon={<EditFilled className="!text-[20px]" />}>O'zgartirish</Button>
                </div>
            </div>
            <div className="mt-[40px] flex justify-around ">
                <div className="p-3 rounded-md  text-center border-[2px] space-y-5 border-slate-400 w-[40%]">
                    <p className="text-[20px]"><span className="!text-[18px]">FI:</span> {teachersData?.surname} - {teachersData?.name} </p>
                    <p className="text-[20px]"><span className="!text-[18px]">Yosh:</span> {teachersData?.age}yosh</p>
                    <p className="text-[20px]"><span className="!text-[18px]">Tuman:</span> {teachersData?.district}</p>
                    <p className="text-[20px]"><span className="!text-[18px]">Tajriba:</span> {teachersData?.experience}</p>
                    <p className="text-[20px]"><span className="!text-[18px]">Pochta:</span> {teachersData?.email}</p>
                </div>

                <div className="p-3 rounded-md text-center  border-[2px] space-y-5 border-slate-400 w-[40%]">
                    <p className="text-[20px]"><span className="!text-[18px]">Jinsi:</span> {teachersData?.gender}</p>
                    <p className="text-[20px]"><span className="!text-[18px]">Oilaviy holat to'liqligi:</span> {teachersData?.isMerried}</p>
                    <p className="text-[20px]"><span className="!text-[18px]">Telefon raqam:</span> {teachersData?.phone}</p>
                    <p className="text-[20px]"><span className="!text-[18px]">Viloyat:</span> {teachersData?.region.name}</p>
                    <p className="text-[20px]"><span className="!text-[18px]">O'qish joyi:</span> {teachersData?.study}</p>
                </div>
            </div>
            <div className="mt-[40px]">
                <CustomTable columns={column} data={stackGroups}/>
            </div>
            <Modal confirmLoading={deleteLoading} okText="O'chirish" cancelText="Bekor qilish" okButtonProps={{ type: "primary", className: "!bg-[#bc8e5b]" }} open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={handleDeleteStack} title={"O'ylab ko'r! 🤨"}></Modal>
        </div>
    )
}

export default TeacherMore