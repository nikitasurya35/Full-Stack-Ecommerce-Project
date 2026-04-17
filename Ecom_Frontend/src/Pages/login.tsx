import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-800 to-white">
      
      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl shadow-black/40 rounded-3xl p-5 w-full max-w-xs">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-100 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-100 mb-6">
          Sign in to your account to continue
        </p>

        {/* Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-gray-100 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-2 py-2 rounded-xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-100 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-2 py-2 rounded-xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-indigo-800 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-300 my-5 text-sm">
          OR CONTINUE WITH
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 py-2 rounded-xl bg-white/70 border border-white/40 hover:bg-white transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;