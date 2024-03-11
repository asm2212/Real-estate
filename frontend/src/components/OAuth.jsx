import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth';
import {app} from '../firebase.js';
import { signInSuccess } from '../redux/user/userSlice';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async() => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth,provider)
      const res = await fetch('api/auth/google',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
           email:result.user.email,
          photo:result.user.photoURL}),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
        navigate('/');

    } catch (error) {
      console.log("could not sign in with google",error);
    }
  }
 
  
  return (
    <button onClick = {handleGoogleClick} type='button' className='bg-red-600 p-3 text-white rounded-lg 
    hover:opacity-95'>
      Sign in with Google
      </button>
  )
}

export default OAuth;