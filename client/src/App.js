import "./App.css";
import Router from "./shared/Router";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { initAmplitude } from "./utils/amplitude";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const queryClient = new QueryClient();
const theme = createTheme({
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 10,
          borderRadius: 20,
          backgroundColor: 'lightgray',
        },
        bar: {
          borderRadius: 20,
          backgroundImage: 'linear-gradient(45deg, #FFE050 35%, #FE801F 80%)',
        },
      },
    },
  },
});
function App() {
  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
