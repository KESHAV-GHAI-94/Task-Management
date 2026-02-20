import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
const Progressbar = () => {
const [stats, setStats] = useState({});
 const fetchStats = async () => {
  const res = await axios.get("http://localhost:4000/admin/dashboard", {
    withCredentials: true,
  });
  setStats(res.data);
};
  useEffect(() => {
      fetchStats()
    }, []);
    
  return (
    <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white lg:max-h-[224px] rounded-xl shadow-sm p-5 lg:p-16">
              <h2 className="font-semibold text-lg mb-2">Productivity</h2>
              <p className="text-sm opacity-90">
                Completed {stats.completed || 0} tasks
              </p>
              <div className="mt-4">
                <div className="w-full bg-white/40 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full"
                    style={{width: `${stats.totalAssigned? (stats.completed / stats.totalAssigned) * 100: 0}%`}}
                  />
                </div>
              </div>
            </div>
  );
};

export default Progressbar;