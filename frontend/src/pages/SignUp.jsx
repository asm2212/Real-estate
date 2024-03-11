import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      // Reset form fields after successful submission
      setFormData({
        username: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      navigate("/sign-in");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button 
          type="submit" 
          className="bg-orange-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-75"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      {error && <div className="text-red-700 mt-2">{error}</div>}
      <div className="flex gap-2 mt-4">
        <p>Already have an account? </p>
        <Link to={"/sign-in"} className="text-red-700">
          Sign in
        </Link>
      </div>
    </div>
  );
}
