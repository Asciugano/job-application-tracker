import ApplicationList from "@/components/applicationList";
import axios from "axios";

export default async function Home() {
  const userID = await axios.get('http://localhost:3000/api/auth/get_token')
  const user_id = userID.data.userID;
  console.log(user_id);
  const res = await axios.post('http://localhost:3000/api/application', { user_id, limit: 3 });
  const applications = res.data.applications;
  return (
    <ApplicationList limit={3} applications={applications} />
  )
}
