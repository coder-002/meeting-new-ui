import { QueryClient, useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import instance from "../api-service";
import { api } from "../api-list";
import { IDocumentType } from "../../models/setup/document_type/document_type";

const postDocumentType=(documenttypeData:IDocumentType)=>{
  return instance.post(api.setup.documentType.postDocument, documenttypeData);
}
const usePostDocumentType=()=>{
  const queryClient=new QueryClient();
  return useMutation(postDocumentType,{
    onSuccess:()=>{
      queryClient.invalidateQueries(api.setup.documentType.postDocument);
    }
  })
}

const getDocumentFilter = (props: IPagination) => {
  return instance.post(api.setup.documentType.getDocumentPagination, props);
};

const useGetDocumentTypeFilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getDocumentFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        api.setup.documentType.getDocumentPagination
      );
    },
    onError: (error) => {
      console.error("Error fetching document types:", error);
    },
  });
};

export { useGetDocumentTypeFilter, usePostDocumentType };
