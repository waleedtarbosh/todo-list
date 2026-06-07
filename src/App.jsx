import "./App.css";
import Header from "./shared/Header";
import TodosPage from "./features/Todos/TodosPage";
import Logon from "./features/Logon";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const { isAuthenticated, email } = useAuth();

  return (
    <>
      <Header />

      <main>
        {isAuthenticated ? (
          <div>
            <p
              style={{ textAlign: "center", color: "green", margin: "10px 0" }}
            >
              Logged in as: {email}
            </p>
            <TodosPage />
          </div>
        ) : (
          <Logon />
        )}
      </main>
    </>
  );
}
