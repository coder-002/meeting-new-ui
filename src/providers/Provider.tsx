import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";

interface Props {
  children: ReactNode | ReactNode[];
}
const queryClient = new QueryClient();
const Provider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FluentProvider theme={teamsLightTheme}>
          <Layout>{children}</Layout>
        </FluentProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Provider;
