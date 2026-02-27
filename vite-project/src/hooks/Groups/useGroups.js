import React, { useState, useEffect, useContext } from "react";
import Api from "../../Api";
import { GroupContext } from "../../Context/GroupContext";

export default function useGroups() {
  const { setSelectedGroup } = useContext(GroupContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchGroups = async () => {
    try {
      const res = await Api.get("/user/groups", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setGroups(res.data.groups.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  return {
    groups,
    loading,
    setSelectedGroup,
    refetchGroups: fetchGroups,
  };
}
