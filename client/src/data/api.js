import { toast } from "react-toastify";
import Axios from "axios";
import Swal from "sweetalert2";

export const api = {
  endpoint: "",
  data: {},
  get: async function () {
    return (await Axios.get(`${this.endpoint}/api/get`)).data;
  },
  getByUser: async function (userId) {
    return (
      await Axios.get(`${this.endpoint}/api/getByUser`, {
        params: {
          userId,
        },
      })
    ).data;
  },
  insert: async function (data) {
    const date = Date.now();
    const upload = await Axios.post(`${this.endpoint}/api/insert`, {
      ...data,
      date,
    });

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
  update: async function (data, id) {
    await Axios.put(`${this.endpoint}/api/update/${id}`, data);

    toast.success("🚀 Your review has been updated!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return { data, id };
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

      return id;
    } else {
      return songList;
    }
  },
  getLikes: async function () {
    return (await Axios.get(`${this.endpoint}/api/likes/get`)).data;
  },
  setLikes: async function ({ userId, reviewId, like }) {
    await Axios.post(`${this.endpoint}/api/likes/set`, {
      userId,
      reviewId,
      like,
    });
    return this.getLikes();
  },
  getQualifications: async function () {
    return (await Axios.get(`${this.endpoint}/api/qualifications/get`)).data;
  },
  setQualifications: async function ({ userId, reviewId, qualification }) {
    await Axios.post(`${this.endpoint}/api/qualifications/set`, {
      userId,
      reviewId,
      qualification,
    });
    return this.getQualifications();
  },
  newUserConnection: async function (userData) {
    const res = await Axios.post(
      `${this.endpoint}/api/newUserConnection`,
      userData
    );

    return res;
  },
};
