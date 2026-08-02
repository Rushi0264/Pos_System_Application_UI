import React from "react";
import { RefreshCw, Database } from "lucide-react";

const DashboardHeader = ({
  title,
  subtitle,
  loading,
  onRefresh,
  isDemo = false,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-500 text-sm mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {isDemo && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-yellow-200 bg-yellow-50">
            <Database
              size={16}
              className="text-yellow-600"
            />

            <span className="text-sm font-medium text-yellow-700">
              Demo Data
            </span>
          </div>
        )}

        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
        >
          <RefreshCw
            size={18}
            className={loading ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;