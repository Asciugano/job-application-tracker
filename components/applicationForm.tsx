"use client";

import axios from "axios";
import { Briefcase, Building2, Calendar, ChevronsDown, Loader2, MapPin, StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    user_id: "",
    company: "",
    position: "",
    status: "APPLIED",
    location: "",
    deadline: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const userID = await axios.get('/api/auth/get_token')
      if (!userID.data) {
        setError("Devi essere loggato per creare una nuova applicazione");
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        user_id: userID.data.userID,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null
      }

      console.log(payload);

      const newApp = await axios.post('/api/application/new', payload, {
        headers: { "Content-Type": "application/json" }
      });

      console.log(newApp);

      setError("");
      router.push('/application');
    } catch (e: any) {
      console.error(e);
      setError(e.response?.data?.message || "Qualcosa e' andato storto");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-indigo-500">Crea una nuova Applicazione</h2>
      {(error || error.length > 0) && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* company */}
      <div className="flex items-center border rounded-lg p-2 gap-2">
        <Building2 className="text-gray-500" size={20} />
        <input
          type="text"
          name="company"
          placeholder="Compania"
          value={formData.company}
          onChange={handleChange}
          className="flex-1 outline-none"
          required
        />
      </div>

      {/* position */}
      <div className="flex items-center border rounded-lg p-2 gap-2">
        <Briefcase className="text-gray-500" size={20} />
        <input
          type="text"
          name="position"
          placeholder="Posizione"
          value={formData.position}
          onChange={handleChange}
          className="flex-1 outline-none"
          required
        />
      </div>

      {/* Status */}
      <div className="relative">
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full appearance-none bg-white dark:bg-gray-700 border border-r-gray-300 text-gray-500 py-2 px-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-r-indigo-500"
        >
          <option value="APPLIED">Applicato</option>
          <option value="INTERVIEW">Colloquio</option>
          <option value="OFFER">Offerta</option>
          <option value="REJECTED">Rifiutato</option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronsDown size={20} />
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center border rounded-lg p-2 gap-2">
        <MapPin className="text-gray-500" size={20} />
        <input
          type="text"
          name="location"
          placeholder="Ubicazione (Opzionale)"
          value={formData.location}
          onChange={handleChange}
          className="flex-1 outline-none"
        />
      </div>

      {/* deadline */}
      <div className="flex items-center border rounded-lg p-2 gap-2">
        <Calendar className="text-gray-500" size={20} />
        <input
          type="date"
          name="deadline"
          onChange={handleChange}
          className="flex-1 outline-none"
        />
      </div>

      {/* notes */}
      <div className="flex items-start border rounded-lg p-2 gap-2">
        <StickyNote className="text-gray-500" size={20} />
        <textarea
          name="notes"
          placeholder="Note..."
          value={formData.notes}
          onChange={handleChange}
          className="flex-1 outline-none"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Crea Applicazione"}
      </button>
    </form>
  );
}
