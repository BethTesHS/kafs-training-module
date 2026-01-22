// src/Modules.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Lock, CheckCircle, BookOpen, Award, Play, Clock, Star } from "lucide-react";

// Import images from assets folder
import dataCleanupImg from "./assets/data-cleanup.jpg";
import pricingFundamentalsImg from "./assets/pricing-fundamentals.jpg";
import lrcImg from "./assets/lrc.jpg";
import giValuationsImg from "./assets/gi-valuations.jpg";
import capitalAdequacyImg from "./assets/capital-adequacy.jpg";
import finPerformanceImg from "./assets/financial-performance.jpg";
import premCertificatesImg from "./assets/premium-certificates.jpg";
import reinCertificatesImg from "./assets/reinsuarance-certificates.jpg";
import finConditionImg from "./assets/financial-condition.jpg";
import ordLifeValuationImg from "./assets/ordinary-life.jpg";
import groupBusinessValuationImg from "./assets/business-valuation.jpg";
import daValuationImg from "./assets/da-valuation.jpg";
import ipsImg from "./assets/investment-policy.jpg";
import prmfImg from "./assets/post-retirement.jpg";
import dbdcValuationsImg from "./assets/dbdc-valuations.jpg";
import ias19Img from "./assets/ias-19.jpg";
import ifrs17Img from "./assets/ifrs-17.jpg";

