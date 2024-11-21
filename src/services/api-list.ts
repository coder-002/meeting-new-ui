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
    unit: {
      get: "/org/units",
      post: "/org/unit",
      getUnitPagination: "/org/unit/filter",
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
  },
};
