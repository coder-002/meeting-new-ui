import Provider from "./providers/Provider";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

function App() {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;
