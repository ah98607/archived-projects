import React from "react";

const Title = (props) => {
  console.log(props);
  return (
    // We set the `style` prop using the props passed or some default values
    <h1
      style={{
        color: props.color || "black",
        textDecoration: props.textDecoration || "none",
        textAlign: props.textAlign || "left"
      }}
    >
      {props.children}
    </h1>
  );
};

export default Title;
