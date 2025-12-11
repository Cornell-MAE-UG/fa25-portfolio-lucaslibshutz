'use client';

import React, { useEffect, useState } from "react";

export default function Home() {
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    document.body.style.setProperty('--page-blur', '8px');
    return () => {
      document.body.style.removeProperty('--page-blur');
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setShowHero(true), 100);
    // Only scroll to anchor if present in URL
    if (typeof window !== "undefined" && window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  // Add a style tag for the unique button transition
  const exploreBtnStyle = `
    .explore-btn-unique {
      transition: transform 6s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .explore-btn-unique:hover {
      transform: scale(1.05) !important;
    }
  `;
  return (
    <div className="font-sans min-h-screen">
      <style>{exploreBtnStyle}</style>
      {/* Floating Header */}
      <div className="absolute top-0 left-0 w-full flex justify-center z-10">
        {/* The header is rendered by layout.tsx, so nothing to render here, but this is where it floats visually */}
      </div>

      {/* Main Content */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden p-0 m-0 -mt-16">
        {/* Main Content */}
        <div className={`relative z-10 text-center transition-all duration-700 ${showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionProperty: 'opacity, transform'}}>
          <h1 
            className="text-6xl sm:text-8xl mb-12 tracking-widest uppercase"
            style={{color: 'var(--foreground)', fontFamily: 'Times New Roman, serif', letterSpacing: '0.18em'}}
          >
            Lucas
          </h1>
          <h1 className="text-6xl sm:text-8xl mb-12 tracking-widest uppercase"
            style={{color: 'var(--foreground)', fontFamily: 'Times New Roman, serif', letterSpacing: '0.18em'}}
          >
            Libshutz
          </h1>
          <div className="flex gap-6 items-center justify-center flex-col sm:flex-row">
            <a
              className="rounded-full flex items-center justify-center gap-2 font-semibold text-base h-14 px-8 explore-btn-unique"
              style={{
                background: 'var(--foreground)',
                color: 'var(--background)',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
              }}
              href="#about"
            >
             About Me 
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="glass p-10 sm:p-14 rounded-3xl mb-16 mx-8 sm:mx-20 mt-32" style={{fontFamily: 'SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'}}>
        <h2 className="text-3xl font-bold mb-8" style={{color: 'var(--foreground)'}}>About</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-2xl leading-relaxed mb-6 opacity-90" style={{color: 'var(--foreground)'}}>
              I'm a student at Cornell University, majoring in Mechanical Engineering. I'm currently a member of
              the Cornell Electric Vehicles student project team, where I currently serve as the Chassis subteam lead.
              I'm also interested in the intersection of robotics and AI. You can find out more about my projects  <a href="/projects" className="text-2xl hover:text-primary transition-colors mb-6 opacity-90 font-bold" style={{color: 'var(--primary)'}}>here</a>.
            </p>
          </div>
          <div className="flex justify-center">
            <img 
              src="/images/robotics-photo.png" 
              alt="Lucas with a humanoid robot in a robotics laboratory"
              className="rounded-2xl max-w-full h-auto shadow-lg"
              style={{
                maxHeight: '500px',
                objectFit: 'cover',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="glass p-10 sm:p-14 rounded-3xl mx-8 sm:mx-20 mt-32" style={{fontFamily: 'SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'}}>
        <h2 className="text-3xl font-bold mb-8" style={{color: 'var(--foreground)'}}>Contact</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-2xl leading-relaxed mb-6 opacity-90" style={{color: 'var(--foreground)'}}>
              If you have any questions on my work, my interests, or just about anything else, my contact information is below.
              I look forward to hearing from you!
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="mailto:lsl94@cornell.edu" 
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10"
                style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)'}}
                title="Email"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a 
                href="https://github.com/lucaslibshutz" 
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10"
                style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)'}}
                title="GitHub"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.519C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.88383 21.3007 7.26683 20.9291 6.7483C20.5575 6.22977 20.0381 5.83624 19.44 5.62C19.155 4.66122 18.6723 3.78447 18.0263 3.04476C17.3803 2.30505 16.5878 1.72057 15.7 1.33C15.7 1.33 14.8 1 13.5 2.5C12.2 1 11.3 1 11.3 1C10.4122 1.72057 9.61975 2.30505 8.97375 3.04476C8.32775 3.78447 7.84504 4.66122 7.56 5.62C6.9619 5.83624 6.44251 6.22977 6.07091 6.7483C5.69931 7.26683 5.50027 7.88383 5.5 8.52C5.5 13.97 8.8 15.16 11.94 15.55C11.611 15.89 11.3572 16.2954 11.195 16.7399C11.0328 17.1844 10.9666 17.6581 11 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/lucaslibshutz/" 
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10"
                style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)'}}
                title="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.7)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
                      <div className="flex flex-col gap-6">
              <a
                className="rounded-full transition-all duration-300 flex items-center justify-center gap-3 font-large text-base sm:text-lg font-bold h-12 px-6 hover:scale-105"
                style={{background: 'rgba(255, 255, 255, 0.05)', color: 'var(--foreground)', border: '1px solid rgba(255, 255, 255, 0.1)'}} 
                href="#"
              >
                Download Resume
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                className="rounded-full transition-all duration-300 flex items-center justify-center gap-3 font-large text-base sm:text-lg font-bold h-12 px-6 hover:scale-105"
                style={{background: 'rgba(255, 255, 255, 0.05)', color: 'var(--foreground)', border: '1px solid rgba(255, 255, 255, 0.1)'}} 
                href="/projects"
              >
                View Projects
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3A2.828 2.828 0 0 1 21 7L7 21H3V17L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 5L19 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
        </div>
      </section>
    </div>
  );
}
