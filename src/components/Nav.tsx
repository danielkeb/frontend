/** @jsxImportSource @emotion/react */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Define styled components
const Navbar = styled.div`
  background-color: #282c34; /* Dark background */
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  width: 100%; /* Full width */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Enhanced shadow */
  z-index: 1000; /* Ensure it stays above other content */
`;

const NavLink = styled(Link)`
  color: #61dafb; /* Light blue color */
  text-decoration: none;
  margin-right: 1rem;
  font-size: 1.2rem;
  font-weight: 500; /* Slightly bolder text */
  transition: color 0.3s, text-decoration 0.3s;
  
  &:hover {
    color: #ffffff; /* Change color on hover */
    text-decoration: underline;
  }
`;

// Define the Nav component
const Nav: React.FC = () => {
  return (
    <Navbar>
      <NavLink to="/">Logo</NavLink>
      <div style={{ paddingRight: '4rem' }}>
      <NavLink to="/">Home</NavLink>
        <NavLink to="/create">Register Song</NavLink>
        <NavLink to="/visualize">Visualize</NavLink>
        <NavLink to="/other">About</NavLink>
      </div>
    </Navbar>
  );
};

export default Nav;