export default function Modules({ theme = 'dark' }) {
  const colors = {
    dark: {
      cyan: "#00E5FF",
      purple: "#7C4DFF",
      blue: "#3B82F6",
      green: "#10B981",
      orange: "#F97316",
      pink: "#E91E63",
      bg: "#060A1E",
      card: "#1A1F2E",
      text: "#FFFFFF",
      textSecondary: "#9CA3AF"
    },
    light: {
      cyan: "#00E5FF",
      purple: "#7C4DFF",
      blue: "#3B82F6",
      green: "#10B981",
      orange: "#F97316",
      pink: "#E91E63",
      bg: "#F8FAFC",
      card: "#FFFFFF",
      text: "#0F172A",
      textSecondary: "#475569"
    }
  };

  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  const specialBanner = {
    id: "ifrs17",
    name: "IFRS 17",
    color: currentColors.orange,
    status: "accessible",
    description: "Master IFRS 17 insurance contracts accounting and implementation. This foundational module provides essential knowledge for all subsequent actuarial training.",
    image: ifrs17Img,
    isSpecial: true
  };

  const modules = [
    {
      id: 1,
      name: "Data Clean Up",
      color: "#9333EA", // Purple-600 to match Module 1 theme
      status: "accessible",
      description: "Learn data validation, cleaning, and standardization techniques for actuarial datasets.",
      image: dataCleanupImg,
      number: "01"
    },
    {
      id: 2,
      name: "Pricing Fundamentals",
      color: "#2563EB", // Blue-600 to match Module 2 theme
      status: "accessible",
      description: "Master the core principles of insurance pricing and risk assessment.",
      image: pricingFundamentalsImg,
      number: "02"
    },
    {
      id: 3,
      name: "Liability for Remaining Coverage (LRC)",
      color: "#10B981", // Green-500 to match Module 3 theme
      status: "accessible",
      description: "Understand LRC calculations and their importance in insurance valuations.",
      image: lrcImg,
      number: "03"
    },
    {
      id: 4,
      name: "General Insurance Valuations (Liability for Incurred Claims)",
      color: "#F97316", // Orange-600 to match Module 4 theme
      status: "accessible",
      description: "Advanced techniques for general insurance liability valuations.",
      image: giValuationsImg,
      number: "04"
    },
    {
      id: 5,
      name: "Capital Adequacy Analysis",
      color: "#06B6D4", // Cyan-600 to match Module 5 theme
      status: "accessible",
      description: "Learn capital adequacy requirements and solvency analysis methods.",
      image: capitalAdequacyImg,
      number: "05"
    },
    {
      id: 6,
      name: "Financial Performance Analysis (Ratio Analysis)",
      color: "#9333EA", // Purple-600 to match Module 6 theme
      status: "accessible",
      description: "Master financial ratio analysis and balance sheet evaluation techniques.",
      image: finPerformanceImg,
      number: "06"
    },
    {
      id: 7,
      name: "Premium Certificates",
      color: "#2563EB", // Blue-600 to match Module 7 theme
      status: "accessible",
      description: "Learn premium certificate preparation and validation processes.",
      image: premCertificatesImg,
      number: "07"
    },
    {
      id: 8,
      name: "Reinsurance Certificates",
      color: "#10B981", // Green-500 to match Module 8 theme
      status: "accessible",
      description: "Understand reinsurance certificate creation and management.",
      image: reinCertificatesImg,
      number: "08"
    },
    {
      id: 9,
      name: "Financial Condition Reporting",
      color: "#F97316", // Orange-600 to match Module 9 theme
      status: "accessible",
      description: "Master financial condition reporting standards and requirements.",
      image: finConditionImg,
      number: "09"
    },
    {
      id: 10,
      name: "Ordinary Life Valuation",
      color: "#E91E63", // Pink-600 to match Module 10 theme
      status: "accessible",
      description: "Learn ordinary life insurance valuation techniques and methodologies.",
      image: ordLifeValuationImg,
      number: "10"
    },
    {
      id: 11,
      name: "Group Business Valuation",
      color: "#9333EA", // Purple-600 to match Module 11 theme
      status: "accessible",
      description: "Understand group business valuation principles and applications.",
      image: groupBusinessValuationImg,
      number: "11"
    },
    {
      id: 12,
      name: "DA Valuation",
      color: "#2563EB", // Blue-600 to match Module 12 theme
      status: "accessible",
      description: "Master deferred acquisition cost valuation and accounting treatment.",
      image: daValuationImg,
      number: "12"
    },
    {
      id: 13,
      name: "Investment Policy Statements (IPS)",
      color: "#10B981", // Green-500 to match Module 13 theme
      status: "accessible",
      description: "Learn investment policy statement development and implementation.",
      image: ipsImg,
      number: "13"
    },
    {
      id: 14,
      name: "Post Retirement Medical Fund",
      color: "#3B82F6", // Blue-500 to match Module 14 theme
      status: "accessible",
      description: "Understand post-retirement medical fund valuation and management.",
      image: prmfImg,
      number: "14"
    },
    {
      id: 15,
      name: "Defined Benefit (DB) & Defined Contribution (DC) Valuations",
      color: "#F97316", // Orange-600 to match Module 15 theme
      status: "accessible",
      description: "Master DB and DC pension scheme valuation and funding assessment.",
      image: dbdcValuationsImg,
      number: "15"
    },
    {
      id: 16,
      name: "IAS 19 Valuation",
      color: "#3B82F6", // Blue-500 to match Module 16 theme
      status: "accessible",
      description: "Learn IAS 19 employee benefits valuation and reporting standards.",
      image: ias19Img,
      number: "16"
    },
    {
      id: 17,
      name: "IFRS 17 Insurance Contracts",
      color: "#06B6D4", // Cyan-500 to match Module 17 theme
      status: "accessible",
      description: "Master end-to-end application of IFRS 17. Learn to classify contracts, select measurement models, calculate fulfilment cash flows, manage CSM, test for onerous contracts, account for reinsurance, and produce compliant financial statements and disclosures.",
      image: ifrs17Img,
      number: "17"
    }
  ];

  const ModuleCard = ({ module, isSpecial = false }) => {
    const baseClasses = "relative rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-md border-2 hover:scale-105 hover:shadow-2xl flex flex-col w-full";

    if (isSpecial) {
      const style = {
        background: theme === 'dark'
          ? `linear-gradient(135deg, ${module.color}20 0%, ${module.color}10 100%)`
          : `linear-gradient(135deg, ${module.color}15 0%, ${module.color}05 100%)`,
        boxShadow: theme === 'dark' ? `0 0 30px ${module.color}40` : `0 0 20px ${module.color}30`,
        borderColor: theme === 'dark' ? `${module.color}60` : `${module.color}40`,
      };

      return (
        <div className={`${baseClasses} h-64 lg:h-72 xl:h-80`} style={style}>
          <Link to={`/modules/${module.id}`} className="h-full flex flex-col group">
            {/* Top Half - Module Image */}
            <div className="h-1/2 relative overflow-hidden">
              <img
                src={module.image}
                alt={module.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Special Banner Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 text-xs rounded-full border flex items-center gap-1"
                  style={{
                    background: theme === 'dark' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(249, 115, 22, 0.2)',
                    color: theme === 'dark' ? '#FED7AA' : '#FED7AA',
                    borderColor: theme === 'dark' ? 'rgba(255, 203, 166, 0.78)' : 'rgba(252, 191, 148, 0.67)'
                  }}>
                  <Star className="w-3 h-3" />
                  Foundation
                </span>
              </div>
            </div>

            {/* Bottom Half - Module Content */}
            <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(to bottom, rgba(26, 31, 46, 0.9), rgba(15, 23, 42, 0.8))'
                  : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9))'
              }}>
              <div>
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <BookOpen className="w-5 h-5 transition-colors"
                    style={{ color: theme === 'dark' ? currentColors.textSecondary : currentColors.text }} />
                  <h3 className="text-xs lg:text-sm font-bold line-clamp-1 transition-colors group-hover:opacity-80"
                    style={{ color: currentColors.text }}>
                    {module.name}
                  </h3>
                </div>

                <p className="text-xs line-clamp-2 lg:line-clamp-3" style={{ color: currentColors.textSecondary }}>
                  {module.description}
                </p>
              </div>

              <div className="mt-2">
                <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden"
                  style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <div className="h-1.5 w-full" style={{ background: currentColors.orange }} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm lg:text-lg font-bold" style={{ color: currentColors.orange }}>Start Here</span>
                  <div className="flex items-center gap-1.5 transition-colors" style={{ color: currentColors.orange }}>
                    <span className="text-xs lg:text-sm font-semibold">Begin</span>
                    <Play className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    }

    if (module.status === "accessible") {
      const style = {
        background: theme === 'dark'
          ? `linear-gradient(135deg, ${module.color}15 0%, ${module.color}05 100%)`
          : `linear-gradient(135deg, ${module.color}10 0%, ${module.color}03 100%)`,
        boxShadow: theme === 'dark' ? `0 0 25px ${module.color}33` : `0 0 15px ${module.color}25`,
        borderColor: theme === 'dark' ? `${module.color}40` : `${module.color}30`,
      };

      return (
        <div className={`${baseClasses} h-64 lg:h-72 xl:h-80`} style={style}>
          <Link to={`/modules/${module.id}`} className="h-full flex flex-col group">
            {/* Top Half - Module Image */}
            <div className="h-1/2 relative overflow-hidden">
              <img
                src={module.image}
                alt={module.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 transition-colors"
                style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)' }} />

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs rounded-full border"
                  style={{
                    background: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)',
                    color: theme === 'dark' ? '#00ff99' : '#04ffaf',
                    borderColor: theme === 'dark' ? 'rgba(124, 250, 208, 0.73)' : 'rgba(119, 255, 210, 0.7)'
                  }}>
                  Accessible
                </span>
              </div>
            </div>

            {/* Bottom Half - Module Content */}
            <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(to bottom, rgba(26, 31, 46, 0.9), rgba(15, 23, 42, 0.8))'
                  : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9))'
              }}>
              <div>
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <BookOpen className="w-5 h-5 transition-colors"
                    style={{ color: theme === 'dark' ? currentColors.textSecondary : currentColors.text }} />
                  <h3 className="text-xs lg:text-sm font-bold line-clamp-1 transition-colors group-hover:opacity-80"
                    style={{ color: currentColors.text }}>
                    {module.name}
                  </h3>
                </div>

                <p className="text-xs line-clamp-2 lg:line-clamp-3" style={{ color: currentColors.textSecondary }}>
                  {module.description}
                </p>
              </div>

              <div className="mt-2">
                <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden"
                  style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <div className="h-1.5 w-1/4" style={{ backgroundColor: module.color }} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm lg:text-base font-semibold"
                    style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                    {module.number}
                  </span>
                  <div className="flex items-center gap-1.5 transition-colors group-hover:opacity-80"
                    style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                    <span className="text-xs lg:text-sm font-semibold">Start</span>
                    <Play className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    } else {
      // Locked modules
      const style = {
        background: theme === 'dark'
          ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
          : 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)',
        border: theme === 'dark' ? '2px solid rgba(239, 68, 68, 0.3)' : '2px solid rgba(239, 68, 68, 0.2)',
        boxShadow: theme === 'dark' ? '0 0 20px rgba(239, 68, 68, 0.1)' : '0 0 15px rgba(239, 68, 68, 0.08)',
      };

      return (
        <div className={`${baseClasses} h-64 lg:h-72 xl:h-80`} style={style}>
          <div className="h-full flex flex-col">
            {/* Top Half - Module Image */}
            <div className="h-1/2 relative overflow-hidden">
              <img
                src={module.image}
                alt={module.name}
                className="w-full h-full object-cover"
                style={{ filter: theme === 'dark' ? 'grayscale(50%)' : 'grayscale(30%)' }}
              />
              <div className="absolute inset-0"
                style={{ background: theme === 'dark' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.03)' }} />

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs rounded-full border"
                  style={{
                    background: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.15)',
                    color: theme === 'dark' ? '#ee5353' : '#DC2626',
                    borderColor: theme === 'dark' ? 'rgba(230, 72, 72, 0.74)' : 'rgba(239, 68, 68, 0.25)'
                  }}>
                  Locked
                </span>
              </div>
            </div>

            {/* Bottom Half - Module Content */}
            <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(to bottom, rgba(26, 31, 46, 0.9), rgba(15, 23, 42, 0.8))'
                  : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9))'
              }}>
              <div>
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <Lock className="w-3 h-3 lg:w-4 lg:h-4"
                    style={{ color: theme === 'dark' ? '#F87171' : '#DC2626' }} />
                  <h3 className="text-xs lg:text-sm font-bold line-clamp-1"
                    style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}>
                    {module.name}
                  </h3>
                </div>

                <p className="text-xs line-clamp-2 lg:line-clamp-3"
                  style={{ color: theme === 'dark' ? 'rgba(156, 163, 175, 0.7)' : 'rgba(100, 116, 139, 0.7)' }}>
                  {module.description}
                </p>
              </div>

              <div className="mt-2">
                <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden"
                  style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                  <div className="h-1.5 w-0"
                    style={{ background: theme === 'dark' ? 'rgba(248, 113, 113, 0.3)' : 'rgba(220, 38, 38, 0.3)' }} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm lg:text-base font-semibold"
                    style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                    {module.number}
                  </span>
                  <Lock className="w-3 h-3 lg:w-4 lg:h-4"
                    style={{ color: theme === 'dark' ? '#F87171' : '#DC2626' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden transition-colors duration-300"
      style={{
        background: theme === 'dark'
          ? `radial-gradient(1000px at 80% 20%, rgba(124,77,255,0.08), transparent 70%),
             radial-gradient(800px at 20% 80%, rgba(0,229,255,0.08), transparent 70%),
             ${currentColors.bg}`
          : `radial-gradient(1000px at 80% 20%, rgba(124,77,255,0.04), transparent 70%),
             radial-gradient(800px at 20% 80%, rgba(0,229,255,0.04), transparent 70%),
             ${currentColors.bg}`,
        color: currentColors.text
      }}
    >

      {/* Module Header Bar */}
      <div className="relative border-b backdrop-blur-xl transition-colors duration-300"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to right, rgba(26, 31, 46, 0.9), rgba(15, 23, 42, 0.9))'
            : 'linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center lg:text-left">
            {/* Simplified gradient with glow */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
              <span className="bg-gradient-to-l bg-clip-text text-transparent"
                style={{
                  backgroundImage: theme === 'dark'
                    ? 'linear-gradient(to right, #00E5FF, #3B82F6)' // Cyan to Blue
                    : 'linear-gradient(to left, #7C4DFF, #3B82F6)', // Purple to Blue
                  textShadow: theme === 'dark'
                    ? '0 0 30px rgba(0, 229, 255, 0.4)' // Cyan glow in dark
                    : '0 0 20px rgba(124, 77, 255, 0.3)' // Purple glow in light
                }}>
                Training Modules
              </span>
            </h1>
            <p className="text-base sm:text-md leading-relaxed max-w-4xl mx-auto lg:mx-0"
              style={{ color: currentColors.textSecondary }}>
              Your structured actuarial learning path. Each module builds on the previous one.
              Complete them in order to unlock advanced content and strengthen your analytical expertise.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl"
          style={{ background: theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)' }}></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl"
          style={{ background: theme === 'dark' ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 229, 255, 0.05)' }}></div>
      </div>

      {/* Module Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Responsive grid - 4 cards on all laptop sizes (1024px and up) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Special IFRS 17 Banner - spans full width on mobile, 2 columns on sm, 1 column on lg+ */}
          <div className="sm:col-span-2 lg:col-span-1">
            <ModuleCard module={specialBanner} isSpecial={true} />
          </div>

          {/* Regular Modules 1-16 - will automatically flow into 4-column layout on laptops */}
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}