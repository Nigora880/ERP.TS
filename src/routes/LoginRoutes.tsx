import { Route, Routes } from "react-router-dom"
import { Login, LoginHome } from "../pages"
import { PATH } from "../components"

const LoginRoutes = () => {
  return (
    <Routes>
        <Route path={PATH.home} element={<LoginHome/>}/>
        <Route path={PATH.login} element={<Login/>}/>
    </Routes>
  )
}

export default LoginRoutes
