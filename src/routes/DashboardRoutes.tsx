import { Route, Routes } from "react-router-dom"
import PATH from "../components/PATH"
import { DashboardHome, Groups } from "../pages"

const DashboardRoutes = () => {
  return (
<Routes>
  <Route path={PATH.home} element={<DashboardHome/>}/>
   <Route path={PATH.groups} element={<Groups/>}/>
</Routes>
  )
}

export default DashboardRoutes