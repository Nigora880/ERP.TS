import { toast } from "react-toastify";
import { instance } from "../hooks";
import type { Dispatch, SetStateAction } from "react";

export const CustomDelete = (api:string, setDeleteLoading:Dispatch<SetStateAction<boolean>>, setDeleteModal:Dispatch<SetStateAction<boolean>>, navigate:any) => {
    setDeleteLoading(true)
    instance().delete(`/${api}`).then(() => {
      toast.success("O'chirildi", {
        onClose: () => {
          setDeleteLoading(false);
          setDeleteModal(false)
          navigate(-1)
        },
        autoClose: 1000,
      })
    }).catch(() => {
      toast.error("Xatolik bor", {
        onClose: () => {
          setDeleteLoading(false);
          setDeleteModal(false)
        },
        autoClose: 1000,
      })
    })
    return ""
  }
