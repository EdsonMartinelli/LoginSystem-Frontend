import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ConfirmEmail } from "./pages/ConfirmEmail";
import { AccountActivated } from "./pages/AccountActivated";
import { Profile } from "./pages/Profile";
import { AuthGuard } from "./guards/AuthGuard";
import { NoAuthGuard } from "./guards/NoAuthGuard";
import { AnimatedAuthRightToLeft } from "./animations/AnimatedAuthRighToLeft";
import { AnimatedAuthLeftToRight } from "./animations/AnimatedAuthLeftToRight";
import { Page } from "./pages/InterestingThing/Page";

/*

   You need to pass location, and key in Routes because frame-motion use
   this information internally in page animation transition and others
   animations.

*/

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />

      <Route element={<AnimatedAuthRightToLeft />}>
        <Route
          path="/login"
          element={
            <NoAuthGuard>
              <Login orientation={"RightToLeft"} />
            </NoAuthGuard>
          }
        />
        <Route
          path="/recover"
          element={
            <NoAuthGuard>
              <RecoverPassword orientation={"RightToLeft"} />
            </NoAuthGuard>
          }
        />
      </Route>

      <Route element={<AnimatedAuthLeftToRight />}>
        <Route
          path="/signup"
          element={
            <NoAuthGuard>
              <SignUp orientation={"LeftToRight"} />
            </NoAuthGuard>
          }
        />
        <Route
          path="/active/:id"
          element={
            <NoAuthGuard>
              <ConfirmEmail />
            </NoAuthGuard>
          }
        />
        <Route
          path="/activated"
          element={
            <NoAuthGuard>
              <AccountActivated />
            </NoAuthGuard>
          }
        />
      </Route>

      <Route
        path="/profile"
        element={
          <AuthGuard>
            <Profile />
          </AuthGuard>
        }
      />

      <Route path="/teste" element={<Page />} />
    </Routes>
  );
}

export default AppRoutes;
