import React from "react";
import CreateTask from "../Task/CreateTask"; 

const CreateTaskModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center  justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg mx-3 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          X
        </button>
        <div className="p-0">
          <CreateTask />
        </div>

      </div>

    </div>
  );
};

export default CreateTaskModal;