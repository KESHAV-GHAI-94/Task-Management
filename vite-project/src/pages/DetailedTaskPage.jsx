import Comments from "../components/Task/Comments";
import RightSideBar from "../components/Task/RightSideBar";
import DeleteModal from "../components/modals/DeleteModal";
import useTaskDetails from "../hooks/useTaskdetail"
const DetailedTaskPage = () => {
  const {
    id,
    task,
    loading,
    currentUser,
    members,
    fetchTask,
    showDeleteModal,
    setShowDeleteModal,
    confirmDeleteTask,
  } = useTaskDetails();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading task...</p>
      </div>
    );
  }
  if (!task) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">Task not found</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5 p-3 sm:p-5">
        <div className="bg-white  w-full shadow-lg rounded-xl py-4 sm:py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col text-center sm:flex-row sm:justify-between sm:items-center gap-3">
            <h1 className="text-2xl font-bold ">{task.title}</h1>
            <div className="mb-4 flex  gap-2">
              <h3 className="font-semibold text-gray-600">Priority</h3>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                {task.priority}
              </span>
            </div>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold text-gray-600">Description</h3>
            <p className="text-gray-800 mt-1">
              {task.description || "No description"}
            </p>
          </div>
          {/* comments section */}
          <Comments taskId={id} currentUser={currentUser} />
        </div>
        <RightSideBar
          task={task}
          currentUser={currentUser}
          members={members}
          fetchTask={fetchTask}
          onDeleteClick={() => setShowDeleteModal(true)}
        />
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
};

export default DetailedTaskPage;
