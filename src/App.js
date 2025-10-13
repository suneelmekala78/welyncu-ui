import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Network from "./pages/Network";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CompanyProfile from "./pages/CompanyProfile";
import Messages from "./pages/Messages";
import PageNotFound from "./pages/PageNotFound";
import Notifications from "./pages/Notifications";
import TC from "./pages/TC";
import Resumes from "./pages/Resumes";
import EditResume from "./pages/EditResume";
import ViewResume from "./pages/ViewResume";
import JobApplications from "./pages/JobApplications";
import PostJob from "./pages/PostJob";
import AllGames from "./pages/AllGames";
import TicTocToe from "./components/games/TicTocToe";
import SinglePost from "./pages/SinglePost";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import CreatePage from "./pages/CreatePage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RespondInvite from "./components/games/RespondInvite";

import io from "socket.io-client";

const socket = io("http://localhost:8900");

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

const ProtectedRoute = ({ children, redirectTo }) => {
  const { user } = useSelector((state) => state.user);
  return user ? <Navigate to={redirectTo} replace /> : children;
};

function App() {
  const [invitation, setInvitation] = useState(null);

  useEffect(() => {
    socket.on("receiveInvitation", (data) => {
      setInvitation(data);
    });

    return () => {
      socket.off("receiveInvitation");
    };
  }, []);

  // const acceptInvite = () => {
  //   socket.emit("acceptInvitation", {
  //     gameId: invitation.gameId,
  //     inviterId: invitation.inviter,
  //   });
  //   setInvitation(null);
  //   window.location.href = `/tic-tac-toe/${invitation.gameId}`;
  // };

  // const rejectInvite = () => {
  //   socket.emit("rejectInvitation", {
  //     inviterId: invitation.inviter,
  //   });
  //   setInvitation(null);
  // };

  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={
            <ProtectedRoute redirectTo="/">
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute redirectTo="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <ProtectedRoute redirectTo="/">
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verifyotp"
          element={
            <ProtectedRoute redirectTo="/">
              <VerifyOTP />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <ProtectedRoute redirectTo="/">
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/network" element={<Network />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job" element={<JobDetails />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/post" element={<SinglePost />} />
          <Route path="/job/applications" element={<JobApplications />} />
          <Route path="/company" element={<CompanyProfile />} />
          <Route path="/page/:id" element={<CompanyProfile />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/chat" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />

          <Route path="/resumes" element={<Resumes />} />
          <Route path="/resume/edit" element={<EditResume />} />
          <Route path="/resume/:id" element={<ViewResume />} />

          <Route path="/games" element={<AllGames />} />
          <Route path="/game/tictactoe" element={<TicTocToe />} />
        </Route>

        <Route path="/terms-conditions" element={<TC />} />
        <Route path="*" element={<PageNotFound />} />

        {invitation && <RespondInvite />}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
