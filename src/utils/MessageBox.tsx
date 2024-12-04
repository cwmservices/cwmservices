"use client"

import React, { useState, useRef, useEffect } from 'react';
import { X, Paperclip, Send } from 'lucide-react';
import {apiURL} from '../custom/api'

const MessageModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const messageBox = useRef(null);

  const handleClickOutside = (event:any) => {
    if (messageBox.current && !messageBox.current.contains(event.target)) {
      onClose();
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

  const handleQuickReply = (reply) => {
    setMessage(reply);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (validateEmail(email) && message.length >= 40 && message.length <= 250) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('email', email);
      formData.append('message', message);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      
      try {
        const response = await fetch(`${apiURL}/submit-quote`, {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          setIsSuccess(true);
          setEmail('');
          setMessage('');
          setSelectedFile(null);
        } else {
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={messageBox} className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-xl md:w-[450px] w-[96%] max-h-[90vh] flex flex-col">
        {!isSuccess ? (
          <>
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center">
                <img src="/cwmlogo.png" alt="Logo" className="w-8 rounded-full h-8 mr-2" />
                <h2 className="text-lg font-semibold">Message Masood U.</h2>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Contact Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full p-2 border bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              <textarea
                className={`dark:bg-gray-800 bg-gray-100 ${message.length < 40 ? 'border-red-500' : 'border-gray-300'} w-full h-32 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out`}
                placeholder="Ask Masood U. a question or share your project details (requirements, timeline, budget, etc.)"
                value={message}
                onChange={handleMessageChange}
              />
              {message.length <40 && <p className="text-red-500 text-sm mt-1">Message length should be greater than 40</p>}
              <div className="text-right text-sm text-gray-500">
                {message.length}/250
              </div>
              
              <div className="my-4 space-y-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-sm border border-gray-400 text-start rounded-full dark:hover:bg-gray-900 hover:bg-gray-100 px-3 py-2 mr-2 my-2 transition duration-200 ease-in-out"
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
                  className="text-gray-500 hover:text-gray-700 mr-2 transition duration-200 ease-in-out"
                >
                  <Paperclip size={20} />
                </button>
                {selectedFile && (
                  <span className="text-sm text-gray-600">{selectedFile.name}</span>
                )}
              </div>
              <button
                onClick={handleSubmit}
                disabled={!validateEmail(email) || message.length < 40 || isLoading}
                className={`flex items-center justify-center px-4 py-2 rounded ${
                  validateEmail(email) && message.length >= 40 && message.length <= 250 && !isLoading
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition duration-200 ease-in-out`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-primary">Thank You!</h2>
            <p className="mb-6 text-gray-700">
              I have received your quote offer and will get back to you via the provided email as soon as possible.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageModal;