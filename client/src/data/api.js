import { toast } from "react-toastify"
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


    if(deleted.isConfirmed){
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
        return e.id != id
      }))
    }else{
      return songList
    }


  },
  setLikes: async function(id, likes){
    console.log('se stea')
    this.data.likes = likes
    const setLikes = await Axios.put(`${this.endpoint}/api/update/setLikes/${id}`, this.data)
    console.log(setLikes.data)
    return setLikes.data  
  }
}