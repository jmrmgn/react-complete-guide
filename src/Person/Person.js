import React from 'react';
import styles from './Person.css';

const person = (props) => {
   return (
      <div className={styles.Person}>
         <p>I'm a {props.name} and I am {props.age} years old!</p>
         <p>{props.children}</p>
         <input type="text" onChange={props.changed} value={props.name} />
         <br />
         <button className={styles.btnRemove} onClick={props.click}>Remove</button>
      </div>
   )
};

export default person;