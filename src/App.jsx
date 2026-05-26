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
          <div>
            <p style={{ textAlign: 'center', color: 'green', margin: '10px 0' }}>
              Logged in as: {email}
            </p>
            <TodosPage token={token} />
          </div>
        ) : (
          <Logon onSetEmail={setEmail} onSetToken={setToken} />
        )}
      </main>
    </>
  );
}
