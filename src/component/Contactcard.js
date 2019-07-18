import React from 'react';

function CreateCard(props){
  var level = props.contact.level;
  var indent = (level)*40;
  var indentForCard = `${indent}px`
  return(
      <div style={{
        position:"relative",
        left:indentForCard,
        width:"70%"
      }}>
      <h1>{props.contact.by}</h1>
      <span>{props.contact.time}</span>
      <p>{props.contact.text}</p>
      <button onClick={()=>props.function(props.contact.object,props.contact.level)}>load 2nd level </button>
      </div>
  )
}

export default CreateCard