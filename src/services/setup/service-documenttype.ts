import { useMutation, useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import instance from "../api-service";
import { api } from "../api-list";

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

export { useGetDocumentTypeFilter };
