import { useOnClickOutside } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, User } from "lucide-react";
import { useRef, useState, type FunctionComponent } from "react";

export const ProfileDropdown: FunctionComponent = () => {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  useOnClickOutside(profileRef, () => setIsProfileOpen(false));

  const handleLogout = () => {
    // Handle logout logic here
    setIsProfileOpen(false);
  };

  return (
    <div className="relative hidden md:block" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="w-10 h-10 bg-postvibe-purple rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors duration-200 cursor-pointer"
      >
        <User className="w-5 h-5 text-white" />
      </button>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="absolute right-0 mt-2 w-48 p-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"
          >
            <button
              onClick={handleLogout}
              className="hover:bg-gray-100 flex items-center gap-2 w-full p-2 rounded-md duration-300 text-left text-sm text-red-500"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
