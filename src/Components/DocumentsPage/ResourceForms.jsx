import React from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const ResourceForms = ({ visibleForm, setBooks, setWebsites, setVideos }) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const userId = sessionStorage.getItem('userId')
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
    const otherFieldRegex = /^[A-Za-z\s'-]+$/;

    const onsubmit = async (data) => {
        if (data.formType === 'books') {
            const bookInfo = {
                userId: userId,
                bookTitle: data.bookTitle,
                bookAuthor: data.bookAuthor,
                bookEdition: data.bookEdition,
                bookSubject: data.bookSubject
            }
            if (!otherFieldRegex.test(bookInfo.bookTitle)) {
                toast.error('Book title field only allows character data.');
                return;
            }
            if (!otherFieldRegex.test(bookInfo.bookAuthor)) {
                toast.error('Book author field only allows character data.');
                return;
            }
        
            if (!otherFieldRegex.test(bookInfo.bookSubject)) {
                toast.error('Book subject field only allows character data.');
                return;
            }
            await axios
                .post('https://backend-3282.onrender.com/Books/AddBook', bookInfo)
                .then((response) => {
                    if (response.data) {
                        toast.success('Book added successfully')
                        setBooks(response.data.Books)
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error.response.data.message)
                    }
                })
        }
        if (data.formType === 'videos') {
            const videoInfo = {
                userId: userId,
                videoTitle: data.videoTitle,
                videoUrl: data.videoUrl,
                videoProvider: data.videoProvider
            }
            if (!otherFieldRegex.test(videoInfo.videoTitle)) {
                toast.error('Video title field only allows character data.');
                return;
            }
            if (!urlRegex.test(videoInfo.videoUrl)) {
                toast.error('Video url is not valid.');
                return;
            }
            if (!otherFieldRegex.test(videoInfo.videoProvider)) {
                toast.error('Video provider field only allows character data.');
                return;
            }
            await axios
                .post('https://backend-3282.onrender.com/Videos/AddVideo', videoInfo)
                .then((response) => {
                    if (response.data && response.data.Videos) {
                        toast.success('Video added successfully')
                        setVideos(response.data.Videos)
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error.response.data.message)
                    }
                })
        }
        if (data.formType === 'websites') {
            const websiteInfo = {
                userId: userId,
                websiteTitle: data.websiteTitle,
                websiteUrl: data.websiteUrl,
                websiteSubject: data.websiteSubject
            }
            if (!otherFieldRegex.test(websiteInfo.websiteName)) {
                toast.error('Website title only allows character data.')
            }
            if (!urlRegex.test(websiteInfo.websiteUrl)) {
                toast.error('Website url is not in valid format.')
            }
            if (!otherFieldRegex.test(websiteInfo.websiteSubject)) {
                toast.error('Subject name field only allows character data.')
            }
            await axios
                .post('https://backend-3282.onrender.com/Websites/AddWebsite', websiteInfo)
                .then((response) => {
                    if (response.data && response.data.Websites) {
                        toast.success('Website added successfully')
                        setWebsites(response.data.Websites)
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error.response.data.message)
                    }
                })
        }
    }
    return (
        <>
            {visibleForm === 'books' && (
                <div className="form books-form">
                    <h2 className='form-heading'>Books Form</h2>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="inputs">
                            <input type="hidden" value='books' {...register('formType')} />
                            <input type="text" placeholder='book name' {...register('bookTitle', { required: true })} />
                            {errors.bookTitle && <span>This field is required</span>}
                            <input type="text" placeholder='book author' {...register('bookAuthor', { required: true })} />
                            {errors.bookAuthor && <span>This field is required</span>}
                            <input type="text" placeholder='book addition' {...register('bookEdition', { required: true })} />
                            {errors.bookEdition && <span>This field is required</span>}
                            <input type="text" placeholder='subject' {...register('bookSubject', { required: true })} />
                            {errors.bookSubject && <span>This field is required</span>}
                        </div>
                        <button type="submit" className='btn-add-item'>Submit</button>
                    </form>
                </div>
            )}
            {visibleForm === 'videos' && (
                <div className="form videos-form">
                    <h2 className='form-heading'>Videos Form</h2>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="inputs">
                            <input type="hidden" value='videos' {...register('formType')} />
                            <input type="text" placeholder='video title' {...register('videoTitle', { required: true })} />
                            {errors.videoTitle && <span>This field is required</span>}
                            <input type="text" placeholder='video url' {...register('videoUrl', { required: true })} />
                            {errors.videoUrl && <span>This field is required</span>}
                            <input type="text" placeholder='provider' {...register('videoProvider', { required: true })} />
                            {errors.videoProvider && <span>This field is required</span>}
                        </div>
                        <button type="submit" className='btn-add-item'>Submit</button>
                    </form>
                </div>
            )}
            {visibleForm === 'websites' && (
                <div className="form websites-form">
                    <h2 className='form-heading'>Websites Form</h2>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="inputs">
                            <input type="hidden" value='websites' {...register('formType')} />
                            <input type="text" placeholder='website name' {...register('websiteTitle', { required: true })} />
                            {errors.websiteName && <span>This field is required</span>}
                            <input type="text" placeholder='website url' {...register('websiteUrl', { required: true })} />
                            {errors.websiteUrl && <span>This field is required</span>}
                            <input type="text" placeholder='subject' {...register('websiteSubject', { required: true })} />
                            {errors.websiteSubject && <span>This field is required</span>}
                        </div>
                        <button type="submit" className='btn-add-item'>Submit</button>
                    </form>
                </div>
            )}
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} closeOnClick pauseOnHover />
        </>
    )
}

export default ResourceForms
