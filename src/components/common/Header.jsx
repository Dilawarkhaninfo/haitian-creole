import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from '../ui/theme-toggle';
import { Large } from '../ui/typography';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(true);

    // // Calculate 80vh in pixels
    // const calculateScrollThreshold = () => {
    //     return window.innerHeight * 0.8; // 80vh in pixels
    // };

    // // Handle scroll event
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollPosition = window.scrollY;
    //         const threshold = calculateScrollThreshold();

    //         if (scrollPosition > threshold) {
    //             setIsScrolled(true); // Change to text-black
    //         } else {
    //             setIsScrolled(false); // Revert to text-white
    //         }
    //     };

    //     // Add scroll event listener
    //     window.addEventListener('scroll', handleScroll);

    //     // Clean up the event listener on component unmount
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <nav className='container mx-auto flex h-14 shrink-0 items-center gap-2 px-3 sticky top-0 z-50 transition-colors duration-300 bg-transparent'>
            <div className="flex flex-1 items-center gap-2">
                <Large className={`capitalize transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
                    {import.meta.env.VITE_APP_NAME}
                </Large>
            </div>
            <div className="flex items-center gap-3">
                <NavLink
                    className={`text-sm transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}
                    to="chat"
                >
                    Chat
                </NavLink>
                <NavLink
                    className={`text-sm transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}
                    to="login"
                >
                    Login
                </NavLink>
                <NavLink
                    className={`text-sm px-2 py-2 rounded-md transition-colors duration-300 ${isScrolled ? 'bg-primary text-black' : 'bg-primary text-white'}`}
                    to="signup"
                >
                    Signup
                </NavLink>
                {/* <ThemeToggle /> */}
            </div>
        </nav >
    );
};

export default Header;