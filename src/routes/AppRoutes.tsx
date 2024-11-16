import Dashboard from "../pages/dashboard/Dashboard";
import SetupPage from "../pages/setup/page";
import Branch from "../pages/setup/tabs/branch";
import Committee from "../pages/setup/tabs/committee/committee";
import Deduction from "../pages/setup/tabs/deduction";
import Designation from "../pages/setup/tabs/designation";
import Distance from "../pages/setup/tabs/distance";
import OrganizationPage from "../pages/setup/tabs/organization";
import BusinessUnit from "../pages/setup/tabs/unit";
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
    {
      path: Navigation_Routes.unit,
      element: (
        <SetupPage>
          <BusinessUnit />
        </SetupPage>
      ),
    },
    {
      path: Navigation_Routes.branch,
      element: (
        <SetupPage>
          <Branch />
        </SetupPage>
      ),
    },
    {
      path: Navigation_Routes.committee,
      element: (
        <SetupPage>
          <Committee />
        </SetupPage>
      ),
    },
    {
      path: Navigation_Routes.designation,
      element: (
        <SetupPage>
          <Designation />
        </SetupPage>
      ),
    },
    {
      path: Navigation_Routes.deduction,
      element: (
        <SetupPage>
          <Deduction />
        </SetupPage>
      ),
    },
    {
      path: Navigation_Routes.distance,
      element: (
        <SetupPage>
          <Distance />
        </SetupPage>
      ),
    },
  ];
  const route = useRoutes(routes);
  return route;
};

export default AppRoutes;
