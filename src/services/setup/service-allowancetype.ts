import { api } from "../api-list";
import instance from "../api-service";
import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";

const fetchAllowanceTypeWithPagination = (props: IPagination) => {
  return instance.post(api.setup.AllowanceType.getAllowancePAgination, props);
};

const useGetAllowanceTypeFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchAllowanceTypeWithPagination, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        api.setup.AllowanceType.getAllowancePAgination
      );
    },
  });
};

export { useGetAllowanceTypeFilter };
