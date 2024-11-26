import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";

const getUserFilter=(props:IPagination)=>{
    return instance.post(api.setup.user.getUserPagination,props);
}

const useGetUserfilter=()=>{
    const queryClient=useQueryClient();
    return useMutation(getUserFilter,{
        onSuccess:()=>{
            queryClient.invalidateQueries(api.setup.user.getUserPagination);
        },
    });
};
export {useGetUserfilter};