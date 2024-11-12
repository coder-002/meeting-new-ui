import {
  Body1Stronger,
  Button,
  Input,
  makeStyles,
  Toolbar,
  ToolbarDivider,
} from "@fluentui/react-components";
import { BiSearch } from "react-icons/bi";

const useStyles = makeStyles({
  nav: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const Header = () => {
  const styles = useStyles();
  return (
    <div className={styles.nav}>
      <Body1Stronger>Home</Body1Stronger>
      <Toolbar>
        <Input
          size="medium"
          placeholder={"search"}
          contentAfter={<BiSearch />}
          style={{ border: 0 }}
        />

        <ToolbarDivider />
        <Button
          appearance="transparent"
          //   onClick={changeLocale}
          icon={"🇳🇵"}
        ></Button>
        <ToolbarDivider />
      </Toolbar>
    </div>
  );
};

export default Header;
