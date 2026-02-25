 import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="w-full top-8 left-0 z-50">
      <div className="max-w-9xl mx-auto flex items-center justify-between px-6 py-4">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span
            className="text-2xl font-bold tracking-widest"
            style={{
              fontFamily: "Bebas Neue, Anton",
              letterSpacing: "0.18em",
              textShadow: "0 0 20px rgba(255,255,255,1.0)"
            }}
          >
            THRUST
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg px-10 py-3 border border-white/40">
            <ul className="flex items-center gap-10 text-sm font-semibold text-slate-800">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/dashboard">Dashboard</NavItem>
              <NavItem to="/labor-adjustment">Labor Adjustment</NavItem>
              <NavItem to="/about">About Project</NavItem>
              <NavItem to="/team">Team</NavItem>
            </ul>
          </div>
        </motion.div>

      

      </div>
    </nav>
  );
}

function NavItem({ to, children }) {
  return (
    <li>
      <NavLink to={to}>
        {({ isActive }) => (
          <motion.span
            whileHover={{
              scale: 1.15,
              textShadow: "0 0 12px rgba(37,99,235,0.9)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative cursor-pointer ${
              isActive ? "text-blue-600" : "text-slate-700"
            }`}
          >
            {children}

            
            {isActive && (
              <motion.div
                layoutId="navUnderline"
                className="absolute left-0 right-0 -bottom-2 bg-blue-600 rounded-full"
              />
            )}
          </motion.span>
        )}
      </NavLink>
    </li>
  );
}
