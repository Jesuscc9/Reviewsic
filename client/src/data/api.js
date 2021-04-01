import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Axios from "axios"
import Swal from "sweetalert2"

export const api = {
  endpoint: '',
  data: {},
  insert: async function(){
    const upload = await Axios.post(`${this.endpoint}/api/insert`, this.data)
  
    toast.success("🚀 Successfully Added!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  
    return upload.data
  },
  delete: async function(id, songList){

    const deleted = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })

    console.log(deleted)

    if(deleted.isConfirmed){
      console.log('se intenta')
      Axios.delete(`${this.endpoint}/api/delete/${id}/`)

      toast.success("🚀 Your review has been deleted!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      return (songList.filter((e) => {
        console.log(e.id)
        console.log(id)
        return e.id != id
      }))
    }

  },
  update: async function(id, songList){
    const update = await Axios.put(
      `${this.endpoint}/api/update/${id}`,
      this.data
    )

    for (let i = 0; i < songList.length; i++) {
      if (songList[i].id == id) {
        update.data.author = songList[i].author
        songList[i] = update.data
        break
      }
    }

    toast.success("🚀 Your review has been updated!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    return songList

  }
}