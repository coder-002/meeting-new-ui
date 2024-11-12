import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AuthContextProvider from "../contexts/AuthContextProvider";

interface Props {
  children: ReactNode | ReactNode[];
}
const queryClient = new QueryClient();
const Provider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <FluentProvider theme={teamsLightTheme}>
            <Layout>{children}</Layout>
          </FluentProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Provider;
