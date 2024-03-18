import { useState } from "react";

import { app } from "../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
export default function CreateList() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    description:"",
    bedRooms:1,
    bathRooms:1,
    type:"rent",
    address:"",
    name:"",
    regularPrice:100,
    discountPrice:80,
    offer:false,
    parking:false,
    furnished:false,
  });
  console.log(formData);
  const [imageUploadError,setImageUploadError] = useState(false);
  const [uploading,setUploading] = useState(false);
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length < 6) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage([files[i]]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
    //   }).catch(()=>{
    //     setImageUploadError('image upload error');
    //     setUploading(false);

    //   });
    }).catch((error) => {
        setImageUploadError('image upload error');
        console.error('Error uploading images:', error);
        setUploading(false);
      });
    }  else {
        setImageUploadError('you can only upload 5 image ');
        setUploading(false);
    }
  };

  const storeImage = async (files) => {
    if (!files || files.length === 0) {
      throw new Error("Invalid files");
    }

    const storage = getStorage(app);
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = new Date().getTime() + file.name;

      if (!fileName) {
        throw new Error("Invalid file name");
      }

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      promises.push(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Handle snapshot changes if needed
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  console.log("Download URL:", downloadURL);
                  resolve(downloadURL);
                })
                .catch((error) => {
                  reject(error);
                });
            }
          );
        })
      );
    }

    return Promise.all(promises);
  };

  const  handleDeleteImage = (index) => {
    setFormData({
   ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i!== index),
    });
  }

  const handleChange = (e) => {
    if(e.target.id === 'sale') {
        setFormData({
            ...formData, 
            type: 'sale'
        });
    } else if(e.target.id === 'rent') {
        setFormData({
            ...formData, 
            type: 'rent'
        });
    }

    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
        setFormData({
          ...formData, 
             [e.target.id]: e.target.checked
        });
    }

    if(e.target.type === 'number' ||
       e.target.type === 'text' ||
       e.target.type === 'textarea'
    ) {
        setFormData({
          ...formData, 
         [e.target.id]: e.target.value,
        });
    }
};

const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/list/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        setLoading(false);
        if(data.success === false){
            setError(data.message);
        }
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
};

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">CreateList</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="223"
            minLength="12"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" 
              onChange={handleChange}
              checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" 
              onChange={handleChange}
              checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5"
              onChange={handleChange}
              checked={formData.parking}
               />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5"
              onChange={handleChange}
              checked={formData.furnished}
               />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" 
              onChange={handleChange}
              checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedRooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
                onChange={handleChange}
                value={formData.bedRooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathRooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
                onChange={handleChange}
                value={formData.bathRooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                required
                min="100"
                max="100000000000000"
                className="p-3 border border-gray-400 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div>
                <p>regularPrice</p>
                <span className="text-xs">$/month</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="80"
                max="100000000000000"
                required
                className="p-3 border border-gray-400 rounded-lg"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div>
                <p>DiscountPrice</p>
                <span className="text-xs">$/month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover max 5
            </span>
          </p>
          <div className="flex gap-4">
            {/* <input
              onChange={(e) => setFiles(e.target.files)} // Update this line
              className="p-3 border border-gray-400 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            /> */}
       <input 
       onChange={(e) => setFiles(Array.from(e.target.files))} 
       className="p-3 border border-gray-400 rounded w-full" 
       type="file" 
       id="images" 
       accept="image/*"
        multiple />
            <button
              onClick={handleImageSubmit}
              disabled={uploading}
              type="button"
              className="p-3 text-orange-600 border border-orange-600
                   rounded hover:shadow-lg disabled:opacity-80"
            >
             {uploading ? "uploading" : "Upload"}
            </button>
          
          </div>
          <p className="text-red-800 text-sx">{imageUploadError && imageUploadError}</p>
          {
  formData.imageUrls.length > 0 &&
  formData.imageUrls.map((url, index) => (
    <div className="flex justify-between p-3 border items-center" key={index}>
      <img
      key={url}
        src={url}
        alt="image list"
        className="w-20 h-20 object-contain rounded-lg"
      />
      <button
        className="p-3 text-red-700 rounded-lg hover:opacity-90"
        onClick={() => handleDeleteImage(index)}
      >
        Delete
      </button>
    </div>
  ))
}
          <button  className="p-3 bg-orange-500 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
           {loading ? 'creating...' : 'create list'}
          </button>
          <p className="text-red-800 text-sx">{error}</p>
        </div>
      </form>
    </main>
  );
}

// export default CreateList;
