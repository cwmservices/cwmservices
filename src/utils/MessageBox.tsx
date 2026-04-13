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

  const handleClickOutside = (event: any) => {
    if (window.innerWidth >= 768 && messageBox.current && !messageBox.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
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

  const validateFile = (file: any) => {
    if (!file) return '';

    const maxSize = 5 * 1024 * 1024;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-dark/40 dark:bg-dark/70 backdrop-blur-sm transition-all duration-300">
      <div
        ref={messageBox}
        className="bg-light dark:bg-surface-dark border border-transparent md:border-border-light dark:md:border-border-dark w-full h-[100dvh] md:h-auto md:max-h-[85vh] lg:max-h-[92vh] xl:max-h-[85vh] 2xl:min-h-[85vh] xl:min-h-[86vh] md:max-w-[480px] flex flex-col md:rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
      >
        {!isSuccess ? (
          <>
            <div className="flex justify-between items-center p-4 md:p-5 border-b border-border-light dark:border-border-dark bg-surface-muted/50 dark:bg-surface-dark-muted/50">
              <div className="flex items-center">
                <img src="/cwmlogo.png" alt="Logo" className="w-9 rounded-full h-9 mr-3 object-cover shadow-sm" />
                <h2 className="text-base md:text-lg text-ink dark:text-ink-dark font-display font-bold tracking-wide">Message Masood U.</h2>
              </div>
              <button
                onClick={onClose}
                className="text-ink-muted dark:text-ink-dark-muted hover:text-primary dark:hover:text-primary transition-colors p-1"
                disabled={isLoading}
              >
                <X size={22} />
              </button>
            </div>

            {hasSubmitted && (
              <div className="mx-4 md:mx-5 mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl">
                <p className="text-yellow-800 dark:text-yellow-400 font-body text-sm leading-relaxed">
                  You have already submitted a quote request in this session. Session resets when you close or switch tabs.
                </p>
              </div>
            )}

            {submitError && (
              <div className="mx-4 md:mx-5 mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-xl">
                <p className="text-red-600 dark:text-red-400 font-body text-sm leading-relaxed">{submitError}</p>
              </div>
            )}

            <div className="flex-grow p-4 md:p-5 overflow-y-auto custom-scrollbar">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Contact Email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={hasSubmitted}
                  className={`w-full font-body text-ink dark:text-ink-dark placeholder-ink-muted/50 dark:placeholder-ink-dark-muted/50 p-3.5 bg-surface-muted dark:bg-surface-dark-muted text-[15px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${emailError ? 'border-red-400 focus:border-red-400' : 'border-border-light dark:border-border-dark focus:border-primary'
                    } ${hasSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {emailError && <p className="text-red-500 font-body text-xs mt-1.5 ml-1">{emailError}</p>}
              </div>

              <div className="relative">
                <textarea
                  className={`w-full h-36 font-body text-ink dark:text-ink-dark placeholder-ink-muted/50 dark:placeholder-ink-dark-muted/50 p-3.5 bg-surface-muted dark:bg-surface-dark-muted text-[15px] border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${messageError ? 'border-red-400 focus:border-red-400' : 'border-border-light dark:border-border-dark focus:border-primary'
                    } ${hasSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Ask Masood U. a question or share your project details (requirements, timeline, budget, etc.)"
                  value={message}
                  onChange={handleMessageChange}
                  disabled={hasSubmitted}
                />
                <div className="absolute bottom-3 right-3 text-[12px] font-body text-ink-muted dark:text-ink-dark-muted">
                  {message.length}/250
                </div>
              </div>
              {messageError && <p className="text-red-500 font-body text-xs mt-1.5 ml-1">{messageError}</p>}

              <div className="mt-5 space-y-2">
                <p className="text-xs font-display font-semibold text-ink-muted dark:text-ink-dark-muted mb-2 uppercase tracking-wider">Quick Replies</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      disabled={hasSubmitted}
                      className={`text-[13px] font-body text-left border rounded-full px-3.5 py-1.5 transition-all ${hasSubmitted
                        ? 'opacity-50 cursor-not-allowed border-border-light dark:border-border-dark text-ink-muted dark:text-ink-dark-muted'
                        : 'border-border-light dark:border-border-dark text-ink/80 dark:text-ink-dark/80 hover:bg-surface-muted dark:hover:bg-surface-dark-muted hover:border-primary/30'
                        }`}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border-light dark:border-border-dark p-4 md:p-5 flex items-center bg-surface-muted/30 dark:bg-surface-dark-muted/30">
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
                  className={`text-ink-muted dark:text-ink-dark-muted hover:text-primary transition-colors p-2 -ml-2 rounded-full hover:bg-surface-muted dark:hover:bg-surface-dark-muted ${hasSubmitted ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  title="Attach image (max 5MB)"
                >
                  <Paperclip size={20} />
                </button>
                {selectedFile && (
                  <div className="flex items-center gap-2 ml-2 bg-surface-muted dark:bg-surface-dark-muted px-3 py-1.5 rounded-full border border-border-light dark:border-border-dark">
                    <span className="text-[13px] font-body text-ink dark:text-ink-dark truncate max-w-[100px] md:max-w-[150px]">
                      {selectedFile.name}
                    </span>
                    <button
                      onClick={handleRemoveFile}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      disabled={hasSubmitted}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                {fileError && (
                  <span className="text-red-500 font-body text-xs ml-3 truncate max-w-[120px]">{fileError}</span>
                )}
              </div>
              <button
                onClick={handleSubmit}
                disabled={hasSubmitted || isLoading || !!emailError || !!messageError || message.length < 40}
                className={`flex items-center justify-center font-display text-[14px] font-[600] tracking-[0.03em] px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-[.97] ${!hasSubmitted && !isLoading && !emailError && !messageError && message.length >= 40
                  ? 'bg-primary text-white shadow-glow-sm hover:shadow-glow hover:bg-secondary'
                  : 'bg-surface-muted dark:bg-surface-dark-muted text-ink-muted dark:text-ink-dark-muted cursor-not-allowed'
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
          <div className="p-8 text-center flex-grow flex flex-col justify-center items-center">
            <div className="w-20 h-20 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4 text-ink dark:text-ink-dark">Thank You!</h2>
            <p className="mb-8 font-body text-[15px] text-ink-muted dark:text-ink-dark-muted max-w-sm leading-relaxed">
              I have received your quote request and will get back to you via the provided email as soon as possible.
            </p>
            <button
              onClick={handleCloseSuccess}
              className="font-display text-[15px] font-[600] tracking-[0.03em] px-8 py-3 rounded-xl bg-primary hover:bg-secondary text-white shadow-glow-sm hover:shadow-glow transition-all duration-200 active:scale-[.97]"
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