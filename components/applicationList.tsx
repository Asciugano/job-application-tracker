import { Application } from "@/lib/prisma";
import ApplicationCard from "./applicationCard";

interface Props {
  applications: Application[],
  limit?: number,
};

export default function ApplicationList({ applications, limit }: Props) {
  return (
    <div className="space-y-4">
      {applications
        .slice(0, limit || applications.length)
        .map((app) => (
          <ApplicationCard key={app.id} application={app} />
        ))}
    </div>
  );
}
