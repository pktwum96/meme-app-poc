import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./routes/HomePage";
import Root from "./routes/Root";
import SearchPage from "./routes/SearchPage";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    path: "/",
    element: <Root />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
