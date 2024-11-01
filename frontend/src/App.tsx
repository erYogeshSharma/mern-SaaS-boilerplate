import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store/store";
import AppRoutes from "./routes";
import ColorModeContext from "./contexts/themeContext";
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "./config/theme";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
const persistor = persistStore(store);
function App() {
  const [mode, setMode] = React.useState<"light" | "dark">(
    (localStorage.getItem("colorMode") as "dark") || "light"
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("colorMode", mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const theme = React.useMemo(
    () => responsiveFontSizes(createTheme(getTheme(mode))),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <CssBaseline />
            <AppRoutes />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
