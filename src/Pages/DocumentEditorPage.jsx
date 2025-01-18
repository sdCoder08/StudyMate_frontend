import React from 'react'
import EditingArea from '../Components/DocumentEditor/EditingArea'
import '../assets/Styles/Editor.css'

const DocumentEditorPage = () => {
    return (
        <div>
            <div className='pallate'>
                <EditingArea />
            </div>
        </div>
    )
}

export default DocumentEditorPage
