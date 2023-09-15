// contexts/ResponseContext.tsx
"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the context type
interface ResponseContextType {
  isGeneratingResponse: boolean;
  toggleResponseGeneration: (isGenResponse: boolean) => void;
}

// Create the context
const ResponseContext = createContext<ResponseContextType | undefined>(undefined);

// Create a provider component
export function ResponseProvider({ children }: { children: ReactNode }) {
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

  const toggleResponseGeneration = (isGenResponse: boolean) => {
    setIsGeneratingResponse(isGenResponse);
  };

  return (
    <ResponseContext.Provider value={{ isGeneratingResponse, toggleResponseGeneration }}>
      {children}
    </ResponseContext.Provider>
  );
}

// Custom hook to use the context
export function useResponseContext() {
  const context = useContext(ResponseContext);
  if (context === undefined) {
    throw new Error('useResponseContext must be used within a ResponseProvider');
  }
  return context;
}
