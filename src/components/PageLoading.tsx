import { Logo } from "../assets/img"

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <img className="logo-img" src={Logo} alt="" width={100} height={100} />
    </div>
  )
}

export default PageLoading
