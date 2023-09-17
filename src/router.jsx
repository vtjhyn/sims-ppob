import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import TopUp from "./pages/TopUp";
import Akun from "./pages/Akun";
import EditProfile from "./pages/EditProfile";
import ServiceTransaction from "./pages/ServiceTransaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/topup",
        element: <TopUp />,
      },
      {
        path: "/service",
        element: <ServiceTransaction />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/akun",
        element: <Akun />,
      },
      {
        path: "/editprofile",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registrasi",
    element: <Register />,
  },
  {
    path: "*",
    element: <div>NOT FOUND</div>,
  },
]);

export default router;
