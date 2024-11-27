export const api = {
  dashboard: {
    getTodaysMeeting: "/dashboard/todaysmeeting",
    getUpcomingMeeting: "/dashboard/upcomingmeetings",
    getPastMeeting: "/dashboard/pastmeetings",
  },
  setup: {
    organization: {
      get: "/org",
    },
    fiscalyear: {
      getFiscalyearPagination: "/fiscalyear/all",
    },
    telephone_allowance: {
      getTelephoneallowancePagination: "/allowance/telephone-allowance",
    },
    meeting_type: {
      getMeetingtypePagination: "/meetingtype/filter",
    },
    unit: {
      get: "/org/units",
      post: "/org/unit",
      getUnitPagination: "/org/unit/filter",
    },
    user: {
      getUserPagination: "/user/filter",
    },
    branch: {
      getAllBranches: "/org/branches",
      getBranchPagination: "/org/branch/filter",
    },
    committee: {
      getCommitteePagination: "/committee/filter",
    },
    designation: {
      getDesignationPagination: "/designation/filter",
    },
    deduction: {
      getDeductionPagination: "/deduct/filter",
    },
    distance: {
      getDistancePagination: "/distance/filter",
    },
    committeetype: {
      getAllCommittee: "/org/committee",
      getCommitteetypePagination: "/committeetype/filter",
    },
    otherallowancesetup: {
      getOtherAllowance: "/allowance/normal",
    },
    AllowanceType: {
      getAllowancePAgination: "/allowancetype/filter",
    },
    documentType: {
      getDocumentPagination: "/documenttype/filter",
    },
  },
};
