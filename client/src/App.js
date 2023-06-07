import "./App.css";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppContent from "./AppContent";

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
  return (
    <div>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <AppContent />
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
