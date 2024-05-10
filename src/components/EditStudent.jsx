import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";

export const EditStudent = () => {
    const [name, setName] = useState("");
    const [nim, setNim] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getStudentById = async () => {
            const res = await axios.get(
                `http://localhost:5000/students/${id}`
            );
            setName(res.data.name);
            setNim(res.data.nim);
        }
        getStudentById(); 
    },[id])
    const handleEditStudent = async (e)=>{
        e.preventDefault();
        await axios.patch(`http://localhost:5000/students/${id}`, {
            name: name,
            nim: parseInt(nim)
        })
        navigate("/");
    }
  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-400">
        <div>
          <h1 className="text-3xl font-bold text-slate-700">Edit Student</h1>
        </div>
      <form onSubmit={handleEditStudent} className="my-10">
        <div className="flex flex-col gap-1">
          <div className="mb-5">
            <label className="my-2 font-medium text-slate-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500 rounded"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="my-2 font-medium text-slate-700">NIM</label>
            <input
              type="text"
              className="w-full p-2  border-2 border-slate-300 focus:outline-none focus:border-sky-500 rounded"
              placeholder="NIM"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 bg-sky-500 hover:bg-sky-700 ring-2 hover:ring-sky-500 text-white rounded-lg "
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
