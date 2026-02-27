/**
 * ModulePage.jsx - Single component for all 17 modules
 * 
 * This component replaces Module1.jsx through Module17.jsx
 * It dynamically loads module data based on the URL parameter
 */

import { useParams } from 'react-router-dom';
import ModuleComponent from './components/ModuleComponent';
import {
  module1Data,
  module2Data,
  module3Data,
  module4Data,
  module5Data,
  module6Data,
  module7Data,
  module8Data,
  module9Data,
  module10Data,
  module11Data,
  module12Data,
  module13Data,
  module14Data,
  module15Data,
  module16Data,
  module17Data,
} from './constants/modules';

// Module data mapping - add all modules here as you create their constants
const MODULES_MAP = {
  1: module1Data,
  2: module2Data,
  3: module3Data,
  4: module4Data,
  5: module5Data,
  6: module6Data,
  7: module7Data,
  8: module8Data,
  9: module9Data,
  10: module10Data,
  11: module11Data,
  12: module12Data,
  13: module13Data,
  14: module14Data,
  15: module15Data,
  16: module16Data,
  17: module17Data,
};

export default function ModulePage({ theme = 'dark' }) {
  const { moduleId } = useParams();
  const moduleData = MODULES_MAP[parseInt(moduleId)];

  if (!moduleData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        <div className={`text-center p-8 rounded-lg ${theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-xl'}`}>
          <h1 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Module Not Found
          </h1>
          <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Module {moduleId} is not available.
          </p>
          <a
            href="/modules"
            className={`px-6 py-2 rounded-lg transition ${theme === 'light'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Back to Modules
          </a>
        </div>
      </div>
    );
  }

  return <ModuleComponent theme={theme} moduleData={moduleData} />;
}
