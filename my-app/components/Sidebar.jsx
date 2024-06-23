"use client";
import React, { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdFolder, MdInsertDriveFile } from 'react-icons/md';

const Sidebar = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [toggleCollapse, setToggleCollapse] = useState(false);

  const addFolder = () => {
    if (newFolderName) {
      setFolders([...folders, { name: newFolderName, files: [] }]);
      setNewFolderName("");
    }
  };

  const addFile = (folderIndex) => {
    if (newFileName) {
      const newFolders = [...folders];
      newFolders[folderIndex].files.push(newFileName);
      setFolders(newFolders);
      setNewFileName("");
    }
  };

  const toggleSidebar = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div className={classNames('bg-light h-screen px-2 pt-8 pb-4 flex flex-col transition-width duration-300', {
      'w-80': !toggleCollapse,
      'w-20': toggleCollapse,
    })}>
      {/* Logo and Collapse Button */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={30} height={30} />
          {!toggleCollapse && <span className="ml-2 text-white font-bold">Logo</span>}
        </div>
        <button
          className="cursor-pointer p-2 text-white"
          onClick={toggleSidebar}
        >
          {toggleCollapse ? (
            <FaChevronRight className="h-6 w-6" />
          ) : (
            <FaChevronLeft className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* New Folder Input */}
      {!toggleCollapse && (
        <div className="mb-4 text-white">
          <div className="flex items-center">
            <MdFolder className="mr-2" />
            <input
              type="text"
              placeholder="New Folder Name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full mb-2"
            />
          </div>
          <button onClick={addFolder} className="w-full mb-2 flex items-center justify-center">
            <MdFolder className="mr-2" />
            Add Folder
          </button>
        </div>
      )}

      {/* Folders and Files */}
      <div className="text-white w-full flex flex-col items-center">
        {folders.map((folder, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <MdFolder className="mr-2" />
              {!toggleCollapse && <span>{folder.name}</span>}
            </div>
            <div className="pl-4">
              {!toggleCollapse && (
                <>
                  <input
                    type="text"
                    placeholder="New File Name"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="w-full mb-2"
                  />
                  <button onClick={() => addFile(index)} className="w-full mb-2">Add File</button>
                  <ul>
                    {folder.files.map((file, fileIndex) => (
                      <li key={fileIndex} className="flex items-center mb-1">
                        <MdInsertDriveFile className="mr-2" />
                        <span>{file}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
