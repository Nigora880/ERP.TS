import { BellOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Badge, Button, Modal } from "antd"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import { useCookies } from "react-cookie"
import { toast } from "react-toastify"

const Header:FC<{collapse:boolean, setCollapse:Dispatch<SetStateAction<boolean>>}> = ({collapse, setCollapse}) => {
  const [,,removeCookie] = useCookies(['accessToken'])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  function handleLogOut(){
    setLoading(true)
    toast.success("Chiqib ketyabsiz!", {
      onClose: () => {
         removeCookie("accessToken")
         location.pathname = "/"
         setLoading(false)
      },
      autoClose: 1000,
    })
  }
  return (
  <div className="flex items-center p-[15px] justify-between bg-[#001529]">
    <button onClick={() => setCollapse(!collapse)} className="text-white cursor-pointer"> {collapse ? <MenuUnfoldOutlined className="!text-[25px]" /> : <MenuFoldOutlined className="!text-[25px]" />}</button>
    <div className="flex items-center gap-[20px]">
      <Badge size="default" overflowCount={10} count={11}>
        <Button size="large" icon={<BellOutlined className="!text-[22px]"/>}></Button>
      </Badge>
      <Button icon={<LogoutOutlined />} size="large" type="text" className="!text-white hover:scale-[1.1] duration-300 flex items-center gap-2"onClick={() => setShowModal(true)}>Chiqish</Button>
    </div>
    <Modal cancelText="bekor qilish" okText="chiqish" okButtonProps={{type:"primary", className:"!bg-[#bc8e5b]"}} confirmLoading={loading} open={showModal} onCancel={() => setShowModal(false)} onOk={handleLogOut} title="Tizimdan chiqish">

    </Modal>
  </div>
  )
}

export default Header