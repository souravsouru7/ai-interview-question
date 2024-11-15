"use client"
import React, { useState } from 'react';
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = usePathname();
  
  const navItems = [
    { 
      path: "/dashboard", 
      label: "Dashboard",
    },
    { 
      path: "/dashboard/questions", 
      label: "Questions",
    },
    {
      path: "/dashboard/upgrade",
      label: "Upgrade",
      isPro: true
    },
    {
      path: "/dashboard/how-it-works",
      label: "How It Works"
    }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Image
              src="/logo.svg"
              width={140}
              height={40}
              alt="Mocky Interview Logo"
              className="h-8 w-auto hover:opacity-80 transition-opacity"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`
                  group inline-flex items-center px-1 pt-1 text-sm font-medium
                  ${path === item.path 
                    ? 'text-indigo-600 border-b-2 border-indigo-500'
                    : 'text-slate-600 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300'
                  }
                  transition-all duration-200
                `}
              >
                {item.label}
                {item.isPro && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full">
                    PRO
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-6">
            <button >
             
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 hover:opacity-80 transition-opacity",
                  userButtonPopover: "shadow-lg border border-slate-200"
                }
              }}
            />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`
                  ${path === item.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                  }
                  block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                `}
              >
                <div className="flex items-center justify-between">
                  {item.label}
                  {item.isPro && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full">
                      PRO
                    </span>
                  )}
                </div>
              </a>
            ))}
            <button className="w-full mt-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
              Start Interview
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;