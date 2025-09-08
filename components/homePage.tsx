"use client";

import ApplicationList from "@/components/applicationList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    effect();
  }, []);

  const effect = async () => {
    const userID = await axios.get('/api/auth/get_token');
    const user_id = userID.data.userID;

    const res = await axios.post('/api/application', { user_id, limit: 3 });
    setApplications(res.data.applications);
  }
  return (
    <ApplicationList limit={3} applications={applications} />
  )
}
