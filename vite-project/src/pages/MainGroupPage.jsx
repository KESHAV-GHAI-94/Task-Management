import React from "react";
import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {Eye} from "lucide-react";
const MainGroupPage = () => {
  const { id } = useParams();
  const [groupMember, setgroupMember] = useState(null);
  const [error, seterror] = useState(null);
  const [member, setmember] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const isOwner = groupMember?.owner_id === currentUserId;
  const fetchMember = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/user/groups/${id}/members`,
        {
          withCredentials: true,
        },
      );
      setgroupMember(res.data.group);
      setCurrentUserId(res.data.currentUserId);
      setmember(res.data.members);
      seterror(null);
    } catch (err) {
      console.error(err);
      seterror(err.response?.data?.message);
      toast.error("you must create group first !");
    } finally {
      setloading(false);
    }
  };
  const removeMember =async (userId) =>{
    try{
      const res= await axios.post(`http://localhost:4000/user/groups/${id}/members/${userId}/remove`,
        {},
        {
          withCredentials:true,
        }
      );
      toast.success(res.data.message);
      setmember(prev=>prev.filter(m=>m.id!==userId));
    }
    catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Error removing member");
  }
  }
  useEffect(() => {
    fetchMember();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  return (
  <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
    <div className="hidden md:block">
      <Sidebar />
    </div>
    <div className="flex-1">
      <Navbar />
      {groupMember && (
        <div className="bg-white p-4 sm:p-6 m-2 sm:m-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full">
              {groupMember.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-lg">
                {groupMember.name}
              </h2>
              <p className="text-gray-500 text-sm">
                Members: {member.length}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Link to={`/groups/${id}/tasks`}>
            <button className="bg-taupe-500 flex hover:bg-taupe-600 text-white cursor-pointer px-3 py-2 rounded w-full sm:w-auto text-center">
                <Eye className="pe-1"/> View Task
            </button></Link>
            <Link to={`/groups/${id}/create-task`} >
            <button className="bg-taupe-500 hover:bg-taupe-600 text-white cursor-pointer px-3 py-2 rounded w-full sm:w-auto text-center">
              + Create Task
            </button>
            </Link>
            {isOwner && (
            <Link to={`/groups/${id}/members/add`} >
            <button className="bg-taupe-500 hover:bg-taupe-600 text-white cursor-pointer px-3 py-2 rounded w-full sm:w-auto text-center">
              Add Member
            </button>
            </Link>
            )}
          </div>
        </div>
      )}
      <div className="m-4">
        {member.map((m) => (
          <div
            key={m.id}
            className="bg-white p-3 mb-2 rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-400 text-white flex items-center justify-center rounded-full">
                {m.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-gray-500">{m.email}</p>
                <p className="text-sm text-gray-500">{m.role}</p>
              </div>
            </div>
            {isOwner && m.id !== groupMember.owner_id &&  (
              <button
  onClick={() => removeMember(m.id)}
  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
>
  Remove
</button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
};
export default MainGroupPage;
