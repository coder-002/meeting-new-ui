import { useQuery } from "react-query";
import { api } from "../api-list";
import instance from "../api-service";
import { IOrganization } from "../../models/setup/organization/organization";

const getOrganization = () => {
  return instance.get<IOrganization>(api.setup.organization.get);
};

const useGetOrganization = () => {
  return useQuery(api.setup.organization.get, getOrganization, {
    onSuccess: (data) => data.data,
    onError: (error) => console.error(error),
    refetchOnWindowFocus: false,
  });
};

export { useGetOrganization };
