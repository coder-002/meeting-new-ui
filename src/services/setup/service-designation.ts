import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import instance from "../api-service";
import { api } from "../api-list";

const getDesignationFilter = (props: IPagination) => {
  return instance.post(api.setup.designation.getDesignationPagination, props);
};

const useGetDesignationFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getDesignationFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        api.setup.designation.getDesignationPagination
      );
    },
  });
};

export { useGetDesignationFilter };
