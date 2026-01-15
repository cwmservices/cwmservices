"use client"

import React, { useState, useRef, useEffect } from 'react';
import { X, Paperclip, Send } from 'lucide-react';

const MessageModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const messageBox = useRef(null);

  useEffect(() => {
    const submittedEmail = sessionStorage.getItem('quote_form_submitted');
    if (submittedEmail) {
      setHasSubmitted(true);
    }

    const handleBeforeUnload = () => {
      sessionStorage.removeItem('quote_form_submitted');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sessionStorage.removeItem('quote_form_submitted');
        setHasSubmitted(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleClickOutside = (event:any) => {
    if (messageBox.current && !messageBox.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const quickReplies = [
    "Hey Masood U., can you help me with...",
    "Would it be possible to get a custom offer for...",
    "Do you think you can deliver an order by..."
  ];

  const handleQuickReply = (reply) => {
    if (!hasSubmitted) {
      setMessage(reply);
      setMessageError('');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!re.test(String(email).toLowerCase())) {
      return 'Please enter a valid email address';
    }
    if (email.length > 254) {
      return 'Email is too long';
    }
    return '';
  };

  const validateMessage = (msg) => {
    if (!msg.trim()) {
      return 'Message is required';
    }
    if (msg.trim().length < 40) {
      return 'Message must be at least 40 characters';
    }
    if (msg.trim().length > 250) {
      return 'Message must not exceed 250 characters';
    }
    return '';
  };

  const validateFile = (file) => {
    if (!file) return '';
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }
    
    if (!allowedTypes.includes(file.type)) {
      return 'Only image files (JPEG, PNG, GIF, WebP) are allowed';
    }
    
    return '';
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const error = validateEmail(newEmail);
    setEmailError(error);
  };

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    if (newMessage.length <= 250) {
      setMessage(newMessage);
      const error = validateMessage(newMessage);
      setMessageError(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        setSelectedFile(null);
        e.target.value = '';
      } else {
        setFileError('');
        setSelectedFile(file);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (hasSubmitted) {
      setSubmitError('You have already submitted a quote in this session.');
      return;
    }

    const emailErr = validateEmail(email);
    const messageErr = validateMessage(message);
    const fileErr = selectedFile ? validateFile(selectedFile) : '';

    setEmailError(emailErr);
    setMessageError(messageErr);
    setFileError(fileErr);

    if (emailErr || messageErr || fileErr) {
      return;
    }

    setIsLoading(true);
    setSubmitError('');

    const formData = new FormData();
    formData.append('email', email.trim().toLowerCase());
    formData.append('message', message.trim());
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    
    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        sessionStorage.setItem('quote_form_submitted', email.trim().toLowerCase());
        setHasSubmitted(true);
        
        setIsSuccess(true);
        setEmail('');
        setMessage('');
        setSelectedFile(null);
        setEmailError('');
        setMessageError('');
        setFileError('');
      } else {
        setSubmitError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={messageBox} className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-xl md:w-[450px] w-full max-h-[90vh] flex flex-col">
        {!isSuccess ? (
          <>
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <img src="/cwmlogo.png" alt="Logo" className="w-8 rounded-full h-8 mr-2" />
                <h2 className="text-lg font-semibold">Message Masood U.</h2>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                disabled={isLoading}
              >
                <X size={20} />
              </button>
            </div>

            {hasSubmitted && (
              <div className="mx-4 mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  You have already submitted a quote request in this session. Session resets when you close or switch tabs.
                </p>
              </div>
            )}

            {submitError && (
              <div className="mx-4 mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-sm">{submitError}</p>
              </div>
            )}

            <div className="flex-grow p-4 overflow-y-auto">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Contact Email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={hasSubmitted}
                  className={`w-full text-gray-900 dark:text-gray-200 p-2 border bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                    emailError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } ${hasSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>

              <textarea
                className={`dark:bg-gray-800 text-gray-900 dark:text-gray-200 bg-gray-100 w-full h-32 p-2 border rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                  messageError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } ${hasSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Ask Masood U. a question or share your project details (requirements, timeline, budget, etc.)"
                value={message}
                onChange={handleMessageChange}
                disabled={hasSubmitted}
              />
              {messageError && <p className="text-red-500 text-sm mt-1">{messageError}</p>}
              <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                {message.length}/250
              </div>
              
              <div className="my-4 space-y-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    disabled={hasSubmitted}
                    className={`text-sm border border-gray-400 dark:border-gray-600 text-start rounded-full px-3 py-2 mr-2 my-2 transition ${
                      hasSubmitted 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'dark:hover:bg-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center">
              <div className="flex-grow flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                  disabled={hasSubmitted}
                />
                <button
                  onClick={() => !hasSubmitted && fileInputRef.current?.click()}
                  disabled={hasSubmitted}
                  className={`text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mr-2 transition ${
                    hasSubmitted ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  title="Attach image (max 5MB)"
                >
                  <Paperclip size={20} />
                </button>
                {selectedFile && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
                      {selectedFile.name}
                    </span>
                    <button
                      onClick={handleRemoveFile}
                      className="text-red-500 hover:text-red-700 text-xs"
                      disabled={hasSubmitted}
                    >
                      Remove
                    </button>
                  </div>
                )}
                {fileError && (
                  <span className="text-red-500 text-xs ml-2">{fileError}</span>
                )}
              </div>
              <button
                onClick={handleSubmit}
                disabled={hasSubmitted || isLoading || !!emailError || !!messageError || message.length < 40}
                className={`flex items-center justify-center px-4 py-2 rounded transition ${
                  !hasSubmitted && !isLoading && !emailError && !messageError && message.length >= 40
                    ? 'bg-primary text-white opacity-90 hover:opacity-100'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
                }`}
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
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-orange-500">Thank You!</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              I have received your quote request and will get back to you via the provided email as soon as possible.
            </p>
            <button
              onClick={handleCloseSuccess}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg opacity-90 hover:opacity-100 transition"
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