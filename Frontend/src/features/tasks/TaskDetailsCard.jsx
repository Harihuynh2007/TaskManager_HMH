import React from "react";

function TaskDetailsCard({ task, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Task Title */}
        <h2 className="text-xl font-semibold mb-1">{task.title}</h2>
        <span className="inline-block text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded mb-4">
          In list: {task.list || "Today"}
        </span>

        {/* Description */}
        <div className="mb-4">
          <h3 className="font-medium text-sm mb-1 text-gray-700">Description</h3>
          <textarea
            className="w-full border border-gray-300 rounded p-2 text-sm resize-none focus:ring focus:ring-indigo-200"
            rows={4}
            defaultValue={task.description || ""}
          />
          <div className="flex justify-end mt-2 gap-2">
            <button className="text-sm text-indigo-600 hover:underline">Cancel</button>
            <button className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded hover:bg-indigo-700">
              Save
            </button>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="bg-gray-100 px-3 py-1.5 rounded text-sm">Checklist</button>
          <button className="bg-gray-100 px-3 py-1.5 rounded text-sm">Labels</button>
          <button className="bg-gray-100 px-3 py-1.5 rounded text-sm">Dates</button>
          <button className="bg-gray-100 px-3 py-1.5 rounded text-sm">Attachment</button>
        </div>

        {/* Activity */}
        <div className="mt-6">
          <h3 className="font-medium text-sm text-gray-700 mb-2">Activity</h3>
          <input
            type="text"
            placeholder="Write a comment..."
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">tanhaorn added this card to Today</p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsCard;
