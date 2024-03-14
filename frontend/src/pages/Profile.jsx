
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {app} from '../firebase.js'
// import { app } from "../firebase";
import { updateUserStart,updateUserSuccess,updateUserFailure } from "../redux/user/userSlice.js";
import {useDispatch} from 'react-redux';
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  //   // firebase Storage
//   // allow read;
//   // allow write: if
//   // request.resource.size < 2 * 1024 * 1024 &&
//   // request.resource.contentType.matches('image/.*')


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (_error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
      {
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
         dispatch(updateUserFailure(data.message)); 
         return;
      }
      dispatch(updateUserSuccess(data ));
      setUpdateSuccess(true);
    }
    catch(error){
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-3 max-w-lg">
        <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
        <form onSubmit = {handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm text-center">
            {fileUploadError ? (
              <span className="text-red-700">Error uploading photo</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-red-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Photo uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            className="border p-3 rounded-lg"
            onChange = {handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            id="email"
            onChange = {handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange = {handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-75"
          >
          {loading? 'Loading...' : 'update'}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">
            Delete the account
          </span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
        <p className="text-red-700 mt-5">{error? error : ''}</p>
        <p className="text-green-700 mt-5"
        >{updateSuccess? 'user is updated successfully':''}</p>
      </div>
    </div>
  );
}
