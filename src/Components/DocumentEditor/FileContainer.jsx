import React, { useState, useEffect } from 'react';
import { FaEdit, FaFile, FaFolder, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';

const files = [
  { name: 'index.html', type: 'file' },
  { name: 'style.css', type: 'file' },
  { name: 'script.js', type: 'file' },
  { name: 'assets', type: 'folder', files: [
    { name: 'logo.png', type: 'file' },
    { name: 'background.jpg', type: 'file' },
    { name: 'images', type: 'folder', files: [
      { name: 'image1.png', type: 'file' },
      { name: 'image2.png', type: 'file' }
    ]}
  ]}
];

const getFileIcon = (fileName) => {
  if (fileName.endsWith('.html')) {
    return <FaHtml5 />;
  } else if (fileName.endsWith('.css')) {
    return <FaCss3Alt />;
  } else if (fileName.endsWith('.js')) {
    return <FaJs />;
  } else {
    return <FaFile />;
  }
};

const FileList = ({ files, onRightClick, onDoubleClick }) => (
  <ul className="file-list">
    {files.map((file, index) => (
      <li 
        key={index} 
        onContextMenu={(e) => onRightClick(e, index)}
        onDoubleClick={() => onDoubleClick(file)}
        className={`file-item ${file.type}`}
      >
        {file.type === 'folder' ? <FaFolder /> : getFileIcon(file.name)}
        <span>{file.name}</span>
        {file.isExpanded && file.type === 'folder' && (
          <FileList 
            files={file.files} 
            onRightClick={onRightClick} 
            onDoubleClick={onDoubleClick} 
          />
        )}
      </li>
    ))}
  </ul>
);

const FileContainer = () => {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, fileIndex: null });
  const [fileStructure, setFileStructure] = useState(files);

  const handleRightClick = (e, index) => {
    e.preventDefault();
    const boundingRect = e.currentTarget.getBoundingClientRect();
    setContextMenu({ visible: true, x: boundingRect.left + 10, y: boundingRect.bottom + 5, fileIndex: index });
  };

  const toggleFolderExpansion = (folder) => {
    folder.isExpanded = !folder.isExpanded;
    setFileStructure([...fileStructure]);
  };

  const handleDoubleClick = (file) => {
    if (file.type === 'folder') {
      toggleFolderExpansion(file);
    }
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, fileIndex: null });
  };

  useEffect(() => {
    if (contextMenu.visible) {
      document.addEventListener('click', closeContextMenu);
      return () => {
        document.removeEventListener('click', closeContextMenu);
      };
    }
  }, [contextMenu]);

  return (
    <div className="file-container-wrapper">
      <div className={`menu-container ${contextMenu.visible ? 'blur' : ''}`}>
        <div className='icons'>
          <div className='edit icon'>
            <FaEdit size={20} />
          </div>
          <div className='document icon'>
            <FaFile size={20} />
          </div>
          <div className="folder icon">
            <FaFolder size={20} />
          </div>
        </div>
        <FileList 
          files={fileStructure} 
          onRightClick={handleRightClick} 
          onDoubleClick={handleDoubleClick} 
        />
      </div>
      {contextMenu.visible && (
        <div 
          className="context-menu" 
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button>Edit</button>
          <button>Save</button>
          <button>Delete</button>
        </div>
      )}
    </div>
  )
}

export default FileContainer;
