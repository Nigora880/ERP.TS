import { Route, Routes } from "react-router-dom"
import {PATH} from "../components"
import { DashboardHome, Groups } from "../pages"
import { Header, Navbar } from "../modules"

const DashboardRoutes = () => {
  return (
    <div className="flex">
      <Navbar/>
      <div className="w-[82%]">
        <Header/>
        <Routes>
           <Route path={PATH.home} element={<DashboardHome/>}/>
           <Route path={PATH.groups} element={<Groups/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default DashboardRoutes