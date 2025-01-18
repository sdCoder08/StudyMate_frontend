import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { FaRectangleXmark } from "react-icons/fa6";

const DocumentContainer = ({ documents, setDocuments }) => {
  const userId = sessionStorage.getItem('userId')
  const content = documents.content || ''

  const [currentDoc , setCurrentDoc] = useState('');
  sessionStorage.setItem('visibleDoc' , currentDoc)

  useEffect(() => {
    axios.get('https://backend-3282.onrender.com/Documents/getDocuments', { params: { userId: userId } })
      .then((response) => {
        setDocuments(response.data)
      })
      .catch((error) => {
        toast.error(error)
      })
  },[userId])

  const onDelete = async (title) => {
    try {
      const response = await axios.delete('https://backend-3282.onrender.com/Documents/deleteDocument', {params: {userId:userId , documentToDelete : title}} )
      toast.success(response.data.message)
      setDocuments(response.data.documents)
    } catch (error) {
      toast.error('Error Deleting Document')
    }
  }

  const onEdit = (title) => {
    setCurrentDoc(title);
    window.location.href = '/editor'
  }

  return (
    <div className="documents-container">
      {documents.map((document, index) => (
        <div key={index} className='card' onDoubleClick={() => handleDoubleClick(document.Title)}>
          <div className="document-header">
            <h3 className="document-title">{document.Title}</h3>
          </div>
          <div className="document-content">
            <p>{document.content.length > 100 ? `${document.content.substring(0, 100)}...` : content}</p>
          </div>
          <div className="document-footer">
            <span className="document-user">User: {userId}</span>
            <span className="document-date">Date: {new Date(document.createdDate).toLocaleDateString()}</span>
          </div>
          <div className="document-actions">
            <button className="edit-btn" onClick={() => onEdit(document.Title)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(document.Title)}>Delete</button>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  )
};
export default DocumentContainer
