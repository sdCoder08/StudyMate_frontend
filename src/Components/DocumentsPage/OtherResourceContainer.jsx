import React, { useEffect } from 'react'
import { FaRectangleXmark } from "react-icons/fa6";
import axios from 'axios';

const OtherResourceContainer = ({ webSites, setWebsites, Books, setBooks, Videos, setVideos, handleVisibleForm }) => {

    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await axios.get('https://backend-3282.onrender.com/Books/GetBooks', { params: { userId } })
                setBooks(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getBooks();
    }, [])
    useEffect(() => {
        const getVideos = async () => {
            try {
                const response = await axios.get('https://backend-3282.onrender.com/Videos/GetVideos', { params: { userId } })
                setVideos(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getVideos();
    }, [])
    useEffect(() => {
        const getWebsites = async () => {
            try {
                const response = await axios.get('https://backend-3282.onrender.com/Websites/GetWebsites', { params: { userId } })
                setWebsites(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getWebsites();
    }, [])

    const deleteBook = async (index) => {
        const bookToDelete = Books[index].bookTitle;
        try {
            const response = await axios.delete('https://backend-3282.onrender.com/Books/DeleteBook', { params: { userId:  userId, bookTitle: bookToDelete } })

            setBooks(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteVideo = async (index) => {
        const videoToDelete = Videos[index].videoTitle;
        try {
            const response = await axios.delete('https://backend-3282.onrender.com/Videos/DeleteVideo', { params: { userId: userId, videoTitle: videoToDelete } })
            setVideos(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteWebsite = async (index) => {
        const websiteToDelete = webSites[index].websiteTitle;
        try {
            const response = await axios.delete('https://backend-3282.onrender.com/Websites/DeleteWebsite', { params: { userId: userId, websiteTitle: websiteToDelete } })
            setWebsites(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='resource-Container'>
            <div className="flex">
                <div className='books-container'>
                    <h1 className='container-title'>Books</h1>
                    <div className="book">
                        <ol>
                            {Books.map((book, index) => (
                                <li key={index}>
                                    <div className="info">
                                        <div className='book-header'><span className='book-title'>{book.bookTitle}</span> - {book.bookSubject}</div>
                                        <div><strong className='book-auther'>{book.authors}</strong>-----{book.bookEdition} Edition </div>
                                    </div>
                                    <div className="btnDelete" onClick={() => deleteBook(index)}><FaRectangleXmark style={{ cursor: 'pointer' }} /></div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <button onClick={() => handleVisibleForm('books')} className='btn-add'>Add New Book</button>
                </div>

                <div className='videos-container'>
                    <h1 className='container-title'>Videos</h1>
                    <div className="video">
                        <ol>
                            {Videos.map((video, index) => (
                                <li key={index}>
                                    <div className="info">
                                        <div className='video-title'>{video.videoTitle}</div>
                                        <div className="video-link">
                                            <a href={video.videoUrl} target="_blank" > <i>Watch on ({video.videoProvider})</i></a>
                                        </div>
                                    </div>
                                    <div className="btnDelete" onClick={() => deleteVideo(index)}><FaRectangleXmark style={{ cursor: 'pointer' }} /></div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <button onClick={() => handleVisibleForm('videos')} className='btn-add'>Add New Video</button>
                </div>
            </div>

            <div className='websites-container'>
                <h1 className='container-title'>Websites</h1>
                <table className='web-table'>
                    <tr className='table-header'>
                        <th><div className='heading'>Name</div></th>
                        <th><div className='heading'>URL</div></th>
                        <th><div className='heading'>Subject</div></th>
                    </tr>
                    {webSites.map((site, index) => (
                        <tr key={index} className='table-row'>
                            <td className='td'><div className='table-data'>{site.websiteTitle}</div></td>
                            <td className='td'><div className="table-data">
                                <a href={site.websiteUrl} target='_blank'>{site.websiteUrl}</a>
                            </div>
                            </td>
                            <td className='td'><div className="table-data">{site.websiteSubject} </div></td>
                            <td onClick={() => deleteWebsite(index)}><FaRectangleXmark style={{ cursor: 'pointer' }} /></td>
                        </tr>
                    ))}
                </table>
                <button onClick={() => handleVisibleForm('websites')} className='btn-add'>Add New Website</button>
            </div>
        </div >
    )
}

export default OtherResourceContainer
