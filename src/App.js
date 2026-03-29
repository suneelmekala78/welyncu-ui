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
import ChessGame from "./components/games/ChessGame";
import QuizGame from "./components/games/QuizGame";
import Connect4Game from "./components/games/Connect4Game";
import RPSGame from "./components/games/RPSGame";
import MathBattleGame from "./components/games/MathBattleGame";
import SinglePost from "./pages/SinglePost";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import CreatePage from "./pages/CreatePage";
import Startups from "./pages/Startups";
import StartupDetail from "./pages/StartupDetail";
import CreateStartup from "./pages/CreateStartup";
import Pitches from "./pages/Pitches";
import CreatePitch from "./pages/CreatePitch";
import Mentorships from "./pages/Mentorships";
import CreateMentorship from "./pages/CreateMentorship";
import BottomBar from "./components/bottombar/BottomBar";
import { useSelector } from "react-redux";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user ? (
    <>
      <Outlet />
      <BottomBar />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

const ProtectedRoute = ({ children, redirectTo }) => {
  const { user } = useSelector((state) => state.user);
  return user ? <Navigate to={redirectTo} replace /> : children;
};

function App() {
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
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/job/:id/applications" element={<JobApplications />} />
          <Route path="/page/:id" element={<CompanyProfile />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/chat" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />

          <Route path="/resumes" element={<Resumes />} />
          <Route path="/resume/edit/:id" element={<EditResume />} />
          <Route path="/resume/:id" element={<ViewResume />} />

          <Route path="/startups" element={<Startups />} />
          <Route path="/startup/:id" element={<StartupDetail />} />
          <Route path="/create-startup" element={<CreateStartup />} />

          <Route path="/pitches" element={<Pitches />} />
          <Route path="/create-pitch" element={<CreatePitch />} />

          <Route path="/mentorships" element={<Mentorships />} />
          <Route path="/create-mentorship" element={<CreateMentorship />} />

          <Route path="/games" element={<AllGames />} />
          <Route path="/game/tictactoe" element={<TicTocToe />} />
          <Route path="/game/chess" element={<ChessGame />} />
          <Route path="/game/quiz" element={<QuizGame />} />
          <Route path="/game/connect4" element={<Connect4Game />} />
          <Route path="/game/rps" element={<RPSGame />} />
          <Route path="/game/mathbattle" element={<MathBattleGame />} />
        </Route>

        <Route path="/terms-conditions" element={<TC />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
