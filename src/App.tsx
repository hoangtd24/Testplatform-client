import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { privateRoutes, publicRoutes } from "./routes";
import PrivateOutLet from "./routes/PrivateOutLet";
import { useAuth } from "./context/UserContext";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      {isAuthenticated ? (
        <Routes>
          <Route element={<PrivateOutLet />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
      {/* </Route> */}
    </div>
  );
}

export default App;
