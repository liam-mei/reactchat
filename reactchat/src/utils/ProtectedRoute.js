import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  // const { component: Component, ...rest } = props;
  console.log("auth route props", props)
  return (
    <Route
      // {...rest}
      path={props.path}
      render={(renderProps) => {
        if (localStorage.getItem("token")) {
          return props.render(renderProps);
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}
