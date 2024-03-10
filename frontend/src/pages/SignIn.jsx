import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
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
      const res = await fetch("/api/auth/signin", {
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
      if (error.response && error.response.status === 401) {
        setError("Wrong password. Please try again.");
      } else if (error.response && error.response.status === 404) {
        setError("User not found. Please check your email.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      {error && <div className="text-red-700 mt-2">{error}</div>}
      <div className="flex gap-2 mt-4">
        <p>Don't have an account? </p>
        <Link to={"/sign-up"} className="text-red-700">
          Sign up
        </Link>
      </div>
    </div>
  );
}