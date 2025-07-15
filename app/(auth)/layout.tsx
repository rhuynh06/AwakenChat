'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SignIn, SignUp } from '@clerk/nextjs';
import { neobrutalism } from '@clerk/themes';
import { Button } from '@/components/ui/button';

import {
  FaLinkedin,
  FaDiscord,
  FaGithub,
  FaEnvelope,
} from 'react-icons/fa';

import {
  MessageSquare,
  Users,
  FileText,
  Video,
  Lock,
  Smartphone,
} from 'lucide-react';

const contacts = [
  {
    icon: <FaEnvelope className="w-4 h-4" />,
    label: 'Email',
    href: 'mailto:ryanhuynh200604@gmail.com',
    display: 'ryanhuynh200604@gmail.com',
  },
  {
    icon: <FaDiscord className="w-4 h-4" />,
    label: 'Discord',
    display: 'badboyz6',
  },
  {
    icon: <FaGithub className="w-4 h-4" />,
    label: 'GitHub',
    href: 'https://github.com/rhuynh06',
    display: 'rhuynh06',
  },
  {
    icon: <FaLinkedin className="w-4 h-4" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ryan-huynh-937916248/',
    display: 'rhuynh06',
  },
];

const features = [
  {
    icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
    title: 'Real-Time Chat',
    description: 'Instant messaging with friends and groups, powered by WebSocket.',
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    title: 'Community Servers',
    description: 'Create and join servers with custom channels and roles.',
  },
  {
    icon: <FileText className="w-6 h-6 text-indigo-600" />,
    title: 'File Sharing',
    description: 'Share images, documents, and files securely.',
  },
  {
    icon: <Video className="w-6 h-6 text-indigo-600" />,
    title: 'Audio & Video Calls',
    description: 'Host or join voice/video calls with great quality.',
  },
  {
    icon: <Lock className="w-6 h-6 text-indigo-600" />,
    title: 'Privacy & Security',
    description: 'End-to-end encryption and robust authentication.',
  },
  {
    icon: <Smartphone className="w-6 h-6 text-indigo-600" />,
    title: 'Cross-Platform',
    description: 'Accessible on web and mobile devices.',
  },
];

export default function AuthLayout() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<'sign-in' | 'sign-up'>('sign-in');

  useEffect(() => {
    if (showLogin) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLogin]);

  function openAuth(mode: 'sign-in' | 'sign-up') {
    setLoginMode(mode);
    setShowLogin(true);
  }

  function closeAuth() {
    setShowLogin(false);
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeAuth();
  };

  return (
    <>
      {/* Login/Signup buttons */}
      <div className="fixed top-4 right-4 flex space-x-2 z-50">
        <Button
          onClick={() => openAuth('sign-in')}
          className="px-2 py-1 font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition text-xs"
          variant="default"
        >
          Login
        </Button>
        <Button
          onClick={() => openAuth('sign-up')}
          className="px-2 py-1 font-semibold rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition text-xs"
          variant="default"
        >
          Sign Up
        </Button>
      </div>

      {/* Page container */}
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow bg-gradient-to-br from-indigo-50 to-white px-4 flex flex-col justify-center items-center py-8">
          <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6 sm:p-8 md:p-10">
            <div className="flex flex-col items-center text-center select-text">
              <Image
                src="/logo.png"
                alt="AwakenChat Logo"
                width={120}
                height={120}
                className="mb-4 rounded-lg shadow animate-fadeIn"
                priority
              />

              <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-2 tracking-tight animate-fadeIn delay-100">
                AwakenChat
              </h1>

              <p className="max-w-lg mx-auto mb-8 text-sm sm:text-base text-indigo-700 animate-fadeIn delay-200">
                Modern chat platform with powerful features, built for seamless communication.
              </p>

              {/* Features grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 mb-8">
                {features.map(({ icon, title, description }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center space-y-1 rounded-lg border border-indigo-200 bg-indigo-50 p-4 shadow-sm hover:shadow-md transition cursor-default text-center"
                    title={title}
                  >
                    <div className="rounded-md bg-indigo-100 p-2">{icon}</div>
                    <h3 className="text-indigo-900 font-semibold text-base">{title}</h3>
                    <p className="text-indigo-700 text-xs sm:text-sm">{description}</p>
                  </div>
                ))}
              </section>

              <div className="max-w-xs w-full px-2 mx-auto">
                <Button
                  onClick={() => openAuth('sign-up')}
                  className="w-full px-6 py-2 text-base font-bold rounded-lg shadow bg-indigo-600 text-white hover:bg-indigo-700 transition-transform transform hover:scale-105 animate-bounce"
                  variant="default"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex justify-center space-x-6 bg-white bg-opacity-90 backdrop-blur-md py-4 shadow-inner select-none text-xs">
          {contacts.map(({ icon, label, href, display }) =>
            href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-indigo-700 hover:text-indigo-900 transition"
                aria-label={label}
              >
                {icon}
                <span>{display}</span>
              </a>
            ) : (
              <div
                key={label}
                className="flex items-center space-x-1 text-indigo-700 cursor-default select-text"
                aria-label={label}
              >
                {icon}
                <span>{display}</span>
              </div>
            )
          )}
        </footer>

        {/* Auth modal */}
        {showLogin && (
          <div
            onClick={handleOverlayClick}
            className="fixed inset-0 flex backdrop-blur-xs bg-opacity-20 items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative bg-white rounded-3xl shadow-xl p-8 max-h-[100%] max-w-[100%] overflow-auto animate-fadeIn">
              <button
                aria-label="Close authentication form"
                onClick={closeAuth}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition text-2xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
                {loginMode === 'sign-in' ? 'Welcome Back to AwakenChat' : 'Join AwakenChat'}
              </h2>
              <p className="text-gray-600 text-center mb-6 text-sm">
                {loginMode === 'sign-in'
                  ? 'Log in to continue your conversations.'
                  : 'Create your free account to get started.'}
              </p>

              {loginMode === 'sign-in' ? (
                <SignIn
                  appearance={{
                    baseTheme: neobrutalism,
                    elements: {
                      logoBox: 'w-20 h-20 mx-auto',
                    },
                  }}
                />
              ) : (
                <SignUp
                  appearance={{
                    baseTheme: neobrutalism,
                    elements: {
                      logoBox: 'w-20 h-20 mx-auto',
                    },
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
