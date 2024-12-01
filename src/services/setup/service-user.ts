import { QueryClient, useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";
import { IUser } from "../../models/setup/user/user";

const postUser=(userData:IUser)=>{
    return instance.post(api.setup.user.postUser,userData);
}
const usepostUser=()=>{
    const queryClient=new QueryClient();
    return useMutation(postUser,{
        onSuccess:()=>{
            queryClient.invalidateQueries(api.setup.user.postUser);
        },
    });
};

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
export { useGetUserfilter,usepostUser };