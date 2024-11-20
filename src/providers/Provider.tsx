import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AuthContextProvider from "../contexts/AuthContextProvider";
import LocaleContextProvider from "../contexts/LocaleContextProvider";

interface Props {
  children: ReactNode | ReactNode[];
}
const queryClient = new QueryClient();
const Provider = ({ children }: Props) => {
  return (
    <LocaleContextProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <FluentProvider theme={teamsLightTheme}>
              <Layout>{children}</Layout>
            </FluentProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </LocaleContextProvider>
  );
};

export default Provider;
