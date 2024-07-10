import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "src/components/NavBar/NavBar";
import Notifications from "src/components/Notifications/Notifications";

import {
  HomePage,
  LoginPage,
  RegisterPage,
  RoutineDetails,
  RoutinePage,
  UserPage,
  ExplorePage,
  ExercisePage,
  NotFoundPage,
  CommunityPage,
  FavoritesPage,
  ResetPasswordPage
} from "src/pages";

import ProtectedRoute from "src/utils/ProtectedRoutes";
import { WebSocketProvider } from "src/store/WebSocketContext";

import "./App.css";

function App() {
  const location = useLocation();

  // check login or register page
  const hideNavBar =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/reset-password";

  return (
    <div className='main-container'>
        {!hideNavBar && <NavBar />} {/*hide navbar on login and register page*/}
        <WebSocketProvider>
          {!hideNavBar && <Notifications />}
        </WebSocketProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/users/:id' element={<UserPage />} />
            <Route path='/routines/:id' element={<RoutineDetails />} />
            <Route path='/routines' element={<RoutinePage />} />
            <Route path='/routines/:id' element={<RoutineDetails />} />
            <Route path='/exercises/:id' element={<ExercisePage />} />
            <Route path='/community' element={<CommunityPage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
          </Route>
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
  );
}

export default App;
