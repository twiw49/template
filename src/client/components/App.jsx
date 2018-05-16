import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import LandingPage from "./LandingPage";
import { connect } from "react-redux";
import { injectGlobal } from "styled-components";

injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`;

const App = props => {
  const { isLoggedIn } = props;

  if (isLoggedIn) {
    return (
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Redirect to={"/"} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path={"/"} component={LandingPage} />
      <Redirect to={"/"} />
    </Switch>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({ isLoggedIn: state.isLoggedIn });

export default connect(mapStateToProps, null)(App);
