import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chat from "./components/Chat";
import Join from "./components/Join";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Join />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

export default appRouter;
