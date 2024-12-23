"use client";
import React, { useState, useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedApiKey = localStorage.getItem("API_KEY");
    if (!storedApiKey) {
      setShowModal(true);
    } else {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (inputValue.trim() === "") return;
    localStorage.setItem("API_KEY", inputValue);
    setApiKey(inputValue);
    setShowModal(false);
  };

  return (
    <div>
      {children}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter API Key</h2>
            <p className="text-sm text-gray-600 mb-4">
              Please enter your API key to continue. It will be securely stored in your browser.
            </p>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter API Key"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
