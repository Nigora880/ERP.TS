import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const CreateCaption = ({title}:{title:string, isLoading:boolean}) => {
    const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-[20px]">
            <button onClick={() => navigate(-1)} className="text-[22px] duration-300 hover:scale-[1.2] cursor-pointer" type="button"> <ArrowLeftOutlined/> </button>
            <h2 className="font-bold text-[25px]">qo'shish</h2>
        </div>
        <Button htmlType="submit" className="!bg-[#bc8e5b]" type="primary" size="large" icon={<PlusCircleOutlined/>}>Saqlash</Button>
    </div>
  )
}

export default CreateCaption