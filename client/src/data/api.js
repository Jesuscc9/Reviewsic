import { toast } from "react-toastify";
import Axios from "axios";
import Swal from "sweetalert2";

export const api = {
  endpoint: "",
  data: {},
  get: async function () {
    return (await Axios.get(`${this.endpoint}/api/get`)).data;
  },
  insert: async function () {
    this.data.date = Date.now();
    const upload = await Axios.post(`${this.endpoint}/api/insert`, this.data);

    toast.success("🚀 Successfully Added!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return upload.data;
  },
  update: async function (id, songList) {
    const update = await Axios.put(
      `${this.endpoint}/api/update/${id}`,
      this.data
    );

    for (let i = 0; i < songList.length; i++) {
      if (songList[i].id == id) {
        update.data.author = songList[i].author;
        songList[i] = update.data;
        break;
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
    });

    return songList;
  },
  delete: async function (id, songList) {
    const deleted = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (deleted.isConfirmed) {
      Axios.delete(`${this.endpoint}/api/delete/${id}/`);

      toast.success("🚀 Your review has been deleted!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return songList.filter((e) => {
        return e.id != id;
      });
    } else {
      return songList;
    }
  },
  setLikes: async function (id, songList, likes) {
    this.data.likes = likes;

    if (likes < -1) likes = 0;

    await Axios.put(`${this.endpoint}/api/update/setLikes/${id}`, this.data);

    for (let i = 0; i < songList.length; i++) {
      if (songList[i].id == id) {
        songList[i] = this.data;
        break;
      }
    }

    return songList;
  },
};
