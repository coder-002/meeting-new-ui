import { useMutation, useQuery, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";
import { IBranch } from "../../models/setup/branch/branch";



const getOtherAllowencFilter = (props: IPagination) => {
  return instance.post(
    api.setup.otherallowancesetup.getOtherAllowancePagination,
    props
  );
};

const useGetOtherAllowancefilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getOtherAllowencFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        api.setup.otherallowancesetup.getOtherAllowancePagination
      );
    },
  });
};

export { useGetOtherAllowancefilter};
