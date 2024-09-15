"use client"

import React, { useState, useRef, useEffect } from 'react';
import { X, Paperclip, Send } from 'lucide-react';

const MessageModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const messageBox = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (messageBox.current && !messageBox.current.contains(event.target as Node)) {
      onClose()
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const quickReplies = [
    "Hey Masood U., can you help me with...",
    "Would it be possible to get a custom offer for...",
    "Do you think you can deliver an order by..."
  ];

  const handleQuickReply = (reply:any) => {
    setMessage(reply);
  };

  const handleMessageChange = (e:any) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e:any) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (message.length >= 40 && message.length <=250) {
      const formData = new FormData();
      formData.append('message', message);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      console.log('Form data ready to be sent:', formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={messageBox} className="bg-white rounded-lg shadow-xl md:w-[450px] w-[96%] h-[450px] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img src="/cwmlogo.png" alt="Logo" className="w-8 h-8 mr-2" />
            <h2 className="text-lg font-semibold">Message Masood U.</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-grow p-4 overflow-y-auto">
          <textarea
            className="w-full h-32 p-2 border border-gray-300 outline-none rounded-lg resize-none"
            placeholder="Ask Masood U. a question or share your project details (requirements, timeline, budget, etc.)"
            value={message}
            onChange={handleMessageChange}
          />
          <div className="text-right text-sm text-gray-500">
            {message.length}/250
          </div>
          
          <div className="my-4 space-y-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="text-sm border border-gray-400 text-start rounded-full hover:bg-gray-100 px-3 py-2 mr-2 my-2"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-4 flex items-center">
          <div className="flex-grow flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <Paperclip size={20} />
            </button>
            {selectedFile && (
              <span className="text-sm text-gray-600">{selectedFile.name}</span>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={message.length < 40}
            className={`flex items-center justify-center px-4 py-2 rounded ${
              message.length >= 40 && message.length <=250
                ? 'bg-primary text-white hover:bg-black'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send size={16} className="mr-2" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;