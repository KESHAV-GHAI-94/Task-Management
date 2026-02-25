import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../../Api";
import { toast } from "react-toastify";
export function useMainGroup() {
    
  const { id } = useParams();
  const [groupMember, setgroupMember] = useState(null);
  const [error, seterror] = useState(null);
  const [member, setmember] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const isOwner = groupMember?.owner_id === currentUserId;
  const navigate = useNavigate();

  const fetchMember = async () => {
    try {
      const res = await Api.get(`/user/groups/${id}/members`, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      });
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
  const removeMember = async (userId) => {
    try {
      const res = await Api.post(
        `/user/groups/${id}/members/${userId}/remove`,
        {},
        {
          withCredentials: true,
        },
      );
      toast.success(res.data.message);
      setmember((prev) => prev.filter((m) => m.id !== userId));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error removing member");
    }
  };
  const handleRemoveClick = (userId) => {
    setSelectedMemberId(userId);
    setShowDeleteModal(true);
  };
  const confirmRemoveMember = async () => {
    await removeMember(selectedMemberId);
    setShowDeleteModal(false);
    setSelectedMemberId(null);
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  return {
    id,
    navigate,
    groupMember,
    member,
    loading,
    error,
    isOwner,
    showDeleteModal,
    setShowDeleteModal,
    selectedMemberId,
    setSelectedMemberId,
    showAddMemberModal,
    setShowAddMemberModal,
    handleRemoveClick,
    confirmRemoveMember,
    fetchMember,
  };
}
