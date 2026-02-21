import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from "axios";
import {toast} from "react-toastify";
const MainGroupPage = () => {
    const { id }= useParams();
    const [groupMember,setgroupMember]= useState([]);
    const [error,seterror] =useState(null);
    const [member,setmember]=useState([]);
    const [loading,setloading]=useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
    const fetchMember = async () =>{
        try{
            const res = await axios.get(`http://localhost:4000/user/groups/${id}/members`,{
                    withCredentials:true,
                });
                setgroupMember(res.data.group);
                setCurrentUserId(res.data.currentUserId);
                setmember(res.data.members);
                seterror(null);
        }
        catch(err){
            console.error(err);
            seterror(err.response?.data?.message);
            // seterror("Failed to load the group");
            toast.error("you must create group first !");
        }
        finally{
            setloading(false);
        }
    };
    console.log("Params:", useParams());
console.log("ID value:", id);
    useEffect(() => {

  if (!id) {
    console.log("ID not ready yet");
    return;
  }

  console.log("Fetching group:", id);

  fetchMember();

}, [id]);

    if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
    if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
    return(<>
    </>)
    }
export default MainGroupPage;