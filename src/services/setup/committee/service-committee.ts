import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../../models/pagination/pagination";
import instance from "../../api-service";
import { api } from "../../api-list";

const getCommitteeFilter = (props: IPagination) => {
  return instance.post(api.setup.committee.getCommitteePagination, props);
};

const useGetCommitteeFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getCommitteeFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.setup.committee.getCommitteePagination);
    },
  });
};

export { useGetCommitteeFilter };
