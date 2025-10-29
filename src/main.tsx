// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "@whop/react-native";
import { DashboardView } from "./views/dashboard-view";
import { DiscoverView } from "./views/discover-view";
import { ExperienceView } from "./views/experiance-view";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <AppRouter
      dashboardView={DashboardView}
      discoverView={DiscoverView}
      experienceView={ExperienceView}
    />
  </React.StrictMode>
);
