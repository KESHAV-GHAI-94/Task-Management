import useCreateTask from "../../hooks/Tasks/useCreateTask";
const CreateTask = () => {
const {
    form,
    members,
    loading,
    handleChange,
    handleAssign,
    handleSubmit
  } = useCreateTask();

  return (
      <div className="max-w-2xl mx-auto px-6 sm:px-6 py-2">
          <h2 className="text-xl sm:text-2xl font-semibold mb-1 lg:mb-4  lg:mt-4 text-center">
            Create Task
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white py-2  lg:p-6 rounded-2xl  space-y-3"
          >
            <div>
              <label className="block mb-1 text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-1.5 lg:p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-taupe-500"
                placeholder="Enter task title"
              />
            </div>
            <div className="mb-0">
              <label className="block mb-0.5 text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-1.5 lg:p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-taupe-500"
                placeholder="Enter task description"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border cursor-pointer border-gray-300 p-1.5 lg:p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-taupe-500"
          >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Assign Members
              </label>
              <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {members.map(member => (
                  <label
                    key={member.id}
                    className="flex items-center  gap-1 bg-gray-50 p-1.5 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={form.assigned_to.includes(member.id)}
                      onChange={() => handleAssign(member.id)}
                      className=" accent-taupe-600 cursor-pointer"
                    />
                    {member.name} -<div className="text-sm">{member.role}</div>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-taupe-700 cursor-pointer text-white py-2 rounded-xl font-medium hover:bg-taupe-800 transition active:scale-95"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
  );
};

export default CreateTask;