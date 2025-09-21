'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  User,
  Settings,
  GitBranch,
  TestTube,
  LogIn,
  LogOut,
  Save,
  Send,
  RotateCcw
} from 'lucide-react';

interface SidebarSectionProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}

const GoogleArrowDown = () => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5H7z" />
      </svg>

    </div>
  )
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options, placeholder, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-sm text-left bg-gray-800 border border-gray-600 rounded hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-200 flex justify-between items-center"
      >
        <span className={value ? 'text-gray-200' : 'text-gray-500'}>
          {value ? options.find(opt => opt.value === value)?.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <GoogleArrowDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-[9999] mt-1 bg-gray-800 border border-gray-600 rounded shadow-2xl max-h-48 overflow-y-auto"
              style={{
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 10px 20px -5px rgba(0, 0, 0, 0.5)',
                position: 'absolute',
                zIndex: 9999
              }}
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 text-sm text-left text-gray-200 hover:bg-gray-700 transition-colors duration-150 border-b border-gray-700/50 last:border-b-0 ${index === 0 ? 'rounded-t' : ''
                    } ${index === options.length - 1 ? 'rounded-b' : ''
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  icon: Icon,
  isOpen,
  onClick,
  children,
}) => {
  return (
    <div className="border-b border-gray-700/50 relative">
      <motion.div
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-700/30 transition-colors duration-200 relative z-10"
        onClick={onClick}
        whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.3)' }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2 text-gray-300">
          <Icon size={16} />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={14} className="text-gray-500" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-visible relative z-20"
          >
            <div className="px-3 pb-3 bg-gray-800/10 relative z-20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UserAuthentication: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isLoggedIn ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors duration-200"
          />
          <motion.button
            onClick={() => setIsLoggedIn(true)}
            className="w-full px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!email || !password}
          >
            <LogIn size={16} />
            Login
          </motion.button>
        </>
      ) : (
        <div className="space-y-3">
          <div className="p-2 bg-green-900/20 border border-green-700/50 rounded text-green-300 text-sm">
            Logged in as: {email || 'user@example.com'}
          </div>
          <motion.button
            onClick={() => {
              setIsLoggedIn(false);
              setEmail('');
              setPassword('');
            }}
            className="w-full px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={16} />
            Logout
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

const ProjectConfiguration: React.FC = () => {
  const [project, setProject] = useState('');
  const [testType, setTestType] = useState('');

  const projectOptions = [
    { value: 'project1', label: 'My Web App' },
    { value: 'project2', label: 'Mobile App' },
    { value: 'project3', label: 'API Service' },
    { value: 'project4', label: 'Desktop Application' },
  ];

  const testTypeOptions = [
    { value: 'unit', label: 'Unit Tests' },
    { value: 'integration', label: 'Integration Tests' },
    { value: 'e2e', label: 'End-to-End Tests' },
    { value: 'performance', label: 'Performance Tests' },
  ];

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Dropdown
        value={project}
        onChange={setProject}
        options={projectOptions}
        placeholder="Select Project"
      />

      <Dropdown
        value={testType}
        onChange={setTestType}
        options={testTypeOptions}
        placeholder="Select Test Type"
      />

      <motion.button
        className={`w-full px-3 py-2 text-sm rounded transition-colors duration-200 flex items-center justify-center gap-2 ${project && testType
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        whileHover={project && testType ? { scale: 1.02 } : {}}
        whileTap={project && testType ? { scale: 0.98 } : {}}
        disabled={!project || !testType}
      >
        <Save size={16} />
        Save Configuration
      </motion.button>
    </motion.div>
  );
};

const CodeChanges: React.FC = () => {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        className="w-full px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Send size={16} />
        Send Result
      </motion.button>

      <motion.button
        className="w-full px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors duration-200 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <RotateCcw size={16} />
        Refresh
      </motion.button>
    </motion.div>
  );
};

const TestResults: React.FC = () => {
  return (
    <motion.div
      className="p-6 text-center text-gray-500"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <TestTube size={32} className="mx-auto mb-3" />
      </motion.div>
      <p className="text-sm mb-1">Test results will appear here</p>
      <p className="text-xs text-gray-600">Feature coming soon...</p>
    </motion.div>
  );
};

const Sidebar: React.FC = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    userAuth: false,
    projectConfig: false,
    codeChanges: false,
    testResults: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      key: 'userAuth',
      title: 'User Authentication',
      icon: User,
      component: <UserAuthentication />,
    },
    {
      key: 'projectConfig',
      title: 'Project Configuration',
      icon: Settings,
      component: <ProjectConfiguration />,
    },
    {
      key: 'codeChanges',
      title: 'Code Changes',
      icon: GitBranch,
      component: <CodeChanges />,
    },
    {
      key: 'testResults',
      title: 'Test Results',
      icon: TestTube,
      component: <TestResults />,
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900 text-gray-300 h-screen flex flex-col shadow-2xl">
      {/* Header */}
      <motion.div
        className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-800/60"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Caffetest-Tracker
        </h1>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
        {sections.map((section, index) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <SidebarSection
              title={section.title}
              icon={section.icon}
              isOpen={openSections[section.key]}
              onClick={() => toggleSection(section.key)}
            >
              {section.component}
            </SidebarSection>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="px-3 py-2 border-t border-gray-700/50 bg-gray-800/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-xs text-gray-500">Made By Nexly</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;