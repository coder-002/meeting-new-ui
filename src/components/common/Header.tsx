import {
  Button,
  Input,
  Toolbar,
  ToolbarDivider,
} from "@fluentui/react-components";

const Header = () => {
  return (
    <div>
      <h1>Home</h1>
      <Toolbar>
        <Input
          size="medium"
          placeholder={"search"}
          // contentAfter={<Search16Regular />}
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
