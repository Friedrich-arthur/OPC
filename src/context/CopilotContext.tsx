import React, { createContext, useContext, useState, ReactNode } from "react";
import { SKU, AISuggestion, SuggestionStatus } from "../types";
import { initialSKUs, initialSuggestions } from "../data/initialState";

export type ViewState =
  | "dashboard"
  | "inventory"
  | "trace"
  | "config"
  | "settings"
  | "listing";

interface CopilotContextType {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  skus: SKU[];
  suggestions: AISuggestion[];
  handleSuggestionAction: (
    id: string,
    action: SuggestionStatus,
    feedback?: string,
  ) => void;
}

const CopilotContext = createContext<CopilotContextType | undefined>(undefined);

export function CopilotProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewState>("listing");
  const [skus, setSkus] = useState<SKU[]>(initialSKUs);
  const [suggestions, setSuggestions] =
    useState<AISuggestion[]>(initialSuggestions);

  const handleSuggestionAction = (
    id: string,
    action: SuggestionStatus,
    feedback?: string,
  ) => {
    setSuggestions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: action,
            resolvedAt: new Date().toISOString(),
            resolvedBy: "Alex",
            feedback,
          };
        }
        return s;
      }),
    );
  };

  return (
    <CopilotContext.Provider
      value={{
        currentView,
        setCurrentView,
        skus,
        suggestions,
        handleSuggestionAction,
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
}

export function useCopilot() {
  const context = useContext(CopilotContext);
  if (!context) {
    throw new Error("useCopilot must be used within a CopilotProvider");
  }
  return context;
}
