"use client";
import { useState } from 'react';
import Sidebar from '/components/Sidebar';

const page = () => {
    const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleListType = () => {
    setIsOrdered(!isOrdered);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const editItem = (index) => {
    setIsEditing(index);
    setEditValue(items[index]);
  };

  const saveEdit = (index) => {
    const newItems = items.map((item, i) => (i === index ? editValue : item));
    setItems(newItems);
    setIsEditing(null);
    setEditValue('');
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <div className="bg-primary flex-1 flex items-center justify-center p-6 text-white">
      <div className="container h-full p-6" style={{ marginTop: '15rem', marginBottom: '10rem' }}>
      <h1 className="text-3xl font-bold mb-9 text-center">List Maker</h1>
      <div style={{ width: '350px', height: '150px', padding: '20px',border:'1px solid white', borderRadius: '8px', marginBottom:'20px', marginLeft:'400px'}}>
      <div style={{ width: '350px', height: '100px' }}>
      <label className="block text-xl mb-3">Add New Item</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new item"
        style={{backgroundColor:'grey', border: '1px solid white',  marginRight: '0.5rem' }}
      />
      <button onClick={addItem} style={{ backgroundColor: 'grey', border: '1px solid white', width:'70px' }}>Add </button>
      </div>
      <button onClick={toggleListType}>
        {isOrdered ? 'Switch to Unordered List' : 'Switch to Ordered List'}
      </button></div>

      {isOrdered ? (
  <ol style={{ listStyleType: 'numbers' }}>
    {items.map((item, index) => (
      <li key={index} style={{ marginBottom: '1rem', marginLeft:'500px' }}>
        {isEditing === index ? (
          <span>
            <input
              type="text"
              value={editValue}
              onChange={handleEditChange}
              style={{ backgroundColor: 'grey', border: '1px solid white', marginRight: '0.5rem', padding: '0.5rem' }}
            />
            <button onClick={() => saveEdit(index)} style={{ marginLeft: '40px', backgroundColor: 'blue', border: '1px solid white', borderRadius: '20px', width: '70px', padding: '0.5rem' }}>Save</button>
          </span>
        ) : (
          <span>
            {item}
              <button onClick={() => editItem(index)} style={{ backgroundColor: 'green', border: '1px solid white', borderRadius: '20px', width: '70px', padding: '0.5rem', marginLeft: '40px' }}>Edit</button>
              <button onClick={() => deleteItem(index)} style={{ marginLeft: '0.5rem', backgroundColor: 'red', border: '1px solid white', borderRadius: '20px', width: '70px', padding: '0.5rem' }}>Delete</button>
          </span>
        )}
      </li>
    ))}
  </ol>
) : (
  <ul style={{ listStyleType: 'disc' }}>
    {items.map((item, index) => (
      <li key={index} style={{ marginBottom: '1rem', marginLeft:'500px'}}>
        {isEditing === index ? (
          <span>
            <input
              type="text"
              value={editValue}
              onChange={handleEditChange}
              style={{ backgroundColor: 'grey', border: '1px solid white', marginRight: '0.5rem', padding: '0.5rem' }}
            />
            <button onClick={() => saveEdit(index)} style={{ marginLeft: '40px', backgroundColor: 'blue', border: '1px solid white', borderRadius: '20px', width: '70px', padding: '0.5rem' }}>Save</button>
          </span>
        ) : (
          <span>
            {item}
              <button onClick={() => editItem(index)} style={{ backgroundColor: 'green', border: '1px solid white', borderRadius: '20px', width: '70px', padding: '0.5rem', marginLeft: '40px' }}>Edit</button>
              <button onClick={() => deleteItem(index)} style={{ marginLeft: '0.5rem', backgroundColor: 'red', border: '1px solid white', borderRadius: '20px', width: '70px', padding: '0.5rem' }}>Delete</button>
          </span>
        )}
      </li>
    ))}
  </ul>

      )}
    </div>
      </div>
    </div>
  )
}

export default page
