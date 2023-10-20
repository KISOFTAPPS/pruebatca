import { render } from "preact";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
import { App } from "./app";

// Create a client
const queryClient = new QueryClient()

render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>,
    document.getElementById("app")
);
