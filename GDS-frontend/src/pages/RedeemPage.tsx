import { Container } from "react-bootstrap"
import RedeemPageLoggedInView from "../components/RedeemPageLoggedInView";
import RedeemPageLoggedOutView from "../components/RedeemPageLoggedOutView";
import styles from "../styles/RedeemPage.module.css"
import { User } from "../models/user"

interface RedeemPageProps {
  loggedInUser: User | null,
}

const RedeemPage = ({ loggedInUser }: RedeemPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser 
          ? <RedeemPageLoggedInView />
          : <RedeemPageLoggedOutView />
        }
      </>
      
    </Container>
  )
}

export default RedeemPage;