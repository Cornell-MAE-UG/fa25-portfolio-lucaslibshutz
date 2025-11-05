'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navHeader = document.querySelector('.nav-header');
      
      if (navHeader) {
        const navRect = navHeader.getBoundingClientRect();
        const isNavVisible = navRect.bottom > 0;
        const isScrollingUp = currentScrollY < lastScrollY;
        const isScrollingDown = currentScrollY > lastScrollY;
        
        // Show scroll to top when scrolling up and nav is not visible
        const shouldShow = isScrollingUp && !isNavVisible && currentScrollY > 100;
        
        if (shouldShow && !showScrollToTop && !isFadingOut) {
          setShowScrollToTop(true);
          setIsFadingOut(false);
        } else if ((!shouldShow || isScrollingDown) && showScrollToTop && !isFadingOut) {
          // Start fade out when scrolling down or when conditions change
          setIsFadingOut(true);
          // Hide after animation completes
          setTimeout(() => {
            setShowScrollToTop(false);
            setIsFadingOut(false);
          }, 400);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, showScrollToTop, isFadingOut]);

  const scrollToTop = () => {
    setIsFadingOut(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Hide after fade-out animation
    setTimeout(() => {
      setShowScrollToTop(false);
      setIsFadingOut(false);
    }, 400);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="nav-header">
        <div className="w-full flex items-center justify-center">
          <nav className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <Link 
              href="/projects" 
              className="nav-link text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 sm:px-3 md:px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10"
              style={{
                color: 'var(--foreground)', 
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
              }}
            >
              Projects
            </Link>
            <Link 
              href="/"
              className="nav-link text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 sm:px-3 md:px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10"
              style={{
                color: 'var(--foreground)', 
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
              }}
            >
              Home
            </Link>
            <Link 
              href="/#contact"
              className="nav-link text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2 sm:px-3 md:px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10"
              style={{
                color: 'var(--foreground)', 
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
              }}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            zIndex: 9999,
            padding: '1rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '50px',
            color: 'var(--foreground)',
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: isFadingOut ? 'fadeOut 0.4s ease-out forwards' : 'fadeInUp 0.4s ease-out',
            opacity: isFadingOut ? 0 : 1,
            transform: isFadingOut ? 'translateX(-50%) translateY(20px)' : 'translateX(-50%) translateY(0)'
          }}
        >
          Return to top ↑
        </button>
      )}
    </>
  );
} 