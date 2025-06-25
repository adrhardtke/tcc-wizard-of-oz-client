import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { ThemeProvider } from "./ThemeProvider";
import { ToggleThemeProvider } from "./ToggleThemeProvider";
import { SidebarProvider } from "./ui/sidebar";

export function MainLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header className="flex items-center justify-between p-4 justify-end">
        <ToggleThemeProvider />
      </header>
      <SidebarProvider>
        <AppSidebar />
        <main className="h-full w-full px-8">
          <Outlet />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
