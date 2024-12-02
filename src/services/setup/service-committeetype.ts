import { useMutation, useQuery,useQueryClient } from "react-query";
import { IPagination } from "../../models/pagination/pagination";
import { api } from "../api-list";
import instance from "../api-service";
import { ICommitteetype } from "../../models/setup/committee_type/committee_type";

const postCommitteeType = (committeetypeData: ICommitteetype) => {
  return instance.post(
    api.setup.committeetype.postCommitteetype,
    committeetypeData
  );
};
const usePostCommitteeType = () => {
  const queryClient = useQueryClient();
  return useMutation(postCommitteeType, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.setup.committeetype.postCommitteetype);
    },
  });
};


const getCommitteeType = () => {
  return instance.get(api.setup.committeetype.get);
};

const useGetCommitteeType = () => {
  return useQuery([api.setup.committeetype.get], getCommitteeType, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
    refetchOnWindowFocus: false,
  });
};

const getCommitteetypeFilter = (props: IPagination) => {
  return instance.post(
    api.setup.committeetype.getCommitteetypePagination,
    props
  );
};

const useGetCommittetypefilter = () => {
  const queryClient = useQueryClient();
  return useMutation(getCommitteetypeFilter, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        api.setup.committeetype.getCommitteetypePagination
      );
    },
  });
};
export {
  useGetCommittetypefilter,
  useGetCommitteeType,
  usePostCommitteeType,
};
