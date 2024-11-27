import { useQuery } from "react-query";
import { api } from "../api-list";
import instance from "../api-service";
import { ITelephoneAllowance } from "../../models/setup/telephoneallowance/telephoneallowance";

const getTelephoneAllowance = () => {
  return instance.get<ITelephoneAllowance[]>(
    api.setup.telephone_allowance.getTelephoneallowancePagination
  );
};

const useGetTelephoneAllowance = () => {
  return useQuery(
    api.setup.telephone_allowance.getTelephoneallowancePagination,
    getTelephoneAllowance,
    {
      onSuccess: (data) => data.data,
      onError: (e) => console.log(e),
    }
  );
};

export { useGetTelephoneAllowance };
