import React from "react";
import { useParams } from "react-router-dom";
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
  useEffect(() => {
    fetchMember();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  return (
    <>
      <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Navbar />
          {groupMember && (
            <div className="bg-white mb-5 p-4 items-center flex justify-around md:rounded-xl lg:text-2xl shadow hover:shadow-md">
              {groupMember.name}
            </div>
          )}
          <div className="grid grid-cols-1 w-150  gap-3">
            {member.map((member) => (
              <>
              
                <div
                  key={member.id}
                  className="bg-white p-4 items-center flex justify-around rounded-xl shadow hover:shadow-md cursor-pointer"
                >
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-500">Role: {member.role}</p>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default MainGroupPage;
