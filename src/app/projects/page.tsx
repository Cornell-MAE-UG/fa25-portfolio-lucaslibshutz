"use client";
import AnimatedSurface from "../AnimatedSurface";
import React from "react";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center" style={{ overflow: 'hidden' }}>
      {/* Projects Content */}
      <main className="relative z-10 w-full flex flex-col items-center justify-center">
        <section className="glass p-10 sm:p-14 rounded-3xl mb-16 mx-8 sm:mx-20 mt-32" style={{ fontFamily: 'SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>Projects</h2>
          <div className="flex flex-col gap-8">
            {[
              {
                title: "Cornell Electric Vehicles",
                location: "Cornell University (Ithaca, NY)",
                time: "(October 2023 - Present)",
                description: "The foremost team at Cornell Unviersity dedicated to design and manufacture of an autonomous electric vehicle. Explore my work as the Chassis subteam lead, guiding a group of students to build a new carbon fiber chassis from scratch.",
                tech: ["Composites & Carbon Fiber", "Autodesk Alias", "CAD/CNC", "Solidworks"],
                href: "/projects/cev",
                image: "/images/cev_car.png"
              },
              {
                title: "Humanoid Robot Whole Body Controller",
                location: "Italian Institute of Technology (Genova, Italy)",
                time: "(June 2025 - August 2025)",
                description: "I worked with the talented team at IIT to implement and develop a whole-body momentum controller algorithm that was easily scalable and optimizable for any humanoid robot.",
                tech: ["Control Theory", "Robotics", "JAX", "Python", "Spatial Dynamics"],
                href: "/projects/momentum-controller",
                image: "/images/ergoCub.png"
              },
              {
                title: "Torque Wrench Design Project",
                location: "Cornell University MAE",
                time: "(December 2025)",
                description: "Designed and iterated a torque wrench using both Python and ANSYS Mechanical.",
                tech: ["Python","ANSYS","Fusion 360", "Fracture Mechanics"],
                href: "/projects/torque_wrench",
                image: "/images/torque_wrench1_tp.png"
              },
              {
                title: "Qualitative to Quantitative Data Transformer",
                location: "Scratch Foundation",
                time: "(June 2024 - August 2024)",
                description: "I developed a transformer model pipline that converted large databases of Scratch user comments into easily analyzable quantitative data for the research team.",
                tech: ["K-Means Clustering", "Docker", "Transformers", "Linux"],
                image: "/images/scratch.png"
              },
              {
                title: "CNC G-Code Organization",
                location: "AVStar Fuel Systems",
                time: "(August 2022)",
                description: "I created a custom Python script that automatically sorted and labeled all engineering schematics.",
                tech: ["Python", "Pandas"],
                image: "/images/avstar.png"
              }
            ].map((project, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row gap-6 p-8 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', minHeight: '300px' }}
                onClick={() => project.href && (window.location.href = project.href)}
              >
                {/* Project Content */}
                <div className="lg:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>{project.title}</h1>
                      <span className="text-lg font-semibold opacity-70" style={{ color: 'var(--foreground)' }}>{project.time}</span>
                    </div>
                    <p className="text-lg font-semibold opacity-70 mb-4" style={{ color: 'var(--foreground)' }}>{project.location}</p>
                    <p className="text-lg leading-relaxed opacity-90 mb-6" style={{ color: 'var(--foreground)' }}>{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-2 rounded-full text-sm font-medium"
                        style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--foreground)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Image */}
                <div className="lg:w-1/3 shrink-0">
                  <div className="w-full h-48 lg:h-full rounded-xl overflow-hidden bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className={`w-full h-full ${project.title === "Qualitative to Quantitative Data Transformer" ? "object-contain" : "object-cover"}`}
                      />
                    ) : (
                      <div className="flex items-center justify-center text-gray-400">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.7 6.3A1 1 0 0 0 14 7H20V21A2 2 0 0 1 18 23H6A2 2 0 0 1 4 21V3A2 2 0 0 1 6 1H12V5A2 2 0 0 0 14 7A2 2 0 0 0 14.7 6.3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 2V6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 9H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 
