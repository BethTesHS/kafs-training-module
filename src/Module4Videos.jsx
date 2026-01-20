import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, FileVideo } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Module4Videos({ theme = 'dark' }) {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const aosInitialized = useRef(false);

  useEffect(() => {
    if (!aosInitialized.current) {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
      });
      aosInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (aosInitialized.current) {
      AOS.refresh();
    }
  }, [theme, selectedVideo]);

  // Theme-based styles
  const getThemeStyles = () => {
    if (theme === 'light') {
      return {
        bg: 'bg-white/95',
        cardBg: 'bg-white/95',
        text: 'text-gray-900',
        textSecondary: 'text-gray-700',
        textTertiary: 'text-gray-600',
        border: 'border-gray-200',
        hover: 'hover:bg-white',
        inputBg: 'bg-white/90',
        shadow: 'shadow-2xl shadow-orange-500/10',
        accent: 'text-orange-600',
        accentBg: 'bg-orange-50/80',
        accentBorder: 'border-orange-200/50',
        accentHover: 'hover:bg-orange-100/80',
        gradientText: 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent',
        transition: 'transition-all duration-300 ease-in-out'
      };
    }
    return {
      bg: 'bg-transparent',
      cardBg: 'bg-black/65',
      text: 'text-white',
      textSecondary: 'text-white',
      textTertiary: 'text-gray-100',
      border: 'border-white/10',
      hover: 'hover:bg-white/10',
      inputBg: 'bg-white/5',
      shadow: 'shadow-xl',
      accent: 'text-orange-400',
      accentBg: 'bg-orange-500/20',
      accentBorder: 'border-orange-400/30',
      accentHover: 'hover:bg-orange-500/30',
      gradientText: 'text-orange-400',
      transition: 'transition-all duration-300 ease-in-out'
    };
  };

  const styles = getThemeStyles();

  // List of training videos - update this with actual video filenames
  const trainingVideos = [
    {
      id: 1,
      title: "Uploading Data",
      filename: "Vid1 - Uploading Data.mp4",
      description: "Learn how to upload and prepare data for reserve valuation"
    },
    {
      id: 2,
      title: "Claim Plots",
      filename: "Vid2 - Claim plots.mp4",
      description: "Understanding claim development patterns and visualization"
    },
    {
      id: 3,
      title: "Extending Model Part 1",
      filename: "Vid3 - Extending Model Part 1.mp4",
      description: "Advanced modeling techniques for reserve valuation"
    },
    {
      id: 6,
      title: "Extending Model Part 2",
      filename: "Vid6 - Extending Model Part 2_rev.mp4",
      description: "Continued advanced modeling techniques and extensions"
    }
  ];

  const videoBasePath = "/Training Modules/Module-4-General-Insurance-Valuation/Training Video";

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleBack = () => {
    navigate('/modules/4');
  };

  return (
    <div className={`min-h-screen relative ${styles.transition}`}>
      {/* Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url('/src/assets/bground.jpg')`,
        }}
      >
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.26) 0%, rgba(245, 159, 11, 0.49) 100%)'
              : 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(251, 146, 60, 0.4) 50%, rgba(245, 158, 11, 0.35) 100%)',
            backdropFilter: theme === 'dark' ? 'blur(3px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 py-8 ${styles.transition}`}>
        {/* Back Button - Outside Card */}
        <div className="mb-4">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme === 'light'
              ? 'bg-white/90 text-gray-900 hover:bg-white shadow-md'
              : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              } transition-all duration-200 font-medium ${styles.transition}`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Module 4</span>
          </button>
        </div>

        {/* Video Player Section */}
        {selectedVideo ? (
          <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 md:p-8 mb-6 ${styles.transition}`} data-aos="fade-up">
            <div className="mb-6">
              <button
                onClick={() => setSelectedVideo(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme === 'light'
                  ? 'bg-white/90 text-gray-900 hover:bg-white shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                  } transition-all duration-200 font-medium ${styles.transition}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Video List</span>
              </button>
            </div>
            <div className="mb-6">
              <h2 className={`text-xl md:text-2xl font-bold ${styles.text} mb-3 ${styles.transition}`}>
                {selectedVideo.title}
              </h2>
              <p className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                {selectedVideo.description}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden bg-black shadow-2xl">
              {selectedVideo.filename.endsWith('.mp3') ? (
                <audio
                  controls
                  className="w-full"
                  style={{ padding: '20px' }}
                >
                  <source src={`${videoBasePath}/${selectedVideo.filename}`} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              ) : (
                <video
                  controls
                  className="w-full h-auto"
                  style={{ maxHeight: '75vh' }}
                  preload="metadata"
                >
                  <source src={`${videoBasePath}/${selectedVideo.filename}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        ) : (
          /* Combined Training Videos Header and Video List */
          <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 md:p-8 ${styles.transition}`} data-aos="fade-up">
            {/* Header Section */}
            <div className="mb-6 pb-6 border-b ${styles.border}">
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className={`inline-block p-4 rounded-full ${theme === 'light'
                  ? 'bg-gradient-to-br from-orange-400 to-amber-500'
                  : 'bg-orange-500/30 border border-orange-400/40'
                  } ${styles.transition} flex-shrink-0`}>
                  <FileVideo className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-orange-300'} ${styles.transition}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent bg-origin-padding'
                    : 'text-orange-400'
                    } ${styles.transition}`}>
                    Training Videos
                  </h1>
                  <p className={`text-sm md:text-base mt-2 ${styles.textSecondary} ${styles.transition}`}>
                    Watch comprehensive training videos on Valuation, Discounting and Risk Margin Analysis
                  </p>
                </div>
              </div>
            </div>

            {/* Video List */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {trainingVideos.map((video, index) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className={`rounded-2xl p-5 md:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${theme === 'light'
                      ? 'bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/50 hover:border-orange-300 hover:shadow-lg shadow-md'
                      : 'bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-400/30 hover:border-orange-400/50 hover:bg-orange-500/30 hover:shadow-lg shadow-md'
                      } ${styles.transition}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-4 md:p-5 rounded-xl ${theme === 'light'
                        ? 'bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg'
                        : 'bg-gradient-to-br from-orange-500/40 to-amber-500/40 shadow-lg'
                        } ${styles.transition}`}>
                        <Play className={`w-8 h-8 md:w-10 md:h-10 text-white ${styles.transition}`} fill="currentColor" />
                      </div>
                    </div>
                    <h3 className={`font-bold text-base md:text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2 ${styles.transition}`}>
                      {video.title}
                    </h3>
                    <p className={`text-xs md:text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} ${styles.transition}`}>
                      {video.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
