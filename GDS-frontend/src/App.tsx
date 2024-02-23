import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import { User } from './models/user';
import * as GiftRedemption from './network/gift_redemption_api';
import NotFoundPage from './pages/NotFoundPage';
import RedeemPage from './pages/RedeemPage';
import styles from "./styles/App.module.css";

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await GiftRedemption.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />

        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path='/'
              element={<RedeemPage loggedInUser={loggedInUser} />}
            />
            <Route
              path='/*'
              element={<NotFoundPage />}
            />
          </Routes>
        </Container>

      {showLoginModal &&
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => { 
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      }
      </div>
    </BrowserRouter>
  );
}

export default App;
