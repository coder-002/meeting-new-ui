import { useMutation, useQuery, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";
import { IBranch } from "../../models/setup/branch/branch";

const getAllBranches = () => {
  return instance.get<IBranch[]>(api.setup.branch.getAllBranches);
};

const useGetAllBranches = () => {
  return useQuery(api.setup.branch.getAllBranches, getAllBranches, {
    onSuccess: (data) => data.data,
  });
};

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

export { useGetBranchfilter, useGetAllBranches };
