"use client";
import { useEffect, useState } from "react";
import { MdDeleteOutline, MdUpdateDisabled } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function List() {
    const [list, setList] = useState([]);
    const [task, setTask] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [updateTask, setUpdateTask] = useState("");

    const handleInputChange = (event) => {
        setTask(event.target.value);
    };

    const handleUpdateInputChange = (event) => {
        setUpdateTask(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (task.trim()) {
            setList([...list, task]);
            setTask(""); // Clear the input after adding
        }
    };

    const handleDelete = (index) => {
        setList(list.filter((_, i) => i !== index));
    };

    const handleDeleteAll = () => {
        setList([]);
    };

    const openModal = (index) => {
        setCurrentTask(index);
        setUpdateTask(list[index]);
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        const updatedList = list.map((item, index) => index === currentTask ? updateTask : item);
        setList(updatedList);
        setIsModalOpen(false);
    };

    return (
        <div className='w-[70%] overflow-hidden p-10 bg-slate-200 flex justify-center items-center box-border'>
            <div className="w-[100%] h-[100%] bg-gray-500 p-5">
                <h1 className="text-center mt-6 text-4xl font-serif text-white">Todo List</h1>
                <form className="flex justify-between mt-3 w-[90%] h-[10%] m-auto" onSubmit={handleSubmit}>
                    <input
                        name="task"
                        id="task"
                        type="text"
                        value={task}
                        onChange={handleInputChange}
                        placeholder="Add Task"
                        className="w-[50%] py-2 text-lg text-gray-700 placeholder-gray-400 border-gray-300 border-opacity-0 rounded-md text-center"
                        required
                    />
                    <button type="submit" className="bg-green-600 w-[80px] h-[40px] rounded-lg">Add</button>
                </form>
                <div className="bg-pink-200 mt-6 m-auto w-[90%] h-[400px] p-4 rounded-md">
                    {list.length > 0 ? (
                        list.map((item, index) => (
                            <div key={index} className="bg-gray-500 w-[95%] h-[60px] rounded-lg m-auto mb-4 flex p-3">
                                <h1 className="text-xl">{index+1}. {item}</h1>
                                <input type="checkbox" className="ml-[420px] w-7 h-7 mt-1" />
                                <div
                                    className="bg-yellow-400 w-10 h-9 ml-3 flex justify-center items-center text-xl rounded-md cursor-pointer"
                                    onClick={() => openModal(index)}
                                >
                                    <FaEdit className="text-xl"/>
                                </div>
                                <div
                                    className="bg-yellow-400 w-10 h-9 ml-3 flex justify-center items-center text-xl rounded-md cursor-pointer"
                                    onClick={() => handleDelete(index)}
                                >
                                    <MdDeleteOutline className="text-xl" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-gray-500 w-[95%] h-[60px] rounded-lg m-auto mb-4 flex p-3">
                            <h1 className="text-xl">No Task</h1>
                        </div>
                    )}

                    <div className="w-[300px] overflow-hidden flex mt-5 ml-[400px] ">
                        <button type="button" className="bg-blue-700 w-[120px] h-[40px] rounded-lg mr-4">Check All</button>
                        <button type="button" className="bg-red-500 w-[130px] h-[40px] rounded-lg" onClick={handleDeleteAll}>Delete Task</button>
                    </div>
                </div>
            </div>

            {/* Modal for Updating Task */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md w-[400px]">
                        <h2 className="text-2xl mb-4">Update Task</h2>
                        <input
                            type="text"
                            value={updateTask}
                            onChange={handleUpdateInputChange}
                            className="w-full py-2 px-3 mb-4 border border-gray-300 rounded-md"
                        />
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-500 text-white py-2 px-4 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default List;
