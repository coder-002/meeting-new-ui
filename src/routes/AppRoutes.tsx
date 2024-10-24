import Dashboard from "../pages/dashboard/Dashboard";
import { Navigation_Routes } from "./routes.constant";
import { useRoutes } from "react-router-dom";

const AppRoutes = () => {
  const routes = [
    {
      path: Navigation_Routes.dashboard,
      element: <Dashboard />,
    },
  ];
  const route = useRoutes(routes);
  return route;
};

export default AppRoutes;
