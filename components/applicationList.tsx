import { Application } from "@/lib/prisma";
import Link from "next/link";
import ApplicationCard from "./applicationCard";

interface Props {
  applications: Application[],
  limit?: number,
};

export default function ApplicationList({ applications, limit }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="space-y-4">
        {applications
          .slice(0, limit || applications.length)
          .map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
      </div>
      <Link
        className="mt-6 bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow transition"
        href='/application/new'
      >
        Crea Applicazione
      </Link>
    </div>
  );
}
