import { useQuery } from "react-query";
import { api } from "../api-list";
import instance from "../api-service";
import { IFiscalyear } from "../../models/setup/fiscalyear/fiscalyear";

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

export { useGetAllFiscalyear };
