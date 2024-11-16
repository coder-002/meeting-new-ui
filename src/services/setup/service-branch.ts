import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";

const getBranchFilter = (props: IPagination) => {
  return instance.post(api.setup.branch.getBranchPagination, props);
};

const useGetBranchfilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getBranchFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.setup.branch.getBranchPagination);
    },
  });
};

export { useGetBranchfilter };
