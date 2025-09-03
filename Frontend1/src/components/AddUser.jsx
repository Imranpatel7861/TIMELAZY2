import React, { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/user/create`, {
        name,
        email,
        password,
      });
      console.log("User created:", res.data);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error.response.data.message);
      alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl mb-4">Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
