"use client";
import React, { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"

export default function ProjectArticle({ src }: { src: string }) {
  const [content, setContent] = useState<string>("");
  const isHtml = src.endsWith('.html');

  const fetchContent = useCallback(async (): Promise<void> => {
    try {
      // Add cache busting for development
      const cacheBuster = process.env.NODE_ENV === 'development' ? `?t=${Date.now()}` : '';
      const response = await fetch(src + cacheBuster, {
        cache: 'no-store' // Disable caching in development
      });
      const text = await response.text();
      setContent(text);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  }, [src]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // In development, poll for changes every 2 seconds
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(fetchContent, 2000);
      return () => clearInterval(interval);
    }
  }, [fetchContent]);

  useEffect(() => {
    if (isHtml && content) {
      // Function to render math when KaTeX is available
      const renderMath = (): void => {
        const mathElements = document.querySelectorAll('.html-content');
        console.log('Attempting to render math, found elements:', mathElements.length);
        mathElements.forEach((element) => {
          if (typeof window !== 'undefined' && 'renderMathInElement' in window) {
            try {
              console.log('Rendering math with KaTeX...');
              (window as unknown as { renderMathInElement: (element: Element, options: Record<string, unknown>) => void }).renderMathInElement(element, {
                delimiters: [
                  {left: '$$', right: '$$', display: true},
                  {left: '$', right: '$', display: false},
                  {left: '\\(', right: '\\)', display: false},
                  {left: '\\[', right: '\\]', display: true}
                ],
                macros: {
                  "\\prescript": "\\mathop{}\\!^{#1}_{#2}{#3}"
                },
                throwOnError: false
              });
              console.log('KaTeX rendering completed');
            } catch (error) {
              console.warn('KaTeX rendering failed:', error);
            }
          } else {
            console.log('renderMathInElement not available');
          }
        });
      };

      // Function to load KaTeX if not already loaded
      const loadKaTeX = (): Promise<void> => {
        return new Promise<void>((resolve) => {
          if (typeof window !== 'undefined' && 'renderMathInElement' in window) {
            resolve();
            return;
          }

          // Check if auto-render script is already loaded
          const existingScript = document.querySelector('script[src*="auto-render"]');
          if (existingScript) {
            // Script exists, wait for it to load
            existingScript.addEventListener('load', () => resolve());
            return;
          }

          // Load auto-render script if not present
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js';
          script.async = true;
          script.onload = (): void => resolve();
          script.onerror = (): void => {
            console.warn('Failed to load KaTeX auto-render script');
            resolve();
          };
          document.head.appendChild(script);
        });
      };

      // Load KaTeX and then render
      loadKaTeX().then(() => {
        // Give a small delay for the script to initialize
        setTimeout(renderMath, 100);
      });
    }
  }, [content, isHtml]);

  return (
    <div className="w-full flex justify-center items-start mt-32 mb-16">
      <article
        className="glass p-10 sm:p-14 rounded-3xl mx-4 sm:mx-8"
        style={{
          fontFamily: 'SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        {isHtml ? (
          <div 
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              color: 'white',
            }}
            className="html-content"
          />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[
              [rehypeKatex, { macros: { "\\prescript": "\\mathop{}\\!^{#1}_{#2}{#3}" } }]
            ]}
            components={{
              h1: (props) => <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }} {...props} />, 
              h2: (props) => <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }} {...props} />, 
              h3: (props) => <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white' }} {...props} />, 
              h4: (props) => <h4 style={{ fontSize: '1.2rem', fontWeight: 500, color: 'white' }} {...props} />, 
              h5: (props) => <h5 style={{ fontSize: '1rem', fontWeight: 500, color: 'white' }} {...props} />, 
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </article>
    </div>
  );
} 