import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './styles.scss';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import SnackbarProvider from 'react-simple-snackbar';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <div className="wrapper prevent-select">
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chats" element={<App />} />
        </Routes>
      </SnackbarProvider>
    </div>
  </BrowserRouter>,
);
