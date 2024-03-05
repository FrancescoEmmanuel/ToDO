import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

function FilterModal({ openModal, setModal, handleFilter }) {
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCompleted, setFilterCompleted] = useState('All');

  function handleFilterSubmit(e) {
    e.preventDefault();
    // Call the handleFilter function with the selected filter options
    handleFilter({ date: filterDate, type: filterType, completed: filterCompleted });
    // Close the filter modal
    setModal(false);
  }

  return (
    <div>
      {openModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center items-center p-8 rounded-lg relative bg-zinc-800">
            <div
              className="absolute -translate-y-full text-[1.25rem] rounded bg-zinc-800 text-[color:var(--black-2)] flex items-center justify-center cursor-pointer transition-[0.3s] duration-[ease] ease-[all] z-[-1] p-2 right-0 -top-2.5 hover:bg-[#e32525] hover:text-white"
              onKeyDown={() => setModal(false)}
              onClick={() => setModal(false)}
              tabIndex={0}
              role="button"
            >
              <MdOutlineClose />
            </div>
            <form className="w-full" onSubmit={(e) => handleFilterSubmit(e)}>
              <h1 className="text-white text-[1.5rem] font-semibold capitalize mb-8">Filter</h1>
              <label htmlFor="filterDate" className="text-white">
                Date
                <input
                  type="date"
                  id="filterDate"
                  className="text-white bg-zinc-600 ml-2 w-21 rounded text-center"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </label>
              <label htmlFor="filterType" className="text-white ml-4">
                Type
                <select
                  id="filterType"
                  className="text-white bg-zinc-600 rounded outline-none mt-1 ml-2"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Work">Work</option>
                  <option value="School">School</option>
                  {/* Add more type options as needed */}
                </select>
              </label>
              <label htmlFor="filterCompleted" className="text-white ml-4">
                Completed
                <select
                  id="filterCompleted"
                  className="text-white bg-zinc-600 rounded outline-none mt-1 ml-2"
                  value={filterCompleted}
                  onChange={(e) => setFilterCompleted(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="true">Completed</option>
                  <option value="false">Incomplete</option>
                </select>
              </label>
              <div className="flex justify-start items-center gap-4 mt-8">
                <Button type="submit">Apply Filters</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterModal;
