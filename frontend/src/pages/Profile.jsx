import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState,useEffect } from "react";
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { app } from "../firebase";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [ file, setFile ] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  // firebase Storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
    

  useEffect(() =>{
    if(file) {
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred/
      snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    }
      );
      (error) => {
        setFileUploadError(true);
      };
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        (downloadURL) => {
          // setFile(downloadURL);
        };
  //   const fileRef = storage.ref(`images/${file.name}`);
  //   const task = fileRef.put(file);
  //   task.on(
  //  'state_changed',
  //     (snapshot) => {
  //       const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //       console.log('Upload is'+ progress + '% done');
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       fileRef.getDownloadURL().then((downloadURL) => {
  //         setFile(downloadURL);
  //       });
  //     }
  //   );
  }


  return (
    <div className="p-3 max-w-lg max-auto ">
      <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
      <from className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 
          object-cover cursor-pointer self-center mt-2 "
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          // value={formData.email}
          // onChange={handleChange}
          // required
        />
        <input
          type="text"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          // value={formData.password}
          // onChange={handleChange}
          // required
        />
        <button
          type="submit"
          className="bg-orange-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-75"
        >
          update
        </button>
      </from>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">delete the account</span>
        <span className="text-red-700 cursor-pointer">signout</span>
      </div>
    </div>
  );
}
