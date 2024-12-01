import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";
import { IMeetingType } from "../../models/setup/meetingtype/meetingtype";

const postAllMeetingtype = (meetingtypeData: IMeetingType) => {
  return instance.post(
    api.setup.meeting_type.postAllMeetingtype,
    meetingtypeData
  );
};
const usePostAllMeetingtype = () => {
  const queryClient = useQueryClient();
  return useMutation(postAllMeetingtype, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.setup.meeting_type.postAllMeetingtype);
    },
  });
};

const getMeeting_typeFilter = (props: IPagination) => {
  return instance.post(api.setup.meeting_type.getMeetingtypePagination, props);
};

const useGetMeetingtypefilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getMeeting_typeFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        api.setup.meeting_type.getMeetingtypePagination
      );
    },
  });
};
export { useGetMeetingtypefilter, usePostAllMeetingtype };
