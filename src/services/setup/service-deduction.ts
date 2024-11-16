import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import instance from "../api-service";
import { api } from "../api-list";

const getDeductionFilter = (props: IPagination) => {
  return instance.post(api.setup.deduction.getDeductionPagination, props);
};

const useGetDeductionFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getDeductionFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.setup.deduction.getDeductionPagination);
    },
  });
};

export { useGetDeductionFilter };
