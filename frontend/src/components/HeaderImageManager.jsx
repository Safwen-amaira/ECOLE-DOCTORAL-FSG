// HeaderImageManager.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavDashboard/NavBar';
import {  getAdminfUser,getAdminsUser,getAdmintUser,refreshAdminf,refreshAdmins,refreshAdmint} from '../action/auth'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const HeaderImageManager = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(refreshAdminf());

        }


        dispatch(getAdminfUser())

    }, [dispatch])
    const state = useSelector(state => state.auth);


    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const baseURL = 'http://127.0.0.1:8000';

    useEffect(() => {
        // Fetch all images when component mounts
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api-headers-imgs/api/get/imgs');
            const imageData = response.data.map(image => ({
                ...image,
                image_url: baseURL + image.image // Prepend base URL to relative image URL
            }));
            setImages(imageData);
        } catch (error) {
            setError('Failed to fetch images');
        }
    };

    const handleUpload = async (formData) => {
        setUploading(true);
        try {
            // Append additional fields if required by the backend
            formData.append('title', 'Some Title');
            
            await axios.post('http://127.0.0.1:8000/api-headers-imgs/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // After successful upload, fetch images again to update the list
            fetchImages();
        } catch (error) {
            setError('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseURL}/api-headers-imgs/api/get/imgs/${id}/`);
            // After successful deletion, fetch images again to update the list
            fetchImages();
        } catch (error) {
            setError('Failed to delete image');
        }
    };
    if (state.isLoading) {
        return <h3>Loading....</h3>;
    } else if (!state.isAuthenticated || !state.isAdminf) {
        return <Navigate to="/login" />;
    } else {
    return (
        <div>
        <NavBar/>
            {/* Upload form */}
            <center>
            <h1>Vous pouvez ici de manupiler les image de la page d'Acceuil </h1>
            <br/><br/>
            <input type="file" onChange={(e) => {
                const formData = new FormData();
                formData.append('image', e.target.files[0]);
                handleUpload(formData);
            }} />
            <hr/>

            
            {/* Display images */}
            {images.map(image => (
                <div key={image.id}>
                
                    <img src={image.image_url} alt={image.title} style={{margin:'3%',width:'20%',height:'20%'}}/>
                    <button  style={{margin:'0%'}} onClick={() => handleDelete(image.id)}>Delete</button>
                    <hr/>

                </div>
            ))}

            {/* Display error if any */}
            {error && <p>Error: {error}</p>}

            {/* Display loading spinner during upload */}
            {uploading && <p>Uploading...</p>}
            </center>
        </div>
    );
}
};

export default HeaderImageManager;
