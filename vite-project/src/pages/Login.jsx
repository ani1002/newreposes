import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const response = await fetch("http://localhost:5000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await response.json();
  //   setMessage(data.message);
  // };

 
  const handleSubmit = (e) =>{
e.preventDefault();    
const validuserid = "user1";
const validpasseword = 123;
//console.log(email,password,typeof password);
if(email === "user1" && password === "123"){
  navigate('/form');
}
else {
  alert("please insert detail");
}
  }
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">USERID</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">USERID:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
