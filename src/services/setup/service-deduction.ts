import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import instance from "../api-service";
import { api } from "../api-list";
import { IDeduction } from "../../models/setup/deduction/deduction";

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

const postDeduction = (deduction: IDeduction) => {
  return instance.post(api.setup.deduction.postDeduction, deduction);
};

const usePostDeduction = () => {
  const queryClient = useQueryClient();
  return useMutation(api.setup.deduction.postDeduction, postDeduction, {
    onSuccess: () =>
      queryClient.invalidateQueries(api.setup.deduction.getDeductionPagination),
  });
};

export { useGetDeductionFilter, usePostDeduction };
