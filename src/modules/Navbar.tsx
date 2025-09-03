import { Menu } from "antd"
import { Logo } from "../assets/img"
import { UsergroupAddOutlined } from "@ant-design/icons"

const Navbar = () => {
  const items = [
    {key:"1", icon:<UsergroupAddOutlined />, label:"Yo'nalishlar"}
  ]
  return (
    <div className="w-[18%] h-[100vh] bg-[#001529]">
       <div className="p-2 border-b-[1px] flex items-center text-[#bc8e5b] gap-[10px] border-white">
        <div className="!w-[40px]">
          <img src={Logo} alt="Site Logo" />
        </div>
          <span className="text-white ">Teacher</span>
        </div> 
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  )
}

export default Navbar