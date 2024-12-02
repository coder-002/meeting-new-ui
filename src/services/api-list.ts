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
      postAllMeetingtype:"/meetingtype",
      getMeetingtypePagination: "/meetingtype/filter",
    },
    unit: {
      get: "/org/units",
      post: "/org/unit",
      getUnitPagination: "/org/unit/filter",
    },
    user: {
      postUser: "/user",
      getUserPagination: "/user/filter",
    },
    branch: {
      postBranch: "/org/branch",
      getAllBranches: "/org/branches",
      getBranchPagination: "/org/branch/filter",
    },
    committee: {
      postAllCommittee: "/committee",
      getCommitteePagination: "/committee/filter",
    },
    designation: {
      postAllDesignation:"/designation",
      getDesignationPagination: "/designation/filter",
    },
    deduction: {
      getDeductionPagination: "/deduct/filter",
      postDeduction: "/deduct",
    },
    distance: {
      postAllDistance:"/distance",
      getDistancePagination: "/distance/filter",
    },
    committeetype: {
      postCommitteetype:"/committeetype",
      get: "/committeetype/all",
      getAllCommittee: "/org/committee",
      getCommitteetypePagination: "/committeetype/filter",
    },
    otherallowancesetup: {
      postOtherAllowance: "/allowance",
      getOtherAllowance: "/allowance/normal",
    },
    AllowanceType: {
      getAllowanceTypePagination: "/allowancetype/filter",
      getAllAllowanceType: "/allowancetype/all",
      postAllAllowanceType:"/allowancetype"
    },
    documentType: {
      postDocument: "/documenttype",
      getDocumentPagination: "/documenttype/filter",
    },
  },
};
