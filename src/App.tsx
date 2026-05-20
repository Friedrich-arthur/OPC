import { CopilotProvider, useCopilot } from "./context/CopilotContext";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardView } from "./views/DashboardView";
import { InventoryView } from "./views/InventoryView";
import { DecisionTraceView } from "./views/DecisionTraceView";
import { ConfigView } from "./views/ConfigView";
import { ListingCopilotView } from "./views/ListingCopilotView";

function ViewManager() {
  const { currentView } = useCopilot();

  switch (currentView) {
    case "dashboard":
      return <DashboardView />;
    case "inventory":
      return <InventoryView />;
    case "listing":
      return <ListingCopilotView />;
    case "trace":
      return <DecisionTraceView />;
    case "config":
      return <ConfigView />;
    case "settings":
      return (
        <div className="p-12 text-center text-slate-500">
          Settings Page (Coming Soon)
        </div>
      );
    default:
      return <DashboardView />;
  }
}

export default function App() {
  return (
    <CopilotProvider>
      <AppLayout>
        <ViewManager />
      </AppLayout>
    </CopilotProvider>
  );
}
