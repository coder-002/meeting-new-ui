import Dashboard from "../pages/dashboard/Dashboard";
import Committeetype from "../pages/setup/committee_type/committeetype";
import SetupPage from "../pages/setup/page";
import AllowanceType from "../pages/setup/tabs/allowanceType";
import Branch from "../pages/setup/tabs/branch";
import Committee from "../pages/setup/tabs/committee/committee";
import Deduction from "../pages/setup/tabs/deduction";
import Designation from "../pages/setup/tabs/designation";
import Distance from "../pages/setup/tabs/distance";
import DocumentType from "../pages/setup/tabs/documentType";
import OrganizationPage from "../pages/setup/tabs/organization";
import OtherAllowanceSetup from "../pages/setup/tabs/otherAllowanceSetup";
import BusinessUnit from "../pages/setup/tabs/unit";
import User from "../pages/setup/tabs/user/user";
import Meetingtype from "../pages/setup/tabs/meeting_type/meeting_type";
import { Navigation_Routes } from "./routes.constant";
import { useRoutes } from "react-router-dom";
import Telephoneallowance from "../pages/setup/tabs/telephone_allowance/telephone_allowance";
import Fiscalyear from "../pages/setup/tabs/fiscal_year/fiscal_year";
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
      path: Navigation_Routes.fiscal_year,
      element: (
        <SetupPage>
          <Fiscalyear />
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
      path: Navigation_Routes.meeting_type,
      element: (
        <SetupPage>
          <Meetingtype />
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
      path: Navigation_Routes.telephone_allowance,
      element: (
        <SetupPage>
          <Telephoneallowance />
        </SetupPage>
      ),
    },
    {
      path: Navigation_Routes.fiscal_year,
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
    {
      path: Navigation_Routes.committee_type,
      element: (
        <SetupPage>
          <Committeetype />
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
    {
      path: Navigation_Routes.setup_allowance,
      element: (
        <SetupPage>
          <OtherAllowanceSetup />
        </SetupPage>
      ),
    },
  ];
  const route = useRoutes(routes);
  return route;
};

export default AppRoutes;
