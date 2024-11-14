import {
  makeStyles,
  SelectTabData,
  SelectTabEvent,
  TabValue,
} from "@fluentui/react-components";
import TabList from "../../components/form/TabList";
import { Navigation_Routes } from "../../routes/routes.constant";
import {
  ArrowRouting20Filled,
  Branch16Filled,
  CalendarLtr20Filled,
  Document10020Filled,
  Group20Filled,
  GroupList20Filled,
  Organization16Filled,
  People20Filled,
  PeopleAudienceFilled,
  Phone12Filled,
  PositionToBack20Filled,
  ReceiptMoney20Filled,
  Signature16Filled,
  TrayItemRemove20Filled,
} from "@fluentui/react-icons";
import { ReactNode, useState } from "react";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 9fr",
  },
  tabListContainer: {
    width: "200px",
  },
  content: {
    flex: "1",
    padding: "8px",
    width: "100%",
    overflowX: "auto",
  },
});

const SetupPage = ({ children }: { children: ReactNode }) => {
  const styles = useStyles();
  const [selectedValue, setSelectedValue] = useState<TabValue>("organization");
  const tabList = [
    {
      id: "1",
      label: "Organization",
      value: "organization",
      icon: <Organization16Filled />,
      url: Navigation_Routes.organization,
    },
    {
      id: "2",
      label: "business_unit",
      value: "organizationUnit",
      icon: <Signature16Filled />,
      url: Navigation_Routes.unit,
    },
    {
      id: "3",
      label: "branch",
      value: "organizationBranch",
      icon: <Branch16Filled />,
      url: Navigation_Routes.branch,
    },
    {
      id: "4",
      label: "committee",
      value: "committee",
      icon: <Group20Filled />,
      url: Navigation_Routes.committee,
    },
    {
      id: "5",
      label: "designation",
      value: "designation",
      icon: <PositionToBack20Filled />,
      url: Navigation_Routes.designation,
    },
    {
      id: "6",
      label: "deduction",
      value: "deduction",
      icon: <TrayItemRemove20Filled />,
      url: Navigation_Routes.deduction,
    },

    {
      id: "7",
      label: "distance",
      value: "distance",
      icon: <ArrowRouting20Filled />,
      url: Navigation_Routes.distance,
    },
    {
      id: "8",
      label: "users",
      value: "user",
      icon: <People20Filled />,
      url: Navigation_Routes.user,
    },
    {
      id: "9",
      label: "committee_type",
      value: "committeeType",
      icon: <GroupList20Filled />,
      url: Navigation_Routes.committee_type,
    },
    {
      id: "10",
      label: "meeting_type",
      value: "meetingType",
      icon: <PeopleAudienceFilled />,
      url: Navigation_Routes.meeting_type,
    },
    {
      id: "11",
      label: "fiscal_year",
      value: "fiscalYear",
      icon: <CalendarLtr20Filled />,
      url: Navigation_Routes.fiscal_year,
    },
    {
      id: "12",
      label: "allowance_type",
      value: "allowanceType",
      icon: <ReceiptMoney20Filled />,
      url: Navigation_Routes.allowance_type,
    },
    {
      id: "13",
      label: "document_type",
      value: "documentType",
      icon: <Document10020Filled />,
      url: Navigation_Routes.document_type,
    },
    {
      id: "14",
      label: "allowance_setup",
      value: "allowance",
      icon: <Document10020Filled />,
      url: Navigation_Routes.setup_allowance,
    },
    {
      id: "15",
      label: "telephone_allowance",
      value: "telephoneAllowance",
      icon: <Phone12Filled />,
      url: Navigation_Routes.telephone_allowance,
    },
  ];

  const handleSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.tabListContainer}>
        <TabList
          tabs={tabList || []}
          onTabSelect={handleSelect}
          selectedValue={selectedValue}
          vertical
        />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default SetupPage;
