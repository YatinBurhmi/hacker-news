import React from "react";
import { Button, Card } from "react-bootstrap";

function CreateCard(props) {
  var level = props.contact.level;
  var indent = level * 50;
  var indentForCard = `${indent}px`;
  console.log(props)
  return (
    <Card >
      <div style={{ position: "relative", left: indentForCard, width: 900 }}>
        <b
          style={{
            fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
            color: "#b92c27"
          }}
        >
          {props.contact.by}
        </b>
        <br />
        <span style={{ fontSize: "x-small" }}>{props.contact.time}</span>
        <br />
        <b style={{ fontSize: "small" }}>{props.contact.text}</b>
        <br />
        <Button
          variant="Light"
          style={{ outlineColor: "none" }}
          onClick={() =>
            props.function(props.contact.object, props.contact.level)
          }
        >
          More Comment
        </Button>
      </div>
    </Card>
  );
}

export default CreateCard;
