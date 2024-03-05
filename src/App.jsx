import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header";
import TodoModal from './components/TodoModal';
import TodoList from './components/TodoList';
import Title from './components/Title';
import FilterModal from './components/FilterModal';
import UserProfile from './components/UserProfile'; 

function App() {
 
  const [openModal, setModal] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [activeTab, setActiveTab] = useState('Today');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ type: '', completed: '' });
  const [selectedItem, setSelectedItem] = useState(null); // 


  const applyFilter = (filter) => {
    setFilterOptions(filter);
    setFilterModalOpen(false);
  };
  const handleUpdate = (id) => {
  const selectedItem = toDoList.find((item) => item.id === id);
    setSelectedItem(selectedItem);
    setModal(true);
  };

  const updateItem = (id, updatedData) => {
    setToDoList((currentToDoList) =>
      currentToDoList.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
    );

    setModal(false);
  };

  const filteredList = () => {
  return toDoList.filter((todo) => {
    const typeFilter =
      filterOptions.type == "All" || !filterOptions.type || todo.type.toUpperCase() === filterOptions.type.toUpperCase();

    const completedFilter =
    filterOptions.completed == "All" || filterOptions.completed === '' || todo.completed === filterOptions.completed;

    const dateFilter = () => {
      switch (activeTab) {
        case 'Today':
          return isToday(new Date(todo.date));
        case 'Tomorrow':
          return isTomorrow(new Date(todo.date));
        case 'Upcoming':
          return isLater(new Date(todo.date));
        case 'Past':
          return isPast(new Date(todo.date));
        default:
          return true;
      }
    };

    return typeFilter && completedFilter && dateFilter();
  });
};



function isToday(date) {
  const today = new Date();
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return dateWithoutTime.getTime() === todayWithoutTime.getTime() && date.getTime() >= today.getTime();
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

  const tabNames = ['Today', 'Tomorrow', 'Upcoming', 'Past'];

  const renderTabButton = (tabName) => (
    <button
      key={tabName}
      className={`font-semibold h-8 focus:outline-none relative transition-all duration-300 ${activeTab === tabName && 'text-blue-400'}`}
      onClick={() => setActiveTab(tabName)}

    >
      {tabName}
      <div
        className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 transform origin-left transition-transform duration-300 ${activeTab === tabName ? 'scale-x-100' : 'scale-x-0'}`}
      ></div>
    </button>
  );


  return (
    <div className="flex items-center justify-center min-w-screen">
      <div className="w-[40%] mx-auto my-0">
        <Title>Todo List</Title>
        <div className="max-w-[750px] w-full mx-auto my-0">
          <Header setModal={setModal}  setFilterModalOpen={setFilterModalOpen}/>

          {/* Tabs */}
          <div className="flex justify-center mt-2 mb-3 space-x-4 text-white">
            {tabNames.map(renderTabButton)}
            
          </div>


          {/* Display filtered list based on the active tab */}
        


          <TodoList
            todos={filteredList()}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            title={activeTab}
            handleUpdate={handleUpdate}
          />
          <div className='flex justify-center mt-96 items-center'>
            <UserProfile name="Francesco Emmanuel Setiawan" nim="2602209620" profileIcon="src\assets\pas photo.png" />

          </div>
          
          <TodoModal
            openModal={openModal}
            setModal={setModal}
            handleSubmit={handleSubmit}
            updateItem={updateItem}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

           
          <FilterModal
            isOpen={filterModalOpen}
            closeModal={() => setFilterModalOpen(false)}
            applyFilter={applyFilter}></FilterModal>
    
        </div>
      </div>
    </div>
  );
}

export default App;



