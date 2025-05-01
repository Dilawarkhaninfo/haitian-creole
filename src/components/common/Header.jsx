import React from "react";
import { NavLink } from "react-router-dom";
import { AudioWaveform } from "lucide-react";
import { AuthService } from "@/services/AuthService";

const Header = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <nav className="container sticky top-0 z-50 flex items-center justify-between px-4 py-3 mx-auto border-b ">
      <div className="flex items-center gap-2">
        <NavLink to="/" className="flex items-center gap-2 font-medium">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground">
            <AudioWaveform className="size-4" />
          </div>
          <span className="capitalize">{import.meta.env.VITE_APP_NAME}</span>
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        {currentUser ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                AuthService.logout();
                window.location.href = "/login";
              }}
              className="  px-3 py-1.5 text-sm rounded-md transition-colors bg-primary/80 text-primary-foreground hover:bg-primary "
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-sm hover:text-primary transition-colors ${
                  isActive ? "text-primary font-medium" : "text-foreground/80"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/90 text-primary-foreground font-medium"
                    : "bg-primary/80 text-primary-foreground hover:bg-primary"
                }`
              }
            >
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
