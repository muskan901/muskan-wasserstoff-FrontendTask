"use client";
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '/components/Note';
import classNames from 'classnames';

const statuses = ['To Do', 'In Progress', 'Done'];

const Page = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('To Do');
  const [notes, setNotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      id: `note-${notes.length + 1}`,
      title,
      description,
      status: category,
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setDescription('');
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const updatedNotes = Array.from(notes);
    const [movedNote] = updatedNotes.splice(source.index, 1);
    movedNote.status = statuses[destination.droppableId];
    updatedNotes.splice(destination.index, 0, movedNote);

    setNotes(updatedNotes);
  };

  return (
    <div className="flex">
      <div className="bg-light h-screen px-2 pt-8 pb-4 flex flex-col transition-width duration-300 w-80">
        <h1 className="text-3xl font-bold mb-7 text-center">Note Maker</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              style={{ backgroundColor: 'grey' }}
            />
          </div>
          <div>
            <label className="block text-xl mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full p-2 border border-gray-300 rounded text-black"
              style={{ backgroundColor: 'grey' }}
            ></textarea>
          </div>
          <div>
            <label className="block text-xl mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              style={{ backgroundColor: 'grey' }}
            >
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Note
          </button>
        </form>
      </div>
      <div className="flex-1 p-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex justify-center space-x-4">
            {statuses.map((status, index) => (
              <Droppable key={index} droppableId={index.toString()}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-200 p-4 rounded-lg"
                    style={{ width: '350px', minHeight: '400px' }}
                  >
                    <h2 className="text-black font-bold mb-4">{status}</h2>
                    {notes
                      .filter((note) => note.status === status)
                      .map((note, noteIndex) => (
                        <Draggable key={note.id} draggableId={note.id} index={noteIndex}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-2 mb-2 rounded-md shadow-sm text-black"
                            >
                              <Note title={note.title} description={note.description} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Page;
