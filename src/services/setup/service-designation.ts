import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import instance from "../api-service";
import { api } from "../api-list";
import { IDesignation } from "../../models/setup/designation/designation";

const postAllDesignation = (designationData: IDesignation) => {
  return instance.post(
    api.setup.designation.postAllDesignation,
    designationData
  );
};
const useAllDesignation = () => {
  const queryClient = useQueryClient();
  return useMutation(postAllDesignation, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.setup.designation.postAllDesignation);
    },
  });
};

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

export { useGetDesignationFilter, useAllDesignation };
