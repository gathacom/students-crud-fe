import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSwr, { useSWRConfig } from "swr";

export const StudentsList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const res = await axios.get("http://localhost:5000/students");
    return res.data;
  };
  const { data, error } = useSwr("students", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    mutate("students");
  };
  return (
    <div className="flex flex-col mt-10">
      <div className="w-full">
        <Link
          to="/add"
          className="text-white bg-sky-500 hover:bg-sky-600 hover:ring-2 hover:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add New Student
        </Link>
        <div className="relative shadow rounded-lg mt-3">
          <table className="w-full text-lg text-left text-slate-800">
            <thead className="text-md uppercase bg-slate-50">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">NIM</th>
                <th className="py-3 px-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => (
                <tr key={student.id} className="bg-white border-b">
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6">{student.name}</td>
                  <td className="py-3 px-6">{student.nim}</td>
                  <td className="py-3 px-1">
                    <Link
                      to={`/edit/${student.id}`}
                      className="text-white bg-emerald-500 hover:bg-emerald-600 hover:ring-2 hover:ring-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="text-white bg-red-500 hover:bg-red-600 hover:ring-2 hover:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
