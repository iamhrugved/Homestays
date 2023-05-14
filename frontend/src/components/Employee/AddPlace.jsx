import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@material-ui/core';
import { serverURL } from '../../utils/config';
import CLOUDINARY from '../../utils/cloudinary';

const AddPlace = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: localStorage.getItem('email'),
    name: '',
    location: '',
    description: '',
    photos: '',
    inPhotos: [],
    basePrice: '',
    amenitiesList: '',
    amenitiesCharges: '',
    noOfGuests: '',
    roomCount: ''
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handlePhotoUpload = async (event) => {
    const photo = event.target.files[0];
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', `${CLOUDINARY.upload_preset}`);
    formData.append('folder', `${CLOUDINARY.folder}`);
    formData.append('resource_type', `${CLOUDINARY.resource_type}`);
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY.YOUR_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      setFormData(prevFormData => ({ ...prevFormData, photos: data.secure_url }));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleInPhotoUpload = async (event) => {
    const inPhotos = event.target.files;
    const urls = [];
    for (const inPhoto of inPhotos) {
      const formData = new FormData();
      formData.append('file', inPhoto);
      formData.append('upload_preset', `${CLOUDINARY.upload_preset}`);
      formData.append('folder', `${CLOUDINARY.folder}`);
      formData.append('resource_type', `${CLOUDINARY.resource_type}`);
  
      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY.YOUR_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        urls.push(data.secure_url);
      } catch (error) {
        console.error(error);
      }
    }

    setFormData(prevFormData => ({ ...prevFormData, inPhotos: [...prevFormData.inPhotos, ...urls] }));
  };
  

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formData);
    axios.post(`${serverURL}/employee/addPlace`, formData)
      .then(response => {
        console.log(response.data);
        navigate(-1);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <><Typography variant="h4" gutterBottom style={{ display: 'flex', justifyContent: 'center' }}>Add a new place</Typography>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit} style={{ width: '50%', maxWidth: '600px' }}>
              <TextField name="name" label="Name" variant="outlined" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
              <TextField name="location" label="Location" variant="outlined" value={formData.location} onChange={handleChange} fullWidth margin="normal" />
              <TextField name="description" label="Description" variant="outlined" value={formData.description} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                {formData.photos && (
                <div style={{ margin: '10px', width: '150px', height: '150px', overflow: 'hidden', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
                    <img src={formData.photos} alt="Room" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                )}
              <input type="file" multiple onChange={handleInPhotoUpload} />
              {formData.inPhotos.map((photo, index) => (
                  <div key={index} className="inPhotos">
                      <img src={photo} alt={`Room ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
              ))}
              <TextField name="basePrice" label="Base Price" variant="outlined" value={formData.basePrice} onChange={handleChange} fullWidth margin="normal" />
              <TextField name="amenitiesList" label="Amenities List" variant="outlined" value={formData.amenitiesList} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />
              <TextField name="amenitiesCharges" label="Amenities Charges" variant="outlined" value={formData.amenitiesCharges} onChange={handleChange} fullWidth margin="normal" />
              <TextField name="noOfGuests" label="Number of Guests" variant="outlined" value={formData.noOfGuests} onChange={handleChange} fullWidth margin="normal" />
              <TextField name="roomCount" label="Number of Rooms" variant="outlined" value={formData.roomCount} onChange={handleChange} fullWidth margin="normal" />
              <Button type="submit" variant="contained" color="secondary" fullWidth style={{ marginTop: '20px' }}>Submit</Button>
          </form>
      </div></>

);
};

export default AddPlace;