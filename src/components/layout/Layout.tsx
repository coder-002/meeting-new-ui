import { ReactNode } from "react";
import Header from "../common/Header";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  content: {
    maxWidth: "100wv",
  },
});

const Layout = ({ children }: { children: ReactNode }) => {
  const styles = useStyles();
  return (
    <div>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
