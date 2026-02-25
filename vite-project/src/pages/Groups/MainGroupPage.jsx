import { Link } from "react-router-dom";
import { Eye, FolderKanban } from "lucide-react";
import DeleteModal from "../../components/modals/DeleteModal";
import AddMemberGroupModal from "../../components/modals/AddMemberGroupModal";
import { useMainGroup } from "../../hooks/Groups/useMainGroup";
import { useState } from "react";
import CreateTaskModal from "../../components/modals/CreateTaskModal";
const MainGroupPage = () => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const {
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
  } = useMainGroup();

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;

  return (
    <div className="max-w-5xl md:mx-auto">
      {groupMember && (
        <div className="bg-white rounded-xl shadow-sm sm:px-4 px-6 py-5  m-4 flex flex-col md:flex-row md:justify-between md:items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center rounded-full text-xl font-semibold">
              {groupMember.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {groupMember.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-500">
                  {member.length} members
                </span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  Owner
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowCreateTaskModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Create Task
            </button>
            <Link to={`/groups/${id}/tasks`}>
              <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <Eye size={16} />
                View Tasks
              </button>
            </Link>
            {isOwner && (
              <>
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Add Member
                </button>
                <AddMemberGroupModal
                  isOpen={showAddMemberModal}
                  onClose={() => setShowAddMemberModal(false)}
                  fetchMember={fetchMember}
                />
              </>
            )}
            <button
              onClick={() => navigate("/kanban", { state: { groupId: id } })}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              <FolderKanban size={16} />
              View kanban
            </button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm mx-4">
        <div className="px-6 py-3">
          <h3 className="text-sm font-semibold text-gray-600">Members</h3>
        </div>
        <div className="px-2 pb-2">
          {member.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between px-3 md:px-4 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-gray-500 text-white flex items-center justify-center rounded-full font-semibold">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {m.name}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`
                inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium
                ${
                  m.role === "Owner"
                    ? "bg-purple-100 text-purple-700"
                    : m.role === "Maintainer"
                      ? "bg-blue-100 text-blue-700"
                      : m.role === "Developer"
                        ? "bg-green-100 text-green-700"
                        : m.role === "Tester"
                          ? "bg-yellow-100 text-yellow-700"
                          : m.role === "Guest"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-gray-200 text-gray-700"
                }
              `}
                      >
                        {m.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{m.email}</p>
                </div>
              </div>
              {isOwner && m.id !== groupMember.owner_id && (
                <button
                  onClick={() => handleRemoveClick(m.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-md hover:bg-red-50 transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedMemberId(null);
          }}
          onConfirm={confirmRemoveMember}
          title="Remove Member"
          message="Are you sure you want to remove this member from the group?"
        />
      </div>
      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
      />
    </div>
  );
};
export default MainGroupPage;
