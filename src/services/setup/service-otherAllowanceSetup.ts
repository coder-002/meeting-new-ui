import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../api-list";
import instance from "../api-service";
import { IOtherAllowance } from "../../models/setup/OtherAllowance/otherAllowance";

const postOtherAllowance = (otherallowanceData: IOtherAllowance) => {
  return instance.post(
    api.setup.otherallowancesetup.postOtherAllowance,
    otherallowanceData
  );
};
const usePostOtherAllowance = () => {
  const queryClient = useQueryClient();
  return useMutation(postOtherAllowance, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        api.setup.otherallowancesetup.postOtherAllowance
      );
    },
  });
};
const getOtherAllowance = () => {
  return instance.get<IOtherAllowance[]>(
    api.setup.otherallowancesetup.getOtherAllowance
  );
};

const useGetOtherAllowance = () => {
  return useQuery(
    api.setup.otherallowancesetup.getOtherAllowance,
    getOtherAllowance,
    {
      onSuccess: (data) => data.data,
      onError: (error) => console.error(error),
    }
  );
};

export { useGetOtherAllowance, usePostOtherAllowance };
