import { useQuery } from "react-query";
import { api } from "../api-list";
import instance from "../api-service";

const getUpcomingMeeting = () => {
  return instance.get(api.dashboard.getUpcomingMeeting);
};
const useGetUpcomingMeeting = () => {
  return useQuery(api.dashboard.getUpcomingMeeting, getUpcomingMeeting, {
    onSuccess: (data) => data.data,
    onError: (e) => console.log(e),
  });
};

export { useGetUpcomingMeeting };
