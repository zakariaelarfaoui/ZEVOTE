import { createContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mode, setMode] = useState("dark");

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const sidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const darkMode = () => {
    setMode("dark");
  };

  const lightMode = () => {
    setMode("light");
  };

  const toggleMode = () => {
    setMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        isSidebarOpen,
        sidebarToggle,
        mode,
        darkMode,
        lightMode,
        toggleMode,
        isDropdownOpen,
        openDropdown,
        closeDropdown,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
