import "./App.css";
import { useState } from 'react';
import Header from './shared/Header';
import TodosPage from './features/Todos/TodosPage';
import Logon from './features/Logon';

export default function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return (
    <>
      <Header token={token} onSetToken={setToken} onSetEmail={setEmail} />
      
      <main>
        {token ? (
          <TodosPage token={token} />
        ) : (
          <Logon onSetEmail={setEmail} onSetToken={setToken} />
        )}
      </main>
    </>
  );
}
