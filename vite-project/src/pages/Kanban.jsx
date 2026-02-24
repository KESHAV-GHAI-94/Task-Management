import React from 'react';
import axios from "axios";
import {useState,useEffect} from "react";
import KanbanColumn from '../components/KanbanColumn';
import {useParams} from "react-router-dom";
const Kanban = () => {
  const {id} = useParams();
  const [tasks,setTasks]=useState({
    TODO: [],
    IN_PROGRESS: [],
    COMPLETED: [],
  })
  const fetchKanbanTasks = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/user/groups/${id}/kanbanSection`,
        {},
        {
          withCredentials:true,
        }
      );
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchKanbanTasks();
  }, []);
  return (
    <div> 
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <KanbanColumn title="TODO" tasks={tasks.TODO} />
          <KanbanColumn title="IN_PROGRESS" tasks={tasks.IN_PROGRESS} />
          <KanbanColumn title="COMPLETED" tasks={tasks.COMPLETED} />
        </div>
        </div>
  );
};

export default Kanban;