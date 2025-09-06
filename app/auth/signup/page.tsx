"use client";

import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [showPssw, setShowPssw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) setError("Credenziali non valide");
    else window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="nome.cognome@provider.com"
        required
      />
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Mario"
        required
      />
      <span>
        <input
          type={showPssw ? "text" : "password"}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder={showPssw ? "password" : "********"}
          required
        />
        <button onClick={(e) => { e.preventDefault(); setShowPssw(!showPssw) }}>
          {showPssw ?
            <Eye size={18} />
            :
            <EyeOff size={18} />
          }
        </button>
      </span>
      <button type="submit">Login</button>
      {error.length > 0 && <p>{error}</p>}
    </form>
  )
}
