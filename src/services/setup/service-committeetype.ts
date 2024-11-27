import { useMutation, useQuery, useQueries, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";

const getCommitteetypeFilter = (props: IPagination) => {
  return instance.post(
    api.setup.committeetype.getCommitteetypePagination,
    props
  );
};

const useGetCommittetypefilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getCommitteetypeFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        api.setup.committeetype.getCommitteetypePagination
      );
    },
  });
};
export { useGetCommittetypefilter, getCommitteetypeFilter };
