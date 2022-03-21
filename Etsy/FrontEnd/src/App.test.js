import { render, screen } from '@testing-library/react';
import LoginForm from './components/loginSignup/login';
import ShopPage from './components/Shop/ShopPage';
import ShopName from './components/Shop/ShopName';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';


test('renders Login Page', () => {
  render(<LoginForm />);
  const emailAddress = screen.getByText("Email address");
  const password = screen.getByText("Password");
  expect(emailAddress).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test('renders Shop Name Page', () => {
  render(<BrowserRouter><ShopName /></BrowserRouter>);
  const text = screen.getByText("Name Your Shop");
  expect(text).toBeInTheDocument();
});

test('renders Shop Page', () => {
  render(<BrowserRouter><ShopPage /></BrowserRouter>);
  const shopOwner = screen.getByText("SHOP OWNER");
  const shopItems = screen.getByText("SHOP OWNER");
  expect(shopOwner).toBeInTheDocument();
  expect(shopItems).toBeInTheDocument();
});

test('renders Search Page', () => {
  render(<BrowserRouter><SearchPage/></BrowserRouter>);
  const search = screen.getByText("Search Results");
  expect(search).toBeInTheDocument();
});

