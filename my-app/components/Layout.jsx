import React from 'react';
import Sidebar from "../components/Sidebar";
import { FaEdit, FaStickyNote, FaList, FaFileAlt } from 'react-icons/fa';
import Link from 'next/link';

const Layout = () => {
    return (
        <div className='h-screen flex flex-row justify-start'>
          <Sidebar />
          <div className='bg-primary flex-1 flex items-center justify-center p-6 text-white'>
        <div className='primary-content'>
          <Link href='/text_editor' className='section'>
            <FaEdit className='icon' />
            <span className='text'>Text Editor</span>
          </Link>
          <Link href='/note_maker' className='section'>
            <FaStickyNote className='icon' />
            <span className='text'>Note Maker</span>
          </Link>
          <Link href='/list_maker' className='section'>
            <FaList className='icon' />
            <span className='text'>List Making</span>
          </Link>
          <Link href='/readme_files' className='section'>
            <FaFileAlt className='icon' />
            <span className='text'>README files</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Layout;