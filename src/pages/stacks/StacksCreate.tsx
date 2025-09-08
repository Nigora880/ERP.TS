import { useEffect, useState, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API, instance } from "../../hooks"
import { toast } from "react-toastify"
import { CreateCaption, UploadFile } from "../../components"
import { Input } from "antd"

const StacksCreate = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [isLoading, setIsLodding] = useState<boolean>(false)

  function handleCreateStack(e : FormEvent<HTMLFormElement>){
    setIsLodding(true)
    e.preventDefault()
    const data = {image, name}
    if (id) {
      if(data.image.includes("https")) {
        data.image = data.image.split(`${API}/file`)[1]
      }
      instance().patch(`/stacks/${id}`, data).then(() => {
        toast.success("muvaffaqiyatli ozgartirildi", {
          onClose: () => {
            setIsLodding(false);
            navigate(-1)
          },
          autoClose: 1000,
        })
      })
    }
    else{
      instance().post("/stacks", data).then(() => {
        toast.success("muvaffaqiyatli ozgartirildi", {
          onClose: () => {
            setIsLodding(false);
            navigate(-1)
          },
          autoClose: 1000,
        })
      })
    }
  }

useEffect(() => {
 if (id) {
  instance().get(`/stacks/${id}`).then(res => {
    setName(res.data.name)
    setImage(`${API}/file/${res.data.image}`)
  })
 }
},[])

  return (
    <form onSubmit={handleCreateStack} className="p-5">
      <CreateCaption isLoading={isLoading} title="Yo'nalish"/>
      <div className="mt-[50px]">
        <UploadFile image={image} setImage={setImage}/>
        <Input value={name} onChange={(e) => setName(e.target.value)} className="!mt-[50px] !w-[400px] " size="large" placeholder="Yo'nalish nomini kiriting"/>
      </div>
    </form>
  )
}

export default StacksCreate