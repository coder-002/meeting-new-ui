import { api } from "../api-list";
import instance from "../api-service";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { IAllowanceType } from "../../models/setup/allowance_type/allowance_type";

const postAllowanceType=(allowancetypeData:IAllowanceType)=>{
  return instance.post(
    api.setup.AllowanceType.postAllAllowanceType,
    allowancetypeData
  );
}
const usePostAllowanceType=()=>{
  const queryClient=new QueryClient();
  return useMutation(postAllowanceType,{
    onSuccess:()=>{
      queryClient.invalidateQueries(api.setup.AllowanceType.postAllAllowanceType);
    }
  })
}
const getAllAllowanceType = () => {
  return instance.get(api.setup.AllowanceType.getAllAllowanceType);
};

const useGetAllAllowanceType = () => {
  return useQuery(
    api.setup.AllowanceType.getAllAllowanceType,
    getAllAllowanceType,
    {
      onSuccess(data) {
        return data.data;
      },
    }
  );
};
const fetchAllowanceTypeWithPagination = (props: IPagination) => {
  return instance.post(
    api.setup.AllowanceType.getAllowanceTypePagination,
    props
  );
};

const useGetAllowanceTypeFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchAllowanceTypeWithPagination, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        api.setup.AllowanceType.getAllowanceTypePagination
      );
    },
  });
};

export {
  useGetAllowanceTypeFilter,
  useGetAllAllowanceType,
  usePostAllowanceType,
};
