import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import neonBg from "../assets/neon-ritual-bg.png";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/todos";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoggingOn(true);
    setAuthError("");

    const result = await login(email, password);

    if (!result.success) {
      setAuthError(result.error);
    }

    setIsLoggingOn(false);
  }

  return (
    <div className="min-h-screen flex flex-col font-display overflow-x-hidden bg-obsidian">
      {/* ===== Top Navigation ===== */}
      <nav className="w-full flex items-center justify-between px-8 py-6 z-50 fixed top-0 left-0 bg-obsidian/50 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl font-bold tracking-tight text-white text-glow-strong transition-all duration-300 group-hover:tracking-wide">
            TaskRitual
          </span>
        </Link>
        <div className="flex items-center gap-8 text-sm font-semibold tracking-wider">
          <Link
            to="/about"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/login"
            className="text-neon-red border-b-2 border-neon-red pb-1"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-screen pt-24 lg:pt-20">
        {/* --- Left Visual Section --- */}
        <section className="lg:w-1/2 relative flex items-center justify-center p-8 lg:p-16 min-h-[50vh] lg:min-h-screen">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              alt="Neon red abstract 3D light streaks on obsidian background"
              className="w-full h-full object-cover object-left opacity-90 mix-blend-screen"
              src={neonBg}
            />
            {/* Mobile gradient fade to right section */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian opacity-50 lg:hidden" />
          </div>

          {/* Ambient glow layer */}
          <div className="absolute inset-0 ambient-glow z-[1]" />

          {/* Hero text */}
          <div className="relative z-10 max-w-xl text-left mt-16 lg:mt-0">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white text-glow-strong animate-fade-up">
              Your Daily
              <br />
              Task Ritual.
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 font-light max-w-md font-body animate-fade-up-delay-1">
              Clear your mind. Organize your workflow. Get things done.
            </p>
          </div>
        </section>

        {/* --- Right Login Section --- */}
        <section className="lg:w-1/2 flex items-center justify-center p-6 lg:p-16 bg-obsidian relative z-10">
          {/* Authentication Card */}
          <div className="w-full max-w-md glass-surface rounded-2xl p-10 border border-neon-red shadow-neon animate-fade-up-delay-2">
            {/* Card Header */}
            <div className="flex flex-col items-center mb-10">
              {/* Fingerprint Icon */}
              <svg
                className="w-12 h-12 text-neon-red mb-4 icon-glow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
              <h2 className="text-3xl font-semibold text-white tracking-wide text-glow">
                Authenticate
              </h2>
            </div>

            {/* Error message */}
            {authError && (
              <div className="mb-6 p-3 rounded-lg bg-error-container/20 border border-error/30 text-error text-sm font-body text-center animate-fade-up">
                {authError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/*  (Email) Input */}
              <div className="animate-fade-up-delay-2">
                <label
                  className="block text-sm font-medium text-gray-300 mb-2 tracking-wider font-body"
                  htmlFor="Email"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-neon-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <input
                    className="input-neon block w-full pl-12 pr-4 py-3 bg-obsidian border border-neon-red/30 rounded-xl text-white placeholder-gray-500 font-body transition-all duration-300"
                    id="email"
                    name="Email"
                    placeholder="Enter Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* password (Password) Input */}
              <div className="animate-fade-up-delay-3">
                <label
                  className="block text-sm font-medium text-gray-300 mb-2 tracking-wider font-body"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-neon-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <input
                    className="input-neon block w-full pl-12 pr-4 py-3 bg-obsidian border border-neon-red/30 rounded-xl text-white placeholder-gray-500 tracking-widest font-body transition-all duration-300"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  className="btn-neon-pulse w-full flex justify-center items-center py-4 px-4 rounded-xl text-sm font-bold text-obsidian bg-neon-red hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-red focus:ring-offset-obsidian transition-colors duration-300 tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoggingOn}
                >
                  {isLoggingOn ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-obsidian"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      INITIATE SEQUENCE
                      <svg
                        className="ml-2 -mr-1 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Divider + Recovery Link */}
              <div className="pt-6 text-center">
                <div className="divider-neon mb-6" />
                <a
                  className="text-sm font-medium text-neon-red hover:text-red-400 transition-colors duration-200 font-body"
                  href="#"
                >
                  Recover Access Protocol
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="w-full flex flex-col md:flex-row items-center justify-between px-8 py-6 border-t border-surface-container-high bg-obsidian z-10 relative">
        <div className="text-sm text-gray-500 mb-4 md:mb-0 font-display font-bold text-glow">
          TaskRitual
        </div>
        <div className="text-sm text-gray-500 text-center flex-1 font-body">
          © 2026 TaskRitual | Crafted by Waleed Tarbosh.
        </div>
      </footer>
    </div>
  );
}