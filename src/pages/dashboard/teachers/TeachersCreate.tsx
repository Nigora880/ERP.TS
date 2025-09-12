import { Input, Select } from "antd"
import { CreateCaption } from "../../../components"
import { useEffect, useState, type FormEvent } from "react"
import { instance } from "../../../hooks"
import type { StackType } from "../../../@types/StackType"
import type { RegionType } from "../../../@types/RegionType"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const TeachersCreate = () => {
const navigate = useNavigate()
const [loading, setLoading] = useState<boolean>(false)

 const [name, setName] = useState<string>("")
 const [surname, setSurname] = useState<string>("")
 const [age, setAge] = useState<string>("")
 const [stackId, setStackId] = useState<string>()
 const [regionId, setRegionId] = useState<string>()
 const [district, setDistrict] = useState<string>()
 const [statusId, setStatusId] = useState<string>()
 const [experience, setExperience] = useState<string>()
 const [gender, setGender] = useState<string>()
 const [email, setEmail] = useState<string>()
 const [phone, setPhone] = useState<string>()
 const [study, setStudy] = useState<string>()
 const [isMerried, setIsMerried] = useState<string>()
 const [workCompanyIds, setWorkCompanyIds] =  useState<string>()

// stacks
const [stacks, setStacks] = useState<{label:string, value:string}[]>([])
useEffect(() => {
    instance().get("/stacks").then(res => {
      setStacks(res.data.data.map((item: StackType) => {
        item.label = item.name
        item.value = item.id
        return item
      }));
    })
  }, [])

//   region
const [regions, setRegions] =  useState<{label:string, value:string}[]>()
  useEffect(() => {
    instance().get("/regions").then(res => {
      setRegions(res.data.data.map((item: RegionType) => {
        item.label = item.name
        item.value = item.id
        return item
      }));
    })
  }, [])

//   work list
  const [workList, setWorkList] =  useState<{label:string, value:string}[]>()
  useEffect(() => {
    instance().get("/work-lists").then(res => {
        setWorkList(res.data.data.map((item: RegionType) => {
        item.label = item.name
        item.value = item.id
        return item
      }));
    })
  }, [])

//   status
const [status, setStatus] =  useState<{label:string, value:string}[]>()
useEffect(() => {
  instance().get("/status").then(res => {
    setStatus(res.data.data.map((item: RegionType) => {
      item.label = item.name
      item.value = item.id
      return item
    }));
  })
}, [])

  function handleCreateTeacher(e:FormEvent<HTMLFormElement>){
   setLoading(true)
   e.preventDefault() 
   const data = {
        name,
        surname,
        age:Number(age),
        stackId:Number(stackId),
        regionId:Number(regionId),
        district,
        statusId:Number(statusId),
        experience,
        gender,
        email,
        phone,
        isMerried,
        study,
        workCompanyIds: [Number(workCompanyIds)]
      }
instance().post("/teachers", data).then(() => {
          toast.success("Muvaffaqiyatli qo'shildi!", {
            onClose: () => {
              navigate(-1)
            },
            autoClose: 1000,
          })
}).finally(() => {
    setLoading(false)
})
  }
  return (
    <form autoComplete="off" onSubmit={handleCreateTeacher} className="p-5">
        <CreateCaption isLoading={loading} title="Ustoz"/>
        <div className="flex mt-5 justify-between">
            <div className="w-[45%] space-y-5">
                <Input value={name} onChange={(e) => setName(e.target.value)} size="large" placeholder="Ism kiriting" allowClear />
                <Input value={surname} onChange={(e) => setSurname(e.target.value)} size="large" placeholder="Familiya kiriting" allowClear />
                <Input value={age} onChange={(e) => setAge(e.target.value)} size="large" placeholder="Yosh kiriting" allowClear />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} size="large" placeholder="email kiriting" allowClear />
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} size="large" placeholder="nomeringizni kiriting" allowClear />
                <Input value={study} onChange={(e) => setStudy(e.target.value)} size="large" placeholder="oqish joyingizni kiriting" allowClear />
            <Select
          value={statusId}
          onChange={e => setStatusId(e)}
          className="!w-full"
          size="large"
          showSearch
          placeholder="lavozim tanlang"
          optionFilterProp="label"
          allowClear
          options={status}
        />
        </div>
            <div className="w-[45%] flex flex-col gap-5">
            <Select
          value={stackId}
          onChange={e => setStackId(e)}
          className="!w-full"
          size="large"
          showSearch
          placeholder="yonalish tanlang"
          optionFilterProp="label"
          allowClear
          options={stacks}
        />
          <Select
          value={regionId}
          onChange={e => setRegionId(e)}
          className="!w-full"
          size="large"
          showSearch
          placeholder="Viloyatni tanlang"
          optionFilterProp="label"
          allowClear
          options={regions}
        />
          <Input value={district} onChange={(e) => setDistrict(e.target.value)} size="large" placeholder="Tuman kiriting" allowClear />
          
           <Input value={experience} onChange={(e) => setExperience(e.target.value)} size="large" placeholder="Tajriba kiriting" allowClear />
           <Select
          value={gender}
          onChange={e => setGender(e)}
          className="!w-full"
          size="large"
          showSearch
          placeholder="genderni tanlang"
          optionFilterProp="label"
          allowClear
          options={[
            {label:"Erkak", value:"erkak"},
            {label:"Ayol", value:"ayol"},
          ]}
        />

          <Select
          value={isMerried}
          onChange={e => setIsMerried(e)}
          className="!w-full"
          size="large"
          showSearch
          placeholder="Uylanganmisz?"
          optionFilterProp="label"
          allowClear
          options={[
            {label:"ha", value:"ha"},
            {label:"yoq", value:"yoq"},
          ]}
        />
          <Select
          value={workCompanyIds}
          onChange={e => setWorkCompanyIds(e)}
          className="!w-full"
          size="large"
          showSearch
          placeholder="ish joyini tanlang"
          optionFilterProp="label"
          allowClear
          options={workList}
        />
        </div>
        </div>
    </form>
  )
}

export default TeachersCreate