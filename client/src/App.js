import "./App.css";
import Router from "./shared/Router";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { initAmplitude } from "./utils/amplitude";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
}

export default App;
