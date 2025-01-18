import React, { useState } from 'react'
import DocumentContainer from '../Components/DocumentsPage/DocumentContainer'
import OtherResourceContainer from '../Components/DocumentsPage/OtherResourceContainer'
import ResourceForms from '../Components/DocumentsPage/ResourceForms'
import '../assets/Styles/DocumentsPage.css'

const DocumentsPage = () => {

  const [activeTab, setActiveTab] = useState('OtherResource')
  const [documents, setDocuments] = useState([])
  const [websites, setWebsites] = useState([])
  const [books, setBooks] = useState([])
  const [videos, setVideos] = useState([])
  const [visibleForm, setVisibleForm] = useState('')

  const handleContent = (contentTitle) => {
    setActiveTab(contentTitle)
  }

  const handleHideForm =() =>{
    setVisibleForm(null)
  }

  const handleVisibleForm = (formType) => {
    setVisibleForm(formType)
    console.log(formType)
  }

  return (
    <div className='document-page'>
      <ul className='resource-links'>
        <li className='resource-link' onClick={() => handleContent('Documents')}>Documents</li>
        <li className='resource-link' onClick={() => handleContent('OtherResource')}>Other Resource</li>
      </ul>

      {
        activeTab === 'Documents' && <DocumentContainer documents={documents} setDocuments={setDocuments} setVisibleForm={setVisibleForm} />
      }
      {
        activeTab === 'OtherResource' && <OtherResourceContainer webSites={websites} setWebsites={setWebsites} Books={books} setBooks={setBooks} Videos={videos} setVideos={setVideos} handleVisibleForm={handleVisibleForm} />
      }

      {visibleForm && (
        <div className="form-overlay" onClick={handleHideForm}>
          <div className="form-wrapper" onClick={(e) => e.stopPropagation()}>
            <ResourceForms visibleForm={visibleForm} setBooks={setBooks} setWebsites={setWebsites} setVideos={setVideos}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentsPage
