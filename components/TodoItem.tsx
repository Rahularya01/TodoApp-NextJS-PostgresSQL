import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

type TodoItemType = {
  id: Number;
  name: String;
  completed: Boolean;
};

const TodoItem = ({ id, name, completed }: TodoItemType) => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const completeTask = async () => {
    setUpdateLoading(true);
    if (completed) return;
    const response = await axios.put("/api/todo", {
      id: id,
      completed: true,
    });
    if (response.status === 200) {
      window.location.reload();
      setUpdateLoading(false);
    } else {
      setUpdateLoading(false);
      alert("Something Went Wrong");
    }
  };

  const deleteTask = async () => {
    setDeleteLoading(true);
    const response = await axios.delete(`/api/todo?id=${id}`);
    if (response.status === 200) {
      window.location.reload();
      setDeleteLoading(false);
    } else {
      setDeleteLoading(false);
      alert("Something Went Wrong");
    }
  };
  return (
    <div
      className={`w-full mb-2 flex items-center justify-between  gap-x-4 border px-4 py-2 rounded-lg ${
        completed
          ? "border-green-500 bg-green-100"
          : "border-red-500 bg-red-100"
      }`}
    >
      <div className="text-lg text-gray-700 font-medium">{name}</div>
      <div className="flex items-center gap-x-3">
        {!completed && (
          <>
            {updateLoading ? (
              <>
                <ClipLoader size={24} color="green" />
              </>
            ) : (
              <div
                onClick={completeTask}
                className="text-2xl text-green-700 cursor-pointer"
              >
                <i className="ri-check-line"></i>
              </div>
            )}
          </>
        )}
        {deleteLoading ? (
          <>
            <ClipLoader size={24} color="red" />
          </>
        ) : (
          <div
            onClick={deleteTask}
            className="text-2xl text-red-600 cursor-pointer"
          >
            <i className="ri-delete-bin-7-line"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
