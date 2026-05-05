'use client';

import styles from "./alert.module.css";

export default function ScreenAlerta({ReturnLogin}){
  return(
    <div className={styles.boxMain}>
        <div className={styles.boxAlert}>
          <span className={styles.boxAlert_title}>Opss!</span>
          <span className={styles.boxAlert_Message}>
            Seu "nick" precisa ter no minimo 6 caracteres.</span>
          <button className={styles.boxAlert_buttonEnter} onClick={()=>{ReturnLogin()}}>Entendi</button>
        </div>
    </div>
  );
}