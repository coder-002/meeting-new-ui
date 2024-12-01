import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../../models/pagination/pagination";
import instance from "../../api-service";
import { api } from "../../api-list";
import { ICommittee } from "../../../models/setup/committee/committee";

const postAllCommittee = (committeeData: ICommittee) => {
  return instance.post(api.setup.committee.postAllCommittee, (committeeData));
};
const usePostAllCommittee = () => {
  const queryClient = useQueryClient();
  return useMutation(postAllCommittee, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.setup.committee.postAllCommittee);
    },
  });
};

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

export { useGetCommitteeFilter, usePostAllCommittee };
