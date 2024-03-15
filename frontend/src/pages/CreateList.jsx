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
  });
  console.log(formData);
  const [imageUploadError,setImageUploadError] = useState(false);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length < 6) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage([files[i]])); // Pass an array with a single file
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
      }).catch(()=>{
        setImageUploadError('image upload error');
      });
    }  else {
        setImageUploadError('you can only upload 5 image ');
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
 
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">CreateList</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="223"
            minLength="12"
            required
          />
          <textarea
            placeholder="description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
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
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
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
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
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
            <input
              onChange={(e) => setFiles(e.target.files)} // Update this line
              className="p-3 border border-gray-400 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              className="p-3 text-orange-600 border border-orange-600
                   rounded hover:shadow-lg disabled:opacity-80"
            >
              Upload
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
          <button className="p-3 bg-orange-500 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
            Create List
          </button>
        </div>
      </form>
    </main>
  );
}

// export default CreateList;
