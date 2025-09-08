import ApplicationComponent from "@/components/applicationCard";
import ApplicationList from "@/components/applicationList";
import { getIDFromToken } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";

export default async function Application() {
  const user_id = await getIDFromToken();
  if (!user_id)
    return (
      <div className="flex items-center text-center">
        <h2 className="text-red-500 font-semibold">Errore devi essere loggato correttamente per vedere questa pagina</h2>
      </div>
    )

  const res = await axios.post('http://localhost:3000/api/application', { user_id });
  const applications = res.data;
  if (!applications || applications.length === 0)
    return (
      <div className="flex items-center text-center">
        <h2 className="text-gray-700 font-semibold">Nessuna applicazione</h2>
        <Link href={'/application/new'} className="text-indigo-500 font-bold hover:underline"><strong>Creane una</strong></Link>
      </div>
    )

  return (
    <div>
      <ApplicationList applications={applications} />
    </div>
  )
}
