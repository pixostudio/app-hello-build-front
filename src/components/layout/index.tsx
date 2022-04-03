import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';
import { NavBar } from '../navBar';
import "./styles.scss";

function Layout(): JSX.Element {
  return (
    <div className="container">
      <div className="cardContainer">
        <NavBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
