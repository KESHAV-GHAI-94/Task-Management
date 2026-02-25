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
      <div className="max-w-2xl mx-auto p-2">
          <h2 className="text-2xl font-semibold mb-4">
            Create Task
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 py-4 rounded-xl shadow space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter task description"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Assign Members
              </label>
              <div className="space-y-2">
                {members.map(member => (
                  <label
                    key={member.id}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={form.assigned_to.includes(member.id)}
                      onChange={() => handleAssign(member.id)}
                    />
                    {member.name}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-taupe-700 text-white px-4 py-2 rounded hover:bg-taupe-800"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
  );
};

export default CreateTask;