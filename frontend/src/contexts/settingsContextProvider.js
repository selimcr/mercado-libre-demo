import React, { createContext, useState } from 'react'

export const SettingsContext = createContext();

const SettingsContextProvider = ({ children }) => {

  const [selectedItem, setSelectedItem] = useState(null)
  const [isSolutionsView, setIsSolutionView] = useState(false)
  const [currentView, setCurrentView] = useState(false)

  return (
    <SettingsContext.Provider value={{ selectedItem, setSelectedItem, isSolutionsView, setIsSolutionView, currentView, setCurrentView }}>
      {children}
    </SettingsContext.Provider>
   );
}

export default SettingsContextProvider
