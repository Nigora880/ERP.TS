import { useEffect, useState, type FormEvent } from "react"
import { instance } from "../../../hooks"
import type { RegionType } from "../../../@types/RegionType"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { CreateCaption } from "../../../components"
import { Input, Select } from "antd"

const StudentsCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  // form states
  const [studentId, setStudentId] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [surname, setSurname] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [region, setRegion] = useState<string>()
  const [district, setDistrict] = useState<string>()
  const [study, setStudy] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [groupId, setGroupId] = useState<string>("")

  // region options
  const [regions, setRegions] = useState<{ label: string; value: string }[]>()

  useEffect(() => {
    instance().get("/regions").then((res) => {
        setRegions(
          res.data.data.map((item: RegionType) => {
            return {
              label: item.name,
              value: item.id,
    }}))
  })
  }, [])

  function handleCreateStudent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const data = {
      studentId: Number(studentId),
      name,
      surname,
      age: Number(age),
      groupId: Number(groupId),
      regionId: Number(region),
      district,
      study,
      phone,
      email,
      status: true,
    }

    instance()
      .post("/students", data)
      .then(() => {
        toast.success("Muvaffaqiyatli qo'shildi!", {
          onClose: () => navigate(-1),
          autoClose: 1000,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form autoComplete="off" onSubmit={handleCreateStudent} className="p-5">
      <CreateCaption isLoading={loading} title="O'quvchi" />

      <div className="flex mt-5 justify-between">
        <div className="w-[45%] space-y-5">
          <Input value={studentId} onChange={(e) => setStudentId(e.target.value)} size="large" placeholder="Student ID kiriting" allowClear />
          <Input value={name} onChange={(e) => setName(e.target.value)} size="large" placeholder="Ism kiriting" allowClear />
          <Input value={surname} onChange={(e) => setSurname(e.target.value)} size="large" placeholder="Familiya kiriting" allowClear />
          <Input value={age} onChange={(e) => setAge(e.target.value)} size="large" placeholder="Yosh kiriting" allowClear />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} size="large" placeholder="Email kiriting" allowClear />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} size="large" placeholder="Telefon raqam kiriting" allowClear />
          <Input value={study} onChange={(e) => setStudy(e.target.value)} size="large" placeholder="O‘qish joyingizni kiriting" allowClear />
        </div>

        <div className="w-[45%] flex flex-col gap-5"> <Select value={region} onChange={(val) => setRegion(val)} className="!w-full" size="large" showSearch placeholder="Viloyatni tanlang" optionFilterProp="label" allowClear options={regions} />
          <Input value={district} onChange={(e) => setDistrict(e.target.value)} size="large" placeholder="Tuman kiriting" allowClear />
          <Input value={groupId} onChange={(e) => setGroupId(e.target.value)} size="large" placeholder="Guruh ID kiriting" allowClear />
        </div>
      </div>
    </form>
  )
}

export default StudentsCreate
