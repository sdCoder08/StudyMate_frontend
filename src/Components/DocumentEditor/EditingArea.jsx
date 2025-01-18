import React from 'react'
import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css'

const EditingArea = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    const userId = sessionStorage.getItem('userId')
    const currentdoc = sessionStorage.getItem('visibleDoc')

    useEffect(() => {
        const getContent = async () => {
            try {
                const content = await axios.get('https://backend-3282.onrender.com/Documents/getContent', { params: { userId: userId, currentdoc: currentdoc } })
                if(content.data){
                    setContent(content.data.content)
                    setTitle(currentdoc)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getContent()
    },[userId,currentdoc])

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error('Title is required to save the document.');
            return;
        }

        const currentDateTime = new Date().toLocaleDateString();
        console.log(currentDateTime)

        const docData = ({
            userId: userId,
            title: title,
            content: content,
            createdDate: currentDateTime
        })

        try {
            const response = await axios.post('https://backend-3282.onrender.com/Documents/createDocument', docData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Error Saving Document');
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    return (
        <div className="editor">
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} closeOnClick pauseOnHover />
            <div className="editor-header">
                <input
                    type="text"
                    className="title-input"
                    placeholder="Enter document title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button className="save-button" onClick={handleSave}>
                    Save Document
                </button>
            </div>
            <ReactQuill
                theme='snow'
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']}
                placeholder="Make your notes here..."
                modules={modules}
                onChange={setContent}
                value={content}
            />
        </div>
    )
}

export default EditingArea
