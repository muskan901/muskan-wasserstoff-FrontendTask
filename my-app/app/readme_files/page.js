"use client";
import React, { useState } from 'react';
import { marked } from 'marked'; 
import Sidebar from '/components/Sidebar';
// import html2pdf from 'html2pdf.js';

const page = () => {
    const [readmes, setReadmes] = useState([]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newReadmes = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const readmeContent = e.target.result;
        const newReadme = { name: file.name, content: readmeContent };
        newReadmes.push(newReadme);
        setReadmes([...readmes, ...newReadmes]);
      };

      reader.readAsText(file);
    }
  };

  const handleMarkdownChange = (index, event) => {
    const updatedReadmes = [...readmes];
    updatedReadmes[index].content = event.target.value;
    setReadmes(updatedReadmes);
  };

  const exportAsPDF = (index) => {
    const markdownContent = readmes[index].content;
    const element = document.createElement('div');
    element.innerHTML = marked(markdownContent);

    html2pdf()
      .from(element)
      .save(`${readmes[index].name}.pdf`);
  };

  const exportAsHTML = (index) => {
    const markdownContent = readmes[index].content;
    const htmlContent = marked(markdownContent);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${readmes[index].name}.html`;
    link.click();
  };

  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <div className=" flex-1 flex items-center justify-center p-6 text-white">
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">README Previewer</h1>

      {/* File Upload Section */}
      <div className="mb-4">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          accept=".md,.markdown"
          className="mb-2"
        />
        <p className="text-sm text-gray-600">Upload one or more README files (.md or .markdown).</p>
      </div>

      {/* Render README Previews */}
      {readmes.map((readme, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl mb-2 font-bold">{readme.name}</h2>
          <div className="flex flex-row">
            <div className="w-1/2 p-2">
              <h3 className="text-lg mb-2 font-bold">Input</h3>
              <div
                className="markdown-preview p-3 border rounded"
                style={{ height: '350px', backgroundColor: 'grey', overflowY: 'auto' }}
                dangerouslySetInnerHTML={{ __html: marked(readme.content) }}
              />
              <button
                    onClick={() => exportAsPDF(index)}
                    className="mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Export as PDF
                  </button>
                  <button
                    onClick={() => exportAsHTML(index)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Export as HTML
                  </button>
            </div>
            <div className="w-1/2 p-2">
              <h3 className="text-lg mb-2 font-bold">Preview</h3>
              <textarea
                className="w-full h-48 p-3 border rounded"
                value={readme.content}
                onChange={(e) => handleMarkdownChange(index, e)}
                placeholder={`Edit ${readme.name}`}
                style={{backgroundColor: 'grey', height:'350px'}}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  )
}

export default page
