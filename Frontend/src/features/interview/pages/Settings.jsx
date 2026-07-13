import React from "react";
import { useNavigate } from "react-router";
import AppLayout from "../layouts/AppLayout";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <AppLayout activeNav="Settings">
      <div className="flex flex-1 items-center justify-center py-5 sm:py-12">
        <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12151C]/90 backdrop-blur-xl p-5 sm:p-12 text-center">
          {/* Glow */}
          <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl" />

          {/* Icon */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-400/10 text-5xl">
            ⚙️
          </div>

          {/* Title */}
          <h1 className="relative mt-6 text-3xl sm:text-4xl font-bold text-slate-50">
            Coming Soon
          </h1>

          {/* Description */}
          <p className="relative mt-4 text-sm sm:text-base leading-7 text-slate-400 max-w-md mx-auto">
            The{" "}
            <span className="font-semibold text-teal-400">
              Settings
            </span>{" "}
            page is currently under development.
            <br />
            New customization options and preferences will be available soon.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/home")}
            className="relative mt-8 inline-flex items-center justify-center rounded-lg bg-teal-400 px-6 py-3 text-sm font-semibold text-[#0B0D12] transition-all duration-200 hover:bg-teal-300 active:scale-95"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;