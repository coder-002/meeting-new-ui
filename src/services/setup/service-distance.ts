import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import instance from "../api-service";
import { api } from "../api-list";
import { IDistance } from "../../models/setup/distance/distance";

const postAllDistance=(distanceData:IDistance)=>{
  return instance.post(api.setup.distance.postAllDistance,distanceData);
}
const usePostAllDistance=()=>{
   const queryClient = useQueryClient();
   return useMutation(postAllDistance, {
     onSuccess: () => {
       queryClient.invalidateQueries(api.setup.distance.postAllDistance);
     },
   });
}
const getDistanceFilter = (props: IPagination) => {
  return instance.post(api.setup.distance.getDistancePagination, props);
};

const useGetDistanceFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getDistanceFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.setup.distance.getDistancePagination);
    },
  });
};

export { useGetDistanceFilter, usePostAllDistance};
