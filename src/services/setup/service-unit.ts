import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";

const getUnitFilter = (props: IPagination) => {
  return instance.post(api.setup.unit.getUnitPagination, props);
};

const useGetUnitFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getUnitFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.setup.unit.getUnitPagination);
    },
  });
};

export { useGetUnitFilter };
