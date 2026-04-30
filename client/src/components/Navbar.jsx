import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 backdrop-blur-xl sm:px-6">
        <Link to="/" className="font-display text-2xl tracking-[0.2em] text-white">
          LUMA
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? "text-accent" : "text-slate-300 hover:text-white"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink to="/dashboard" className="text-sm text-slate-300 hover:text-white">
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="text-sm text-slate-300 hover:text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm text-slate-300 hover:text-white">
                Login
              </NavLink>
              <Link to="/signup" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950">
                Book Now
              </Link>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-slate-950/95 p-5 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 text-white">
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
              {user ? (
                <>
                  <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                    Dashboard
                  </NavLink>
                  <button onClick={handleLogout} className="text-left">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setOpen(false)}>
                    Login
                  </NavLink>
                  <NavLink to="/signup" onClick={() => setOpen(false)}>
                    Signup
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
