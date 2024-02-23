import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onLoginClicked }: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onLoginClicked}>Log In</Button>
    </>
  );
}

export default NavBarLoggedOutView;