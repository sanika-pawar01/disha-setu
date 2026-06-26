import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      alert(error.message);
      return;
    }

    if (data?.session) {
      navigate("/profile");
    } else {
      alert("Login failed. Please check your email verification.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6">
      {/* Brand Section */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-2">Disha-Setu</h1>
        <p className="text-indigo-400 text-lg font-medium">Your Bridge to a Professional Future</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>
        
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 bg-[#0f172a] rounded-xl border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-6 bg-[#0f172a] rounded-xl border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 font-bold cursor-pointer hover:text-indigo-300 transition"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;