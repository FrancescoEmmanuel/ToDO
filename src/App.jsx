import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header";
import TodoModal from './components/TodoModal';
import TodoList from './components/TodoList';
import Title from './components/Title';

function App() {
  const [openModal, setModal] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [activeTab, setActiveTab] = useState('Today');
  const [newItem, setNewItem] = useState("");

  const filteredList = () => {
    switch (activeTab) {
      case 'Today':
        return toDoList.filter((todo) => isToday(new Date(todo.date)));
      case 'Tomorrow':
        return toDoList.filter((todo) => isTomorrow(new Date(todo.date)));
      case 'Upcoming':
        return toDoList.filter((todo) => isLater(new Date(todo.date)));
      case 'Past':
        return toDoList.filter((todo) => isPast(new Date(todo.date)));
      default:
        return toDoList;
    }
  };

  function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  function isTomorrow(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  }

  function isLater(date) {
    const today = new Date();
    return date > today && !isToday(date) && !isTomorrow(date);
  }

  function isPast(date) {
    const today = new Date();
    return date < today;
  }

  function handleSubmit(newItemData) {
    setToDoList((currentToDoList) => [
      ...currentToDoList,
      { id: crypto.randomUUID(), ...newItemData, completed: false },
    ]);
    setModal(false);
  }

  function toggleTodo(id, completed) {
    setToDoList((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  function deleteTodo(id) {
    setToDoList((currentToDoList) =>
      currentToDoList.filter((todo) => todo.id !== id)
    );
  }

  return (
    <div className="flex items-center justify-center min-w-screen">
      <div className="w-[40%] mx-auto my-0">
        <Title>Todo List</Title>
        <div className="max-w-[750px] w-full mx-auto my-0">
          <Header setModal={setModal} />

          {/* Tabs */}
          <div className="flex justify-center mt-2 mb-3 space-x-4 ">
            <button
              className={` h-8 focus:outline-none ${activeTab === 'Today' && ' text-blue-500 border-b-2 border-blue-500'}`}
              onClick={() => setActiveTab('Today')}
            >
              Today
            </button>
            <button
              className={` h-8 focus:outline-none ${activeTab === 'Tomorrow' && ' text-blue-500 border-b-2 border-blue-500'}`}
              onClick={() => setActiveTab('Tomorrow')}
            >
              Tomorrow
            </button>
            <button
              className={` h-8 focus:outline-none ${activeTab === 'Upcoming' && ' text-blue-500 border-b-2 border-blue-500'}`}
              onClick={() => setActiveTab('Upcoming')}
            >
              Upcoming
            </button>
            <button
             className={` h-8 focus:outline-none ${activeTab === 'Past' && ' text-blue-500 border-b-2 border-blue-500'}`}
              onClick={() => setActiveTab('Past')}
            >
              Past
            </button>
          </div>


          {/* Display filtered list based on the active tab */}
          <TodoList
            todos={filteredList()}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            title={activeTab}
          />

          <TodoModal openModal={openModal} setModal={setModal} handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default App;
