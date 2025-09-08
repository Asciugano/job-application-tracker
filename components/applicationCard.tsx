"use client";

import { Application, Status } from "@/lib/prisma";
import { Calendar, MapPin, StickyNote } from "lucide-react";

export default function ApplicationCard({ application }: { application: Application }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-4">
      {/* Company + Position */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {application.position}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{application.company}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${application.status === Status.APPLIED
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            : application.status === Status.INTERVIEW
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : application.status === Status.OFFER
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
        >
          {application.status}
        </span>
      </div>

      {/* Location */}
      {application.location && (
        <div className="flex items-center mt-3 text-gray-600 dark:text-gray-400">
          <MapPin size={16} className="mr-2" />
          <span>{application.location}</span>
        </div>
      )}

      {/* Dates */}
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <div className="flex items-center">
          <Calendar size={14} className="mr-2" />
          <span>Applied: {new Date(application.appliedAt).toISOString().split("T")[0]}</span>
        </div>
        {application.deadline && (
          <div className="flex items-center">
            <Calendar size={14} className="mr-2" />
            <span>Deadline: {new Date(application.deadline).toISOString().split("T")[0]}</span>
          </div>
        )}
      </div>

      {/* Notes */}
      {application.notes && (
        <div className="flex items-start mt-3 text-gray-600 dark:text-gray-300">
          <StickyNote size={16} className="mr-2 mt-1" />
          <p className="text-sm">{application.notes}</p>
        </div>
      )}
    </div>
  );
}
