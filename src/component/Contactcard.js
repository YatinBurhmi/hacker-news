import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import Duration from '../api-functions/time'
function CreateCard(props) {
  var level = props.contact.level;
  var indent = level * 50;
  var indentForCard = `${indent}px`;
  var commentText = props.contact.text;
  return (
    <Fragment>
      <div
        className="media mb-3"
        style={{ position: "relative", left: indentForCard, width: 1000 }}
      >
        <div className="media-body p-2 shadow-sm rounded bg-light border">
          <small className="float-right text-muted">{Duration(props.contact.time)}</small>
          <h6 className="mt-0 mb-1">
            <img
              className="mr-3 bg-light rounded"
              width="48"
              height="48"
              src={`https://api.adorable.io/avatars/48/${
                props.contact.by
              }@adorable.io.png`}
              alt={props.contact.by}
            />
            {props.contact.by}
          </h6>
          <p
            dangerouslySetInnerHTML={{ __html: commentText }}
            style={{ fontSize: "small" }}
          />
          <Button
            variant="info"
            size="sm"
            onClick={() =>
              props.function(props.contact.object, props.contact.level)
            }
          >
            View Reply
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

export default CreateCard;
