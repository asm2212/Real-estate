// import { useSelector } from "react-redux";
// import { useRef } from "react";
// import { useState,useEffect } from "react";
// import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
// import { app } from "../firebase";
// export default function Profile() {
//   const fileRef = useRef(null);
//   const { currentUser } = useSelector((state) => state.user);
//   const [ file, setFile ] = useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});

//   // firebase Storage
//   // allow read;
//   // allow write: if
//   // request.resource.size < 2 * 1024 * 1024 &&
//   // request.resource.contentType.matches('image/.*')

//   useEffect(() =>{
//     if(file) {
//       handleFileUpload(file);
//     }
//   },[file]);

//   const handleFileUpload = (file) => {
//     const storage = getStorage(app);
//     const filename = new Date().getTime() + file.name;
//     const storageRef = ref(storage, filename);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setFilePerc(Math.round(progress));
//       },
//       (error) => {
//         setFileUploadError(true);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setFormData({ ...formData, avatar: downloadURL });
//         });
//       }
//     );
//   };

//   }

//   return (
//     <div className="p-3 max-w-lg max-auto ">
//       <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
//       <form className="flex flex-col gap-4">
//         <input
//           onChange={(e) => setFile(e.target.files[0])}
//           type="file"
//           ref={fileRef}
//           hidden
//           accept="image/*"
//         />
//         <img
//           onClick={() => fileRef.current.click()}
//           src={currentUser.avatar}
//           alt="profile"
//           className="rounded-full w-24 h-24
//           object-cover cursor-pointer self-center mt-2 "
//         />
//         <input
//           type="text"
//           placeholder="Username"
//           className="border p-3 rounded-lg"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-3 rounded-lg"
//           id="email"
//         />
//         <input
//           type="text"
//           placeholder="Password"
//           className="border p-3 rounded-lg"
//           id="password"
//         />
//         <button
//           type="submit"
//           className="bg-orange-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-75"
//         >
//           update
//         </button>
//       </form>
//       <div className="flex justify-between mt-5">
//         <span className="text-red-700 cursor-pointer">delete the account</span>
//         <span className="text-red-700 cursor-pointer">signout</span>
//       </div>
//     </div>
//   );

import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-3 max-w-lg">
        <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
        <form className="flex flex-col gap-4">
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
            className="border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
          />
          <input
            type="text"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
          />
          <button
            type="submit"
            className="bg-orange-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-75"
          >
            Update
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">
            Delete the account
          </span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </div>
    </div>
  );
}
