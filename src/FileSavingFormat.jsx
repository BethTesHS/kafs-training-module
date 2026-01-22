// src/FileSavingFormat.jsx
import React, { useState } from "react";
import { 
  FaFolder, FaFolderOpen, FaChevronRight, FaArrowLeft
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FileExplorer = ({ onFolderSelect, selectedFolder }) => {
  const [openFolders, setOpenFolders] = useState(new Set(["Client Name", "Project Name", "Project Start Year"]));

  const toggleFolder = (folderName) => {
    const newOpenFolders = new Set(openFolders);
    if (newOpenFolders.has(folderName)) {
      newOpenFolders.delete(folderName);
    } else {
      newOpenFolders.add(folderName);
    }
    setOpenFolders(newOpenFolders);
  };

  const handleFolderClick = (folderName) => {
    onFolderSelect?.(folderName);
  };

  const FileItem = ({ name, type = "folder", children, level = 0 }) => {
    const isFolder = type === "folder";
    const isOpen = openFolders.has(name);
    const isSelected = selectedFolder === name;

    return (
      <div className={level > 0 ? "ml-6" : ""}>
        <div 
          className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 border ${
            isSelected
              ? 'bg-blue-500/20 border-blue-400/40 shadow-lg'
              : 'hover:bg-white/10 border-transparent hover:border-gray-500/30'
          }`}
          onClick={() => {
            if (isFolder) {
              toggleFolder(name);
              handleFolderClick(name);
            }
          }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400"
          >
            <FaChevronRight className="w-3 h-3" />
          </motion.span>
          
          <span className="text-gray-300">
            {isOpen ? (
              <FaFolderOpen className={isSelected ? "text-blue-400" : "text-yellow-400"} />
            ) : (
              <FaFolder className={isSelected ? "text-blue-400" : "text-yellow-400"} />
            )}
          </span>
          
          <span className={`font-medium text-sm ${isSelected ? 'text-blue-300' : 'text-white'}`}>
            {name}
          </span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/10 rounded-2xl p-6 font-sans shadow-2xl backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
          📁 File Explorer
        </h3>
      </div>
      
      <div className="space-y-1">
        <FileItem name="Client Name" type="folder" level={0}>
          <FileItem name="Project Name" type="folder" level={1}>
            <FileItem name="Project Start Year" type="folder" level={2}>
              {/* Admin Folder */}
              <FileItem name="Admin" type="folder" level={3}>
                <FileItem name="Agreements" type="folder" level={4}>
                  <FileItem name="MOU" type="folder" level={5} />
                  <FileItem name="Contract" type="folder" level={5} />
                  <FileItem name="SLA" type="folder" level={5} />
                  <FileItem name="NDA" type="folder" level={5} />
                </FileItem>
                <FileItem name="Billing" type="folder" level={4}>
                  <FileItem name="Invoices" type="folder" level={5}>
                    <FileItem name="Invoice" type="folder" level={6} />
                  </FileItem>
                  <FileItem name="Payment" type="folder" level={5} />
                  <FileItem name="WHT" type="folder" level={5} />
                </FileItem>
                <FileItem name="Correspondence" type="folder" level={4} />
              </FileItem>

              {/* Data Folder */}
              <FileItem name="Data" type="folder" level={3}>
                <FileItem name="Data Received" type="folder" level={4} />
                <FileItem name="Data Requested" type="folder" level={4} />
                <FileItem name="Data Used" type="folder" level={4} />
              </FileItem>

              {/* Proposal Folder */}
              <FileItem name="Proposal" type="folder" level={3}>
                <FileItem name="Tender" type="folder" level={4} />
                <FileItem name="EQI" type="folder" level={4} />
              </FileItem>

              {/* Reports Folder */}
              <FileItem name="Reports" type="folder" level={3}>
                <FileItem name="Final Report" type="folder" level={4} />
                <FileItem name="Draft Report" type="folder" level={4} />
                <FileItem name="Inception Report" type="folder" level={4} />
              </FileItem>

              {/* Working File and Presentations */}
              <FileItem name="Working File" type="folder" level={3} />
              <FileItem name="Presentations" type="folder" level={3} />
            </FileItem>
          </FileItem>
        </FileItem>
      </div>
    </div>
  );
};

// Sequential Folder Navigation Component for the right panel
const SequentialFolderView = ({ currentFolder, onFolderSelect, selectedFolder, onBack }) => {
  // Folder structure data with folder relationships
  const folderHierarchy = {
    "Client Name": {
      folders: ["Project Name"],
      parent: null
    },
    "Project Name": {
      folders: ["Project Start Year"],
      parent: "Client Name"
    },
    "Project Start Year": {
      folders: ["Admin", "Data", "Proposal", "Reports", "Working File", "Presentations"],
      parent: "Project Name"
    },
    "Admin": {
      folders: ["Agreements", "Billing", "Correspondence"],
      parent: "Project Start Year"
    },
    "Agreements": {
      folders: ["MOU", "Contract", "SLA", "NDA"],
      parent: "Admin"
    },
    "MOU": {
      folders: [],
      parent: "Agreements"
    },
    "Contract": {
      folders: [],
      parent: "Agreements"
    },
    "SLA": {
      folders: [],
      parent: "Agreements"
    },
    "NDA": {
      folders: [],
      parent: "Agreements"
    },
    "Billing": {
      folders: ["Invoices", "Payment", "WHT"],
      parent: "Admin"
    },
    "Invoices": {
      folders: ["Invoice"],
      parent: "Billing"
    },
    "Invoice": {
      folders: [],
      parent: "Invoices"
    },
    "Payment": {
      folders: [],
      parent: "Billing"
    },
    "WHT": {
      folders: [],
      parent: "Billing"
    },
    "Correspondence": {
      folders: [],
      parent: "Admin"
    },
    "Data": {
      folders: ["Data Received", "Data Requested", "Data Used"],
      parent: "Project Start Year"
    },
    "Data Received": {
      folders: [],
      parent: "Data"
    },
    "Data Requested": {
      folders: [],
      parent: "Data"
    },
    "Data Used": {
      folders: [],
      parent: "Data"
    },
    "Proposal": {
      folders: ["Tender", "EQI"],
      parent: "Project Start Year"
    },
    "Tender": {
      folders: [],
      parent: "Proposal"
    },
    "EQI": {
      folders: [],
      parent: "Proposal"
    },
    "Reports": {
      folders: ["Final Report", "Draft Report", "Inception Report"],
      parent: "Project Start Year"
    },
    "Final Report": {
      folders: [],
      parent: "Reports"
    },
    "Draft Report": {
      folders: [],
      parent: "Reports"
    },
    "Inception Report": {
      folders: [],
      parent: "Reports"
    },
    "Working File": {
      folders: [],
      parent: "Project Start Year"
    },
    "Presentations": {
      folders: [],
      parent: "Project Start Year"
    }
  };

  const currentFolderData = folderHierarchy[currentFolder] || { folders: [] };

  return (
    <div className="space-y-6">
      {/* Folder Contents */}
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
        {currentFolderData.folders.length > 0 ? (
          <div className="space-y-2">
            {currentFolderData.folders.map((folderName, index) => (
              <motion.div
                key={folderName}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                    selectedFolder === folderName
                      ? 'bg-blue-500/20 border-blue-400/40 shadow-lg'
                      : 'bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 hover:border-gray-500'
                  }`}
                  onClick={() => onFolderSelect(folderName)}
                >
                  <FaFolder className="text-yellow-400 text-md" />
                  <span className={`font-medium text-sm ${selectedFolder === folderName ? 'text-blue-300' : 'text-white'}`}>
                    {folderName}
                  </span>
                  <span className="ml-auto text-gray-400 text-xs">
                    {folderHierarchy[folderName]?.folders?.length || 0} items
                  </span>
                  <FaChevronRight className="text-gray-400 w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <FaFolder className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">This folder is empty</p>
            <p className="text-xs text-gray-500">No subfolders available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function FileSavingFormat() {
  const [selectedFolder, setSelectedFolder] = useState("Project Start Year");
  const [currentFolder, setCurrentFolder] = useState("Project Start Year");
  const [navigationStack, setNavigationStack] = useState(["Client Name", "Project Name", "Project Start Year"]);

  // Function to get the full path for any folder
  const getFullPath = (folderName) => {
    const folderHierarchy = {
      "Client Name": null,
      "Project Name": "Client Name",
      "Project Start Year": "Project Name",
      "Admin": "Project Start Year",
      "Agreements": "Admin",
      "MOU": "Agreements",
      "Contract": "Agreements",
      "SLA": "Agreements",
      "NDA": "Agreements",
      "Billing": "Admin",
      "Invoices": "Billing",
      "Invoice": "Invoices",
      "Payment": "Billing",
      "WHT": "Billing",
      "Correspondence": "Admin",
      "Data": "Project Start Year",
      "Data Received": "Data",
      "Data Requested": "Data",
      "Data Used": "Data",
      "Proposal": "Project Start Year",
      "Tender": "Proposal",
      "EQI": "Proposal",
      "Reports": "Project Start Year",
      "Final Report": "Reports",
      "Draft Report": "Reports",
      "Inception Report": "Reports",
      "Working File": "Project Start Year",
      "Presentations": "Project Start Year"
    };

    const path = [folderName];
    let current = folderName;
    
    while (folderHierarchy[current]) {
      current = folderHierarchy[current];
      path.unshift(current);
    }
    
    return path;
  };

  const handleFolderSelect = (folderName) => {
    setSelectedFolder(folderName);
    setCurrentFolder(folderName);
    const fullPath = getFullPath(folderName);
    setNavigationStack(fullPath);
  };

  const handleBack = () => {
    if (navigationStack.length > 1) {
      const newStack = navigationStack.slice(0, -1);
      const previousFolder = newStack[newStack.length - 1];
      setCurrentFolder(previousFolder);
      setSelectedFolder(previousFolder);
      setNavigationStack(newStack);
    }
  };

  const handleBreadcrumbClick = (folderName, index) => {
    setCurrentFolder(folderName);
    setSelectedFolder(folderName);
    setNavigationStack(navigationStack.slice(0, index + 1));
  };

  return (
    <div
      className="min-h-screen relative text-white"
      style={{
        background: `
          radial-gradient(1000px at 80% 20%, rgba(124,77,255,0.08), transparent 70%),
          radial-gradient(800px at 20% 80%, rgba(0,229,255,0.08), transparent 70%),
          #060A1E
        `,
      }}
    >
      {/* Module Header Bar */}
      <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="ml-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF]">
              File Saving Format
            </h1>
            <div className="text-gray-300 text-sm leading-relaxed max-w-4xl space-y-1">
              <p>Welcome to our standardized file organization system for actuarial projects.</p>
              <p>This structured approach ensures consistency, easy navigation, and efficient collaboration across all client engagements.</p>
              <p>Follow this hierarchy to maintain organized project documentation, from initial agreements to final deliverables.</p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="ml-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - File Explorer */}
            <div className="lg:col-span-1">
              <FileExplorer 
                onFolderSelect={handleFolderSelect}
                selectedFolder={selectedFolder} 
              />
            </div>

            {/* Right Panel - Sequential Folder Navigation */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    {navigationStack.map((segment, index) => (
                      <React.Fragment key={segment}>
                        {index > 0 && <span className="text-gray-500 text-xs">▶</span>}
                        <button 
                          onClick={() => handleBreadcrumbClick(segment, index)}
                          className={`px-2 py-1 rounded transition-colors ${
                            index === navigationStack.length - 1 
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                              : 'hover:bg-gray-700/50'
                          }`}
                        >
                          {segment}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Sequential Folder View */}
                <SequentialFolderView
                  currentFolder={currentFolder}
                  onFolderSelect={handleFolderSelect}
                  selectedFolder={selectedFolder}
                  onBack={handleBack}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}