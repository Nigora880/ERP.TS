import { Menu } from "antd"
import { Logo } from "../assets/img"
import { OpenAIOutlined, UngroupOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons"
import { Link} from "react-router-dom"
import { PATH } from "../components"
import type { FC } from "react"

const Navbar:FC<{collapse:boolean}> = ({collapse}) => {
  const items = [
    {key:"1", icon:<UsergroupAddOutlined className="!text-[20px]" />, label:<Link className="!text-[17px]" to={PATH.stacks}>Yo'nalishlar</Link>},
    {key:"2", icon:<UngroupOutlined className="!text-[20px]"/>, label :<Link className="!text-[17px]" to={PATH.groups}>Guruhlar</Link>},
    {key:"3", icon:<UserOutlined className="!text-[20px]" />, label :<Link className="!text-[17px]" to={PATH.teachers}>Ustozlar</Link>},
    {key:"4", icon:<OpenAIOutlined className="!text-[20px]" />, label :<Link className="!text-[17px]" to={PATH.students}>O'quvchilar</Link>},

  ]
  return (
    <div className={`${collapse ? "w-[80px]" : "w-[18%]"} duration-300 h-[100vh] bg-[#001529]`}>
       <div className="p-3 border-b-[1px] mb-[10px] flex items-center text-[#bc8e5b] gap-[10px] border-white">
        <div className="!w-[70px]">
          <img src={Logo} alt="Site Logo" />
        </div>
        {collapse ? "" :  <span className="text-white text-[23px] font-medium">Teacher</span>}
        </div> 
        <Menu
        className={`${collapse ? "navbar-menu-active" : "navbar-menu"}`}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapse}
        items={items}
      />
    </div>
  )
}

export default Navbar