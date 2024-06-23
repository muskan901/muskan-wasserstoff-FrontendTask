"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import Sidebar from '/components/Sidebar';

// Dynamically import react-quill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    ['image'],
    ['clean']                                         
  ],
};

const Editor = () => {
  const { register, handleSubmit, reset } = useForm();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    console.log(data);
    console.log(description);
    console.log(image);
    setMessage('Text Saved');
    reset(); // Reset form fields
    setDescription(''); // Reset rich text editor content
    setImage(null); // Reset image state
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className='h-screen flex flex-row justify-start'>
      <Sidebar />
      <div className='bg-primary flex-1 flex items-center justify-center p-6 text-white'>
      <div className="container h-full p-6" style={{ marginTop: '15rem', marginBottom: '10rem' }}>
          <h1 className="text-3xl font-bold mb-7 text-center">Rich Text Editor</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-xl mb-2">Title</label>
              <input
                type="text"
                {...register('title', { required: true })}
                className="bg-black w-full p-2 border border-gray-300 rounded text-white"
                style={{ height: '70px' }}
              />
            </div>
            <div>
              <label className="block text-xl mb-2 text-white">Description</label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                modules={modules}
                className="bg-black text-white"
                theme="snow"
              />
            </div>
            <div >
              <label className="block text-xl mb-2 text-white">Upload Image</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded text-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          {message && <p className="mt-4 text-green-500 text-xl">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Editor;
