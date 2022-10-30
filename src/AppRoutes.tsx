import { Routes, Route, useLocation } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ConfirmEmail } from "./pages/ConfirmEmail";
import { AccountActivated } from "./pages/AccountActivated";
import { Profile } from "./pages/Profile";
import { AuthGuard } from "./guards/AuthGuard";
import { NoAuthGuard } from "./guards/NoAuthGuard";
import { Page } from "./pages/InterestingThing/Page";
import { Page2 } from "./pages/InterestingThing/Page2";
import { Header } from "./components/Header";
import { AuthController } from "./pages/layouts/AuthController";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import { Home } from "./pages/Home";

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route
            element={
              <NoAuthGuard>
                <AuthController orientation={"LeftToRight"} />
              </NoAuthGuard>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/recover" element={<RecoverPassword />} />
          </Route>

          <Route
            element={
              <NoAuthGuard>
                <AuthController orientation={"RightToLeft"} />
              </NoAuthGuard>
            }
          >
            <Route path="/signup" element={<SignUp />} />
            <Route path="/active/:id" element={<ConfirmEmail />} />
            <Route path="/activated" element={<AccountActivated />} />
          </Route>

          <Route
            path="/profile"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />

          <Route path="/test" element={<Page />} />

          <Route path="/test2" element={<Page2 />} />
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
