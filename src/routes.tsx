import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import Home from "./home/pages/Home.page";
import NewSimulation from "./simulation/pages/NewSimulation.page";
import Simulator from "./simulation/pages/Simulator.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <>error</>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/nova-simulacao", element: <NewSimulation /> },
    ],
  },
  {
    path: "/simulacao/:id",
    element: <Simulator />,
  },
]);
