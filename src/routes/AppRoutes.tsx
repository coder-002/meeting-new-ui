import Dashboard from "../pages/dashboard/Dashboard";
import SetupPage from "../pages/setup/page";
import OrganizationPage from "../pages/setup/tabs/organization";
import { Navigation_Routes } from "./routes.constant";
import { useRoutes } from "react-router-dom";

const AppRoutes = () => {
  const routes = [
    {
      path: Navigation_Routes.dashboard,
      element: <Dashboard />,
    },
    {
      path: Navigation_Routes.organization,
      element: (
        <SetupPage>
          <OrganizationPage />
        </SetupPage>
      ),
    },
  ];
  const route = useRoutes(routes);
  return route;
};

export default AppRoutes;
