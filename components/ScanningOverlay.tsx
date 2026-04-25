"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldCheck, Zap, Smartphone, Search } from "lucide-react";

const STEPS = [
    { label: "Establishing secure connection...", icon: ShieldCheck },
    { label: "Measuring Time to First Byte (TTFB)...", icon: Zap },
    { label: "Rendering DOM tree analysis...", icon: Activity },
    { label: "Testing mobile viewport responsive nodes...", icon: Smartphone },
    { label: "Scanning SEO & OpenGraph integrity...", icon: Search },
    { label: "Calculating estimated revenue leakage...", icon: Activity },
];

export default function ScanningOverlay() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md">
            <div className="w-full max-w-md p-8 text-center">
                {/* EKG Heartbeat Animation */}
                <div className="relative mb-12 flex items-center justify-center">
                    <div className="absolute h-32 w-32 animate-ping rounded-full bg-red-100 opacity-20"></div>
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-red-600 shadow-xl shadow-red-200">
                        <Activity className="h-10 w-10 text-white animate-pulse" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900">Surgical Diagnosis in Progress</h3>
                <p className="mt-2 text-sm text-slate-500">Please do not refresh. Probing technical vitals...</p>

                <div className="mt-10 space-y-4 text-left">
                    {STEPS.map((step, idx) => {
                        const Icon = step.icon;
                        const isCurrent = idx === currentStep;
                        const isPast = idx < currentStep;

                        return (
                            <div
                                key={step.label}
                                className={`flex items-center gap-4 transition-all duration-500 ${isCurrent ? "opacity-100 scale-100" : isPast ? "opacity-40 scale-95" : "opacity-10 scale-90"
                                    }`}
                            >
                                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isCurrent ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-400"}`}>
                                    <Icon className={`h-4 w-4 ${isCurrent ? "animate-bounce" : ""}`} />
                                </div>
                                <span className={`text-sm font-medium ${isCurrent ? "text-slate-900" : "text-slate-500"}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Progress Bar */}
                <div className="mt-12 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full bg-red-600 transition-all duration-1000 ease-out"
                        style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
