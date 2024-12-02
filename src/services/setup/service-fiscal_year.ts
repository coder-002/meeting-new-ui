import { QueryClient, useMutation, useQuery } from "react-query";
import { api } from "../api-list";
import instance from "../api-service";
import { IFiscalyear } from "../../models/setup/fiscalyear/fiscalyear";

const postAllFiscalyear=(fiscalyearData:IFiscalyear)=>{
  return instance.post(api.setup.fiscalyear.postAllFiscalyear,fiscalyearData);
}
const usePostAllFiscalyear=()=>{
  const queryClient=new QueryClient();
  return useMutation(postAllFiscalyear,{
    onSuccess:()=>{
      queryClient.invalidateQueries(api.setup.fiscalyear.postAllFiscalyear);
    }
  })
}
const getAllFiscalyear = () => {
  return instance.get<IFiscalyear[]>(api.setup.fiscalyear.getFiscalyearPagination);
};

const useGetAllFiscalyear = () => {
  return useQuery(
    api.setup.fiscalyear.getFiscalyearPagination,
    getAllFiscalyear,
    {
      onSuccess: (data) => data.data,
    }
  );
};

export { useGetAllFiscalyear, usePostAllFiscalyear};
