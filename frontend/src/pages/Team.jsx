import React from "react";
import Navbar from "../components/Navbar";
import "../components/TeamSection.css";
import AbhijeethImg from "../assets/Abhijeeth.jpeg";
import VaishnaviImg from "../assets/Vaishnavi.jpeg";
import RamanujaImg from "../assets/Ramanuja.jpeg";
import varshithaImg from "../assets/varshitha.jpeg";
import manasImg from "../assets/manas.jpeg";

const team = [
  {
    name: "Manas",
    role: "Team Lead | Full Stack Developer",
    desc: "Leads project strategy, develops frontend & backend systems, and integrates the CGE simulation engine with the dashboard.",
    img: manasImg,
  },
  {
    name: "Varshitha Reddy",
    role: "Full Stack Developer (Frontend & Backend)",
    desc: "Builds interactive dashboard modules, implements CGE equilibrium logic, and develops APIs for policy simulations.",
    img: varshithaImg,
  },
  {
    name: "Ramanuja",
    role: "Frontend Developer | UI/UX Designer",
    desc: "Designs responsive interfaces and builds animated visualization components for the dashboard.",
    img: RamanujaImg,
  },
  {
    name: "Abhijeeth",
    role: "Economic Research Team",
    desc: "Develops the Social Accounting Matrix and validates sectoral economic relationships.",
    img: AbhijeethImg,
  },
  {
    name: "Vaishnavi Reddy",
    role: "UI/UX Designer",
    desc: "Crafts intuitive UI systems and enhances user experience for economic data presentation.",
    img: VaishnaviImg,
  },
];

export default function Team() {
  return (
    <>
      <Navbar />

      <section className="team-section">
        <h2 className="team-title">Meet Our Team</h2>

        <div className="team-container">
          {team.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="card-image">
                <img src={member.img} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="description">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
