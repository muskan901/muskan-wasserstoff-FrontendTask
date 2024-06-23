import React from 'react';

const Note = ({ title, description }) => {
  return (
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default Note;
