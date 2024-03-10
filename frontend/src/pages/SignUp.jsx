import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-6'
      >Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-orange-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-75'>SignUp</button>
      </form>
      <div className='flex gap-2 mt-4'>
       <p>Have an Account? </p>
       <Link to={"/sign-in"}>
        <span className='text-red-700'>Sign in</span>
       </Link>
      </div>
    </div>
  )
}
