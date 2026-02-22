import React,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from "axios";
import { useParams } from 'react-router-dom';
const AddMemberGroup = () => {
const {id} =useParams();
const [query,setquery]= useState("");
const [users,setUsers]= useState([]);
const [selectedUserId, setSelectedUserId] = useState(null);
const [selectedRole, setSelectedRole] = useState("Guest");
const handleSearch= async(e)=>{
    const value = e.target.value;
    setquery(value);
    if(value.trim()===""){
        setUsers([]);
        return;
    }
    try{
        const res = await axios.get(`http://localhost:4000/user/search?query=${value}&groupId=${id}`,
            {withCredentials:true}
        );
        setUsers(res.data.users);
    }
    catch(err){
        console.error(err);
    }
}
const AddMember = async (userId) => {
  try {
    const res = await axios.post(
      `http://localhost:4000/user/groups/${id}/members`,
      {
        userId: userId,
        role: selectedRole,
      },
      {
        withCredentials: true,
      }
    );
    alert(res.data.message);
    setUsers(users.filter(u => u.id !== userId));
    setSelectedUserId(null);
    setSelectedRole("Guest");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error adding member");
  }
};

  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
    <div className="hidden md:block">
      <Sidebar />
    </div>
    <div className="flex-1">
      <Navbar />
    <div className="p-2">
        <p className="lg:pb-2 lg:text-xl ">Search Member and add in you team as per the role you want</p>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search user..."
            className=" p-2 border rounded"
          />
          <div className="mt-3 p-2 rounded">
            {users.length === 0 && query !== "" && (
              <p className=" bg-taupe-200 rounded-xl p-2 text-center text-gray-500">No users found</p>
            )}
            {users.map((user) => (
  <div
    key={user.id}
    className="bg-white p-3 mb-2  rounded-xl shadow"
  >
    <div className="flex justify-between items-center">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
      <button
        onClick={() => setSelectedUserId(user.id)}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add
      </button>
    </div>
    {selectedUserId === user.id && (
      <div className="mt-2 flex items-center gap-2">
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="Guest">Guest</option>
          <option value="Maintainer">Maintainer</option>
          <option value="Developer">Developer</option>
          <option value="Tester">Tester</option>
        </select>
        <button
          onClick={() => AddMember(user.id)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Confirm
        </button>
      </div>
    )}
  </div>
))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default AddMemberGroup;