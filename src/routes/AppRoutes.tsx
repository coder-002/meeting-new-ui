import Dashboard from "../pages/dashboard/Dashboard";
import SetupPage from "../pages/setup/page";
import AllowanceType from "../pages/setup/tabs/allowanceType";
import Branch from "../pages/setup/tabs/branch";
import Committee from "../pages/setup/tabs/committee/committee";
import Deduction from "../pages/setup/tabs/deduction";
import Designation from "../pages/setup/tabs/designation";
import Distance from "../pages/setup/tabs/distance";
import DocumentType from "../pages/setup/tabs/documentType";
import OrganizationPage from "../pages/setup/tabs/organization";
import BusinessUnit from "../pages/setup/tabs/unit";
import User from "../pages/setup/tabs/user/user";
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
      path: Navigation_Routes.user,
      element: (
        <SetupPage>
          <User />
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
    {
      path: Navigation_Routes.allowance_type,
      element: (
        <SetupPage>
          <AllowanceType />
        </SetupPage>
      ),
    },
    {
      path: Navigation_Routes.document_type,
      element: (
        <SetupPage>
          <DocumentType />
        </SetupPage>
      ),
    },
  ];
  const route = useRoutes(routes);
  return route;
};

export default AppRoutes;
