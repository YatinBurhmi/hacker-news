import React, { Fragment } from "react";
import { Button, Card } from "react-bootstrap";

function CreateCard(props) {
  var level = props.contact.level;
  var indent = level * 50;
  var indentForCard = `${indent}px`;
  return (
    <Fragment>
      <p />
      <Card style={{backgroundColor:"#dadddf"}}>
        <div style={{ position: "relative", left: indentForCard, width: 900 }}>
          <img
            src={require("../images/images.png")}
            style={{ height: 40, width: 40, borderRadius: 50 }}
            alt=""
          />{" "}
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
            View Reply
          </Button>
        </div>
      </Card>
    </Fragment>
  );
}

export default CreateCard;
