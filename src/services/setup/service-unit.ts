import { useMutation, useQuery, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";
import { IUnit } from "../../models/setup/unit/unit";

const postAllUnits=(unitData:IUnit)=>{
  return instance.post(api.setup.unit.post,(unitData));
}
const usePostAllUnits=()=>{
  const queryClient=useQueryClient();
  return useMutation(postAllUnits,{
    onSuccess:()=>{
      queryClient.invalidateQueries(api.setup.unit.post);
    }
  })
}
const getAllUnits = () => {
  return instance.get<IUnit[]>(api.setup.unit.get);
};

const useGetAllUnits = () => {
  return useQuery(api.setup.unit.get, getAllUnits, {
    onSuccess: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

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

export { useGetUnitFilter, useGetAllUnits, usePostAllUnits };
