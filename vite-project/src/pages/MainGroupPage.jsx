import React from "react";
import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
const MainGroupPage = () => {
  const { id } = useParams();
  const [groupMember, setgroupMember] = useState(null);
  const [error, seterror] = useState(null);
  const [member, setmember] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
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
        <div className="bg-white p-8 m-4 sm: rounded shadow flex justify-between items-center">
          <div className="flex items-center gap-3">
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
          <div className="flex gap-2">
            <Link to={`/groups/${id}/members/add`} >
            <button className="bg-blue-500 text-white cursor-pointer px-3 py-1 rounded">
              Add Member
            </button>
            </Link>
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
            {m.id !== currentUserId && (
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
