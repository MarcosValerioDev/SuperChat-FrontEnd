'use client';
import {useState} from "react";
import styles from "./styles.module.css";

export default function LoginSuperChat({Login}) {
 const [nick, setNickName] = useState("");
  return (
    <div className={styles.boxMain}>
      <div className={styles.boxLogin}>
        <span className={styles.boxLogin_title}>Super Chat</span>
        <div className={styles.boxLogin_input}>
          <label className={styles.boxLogin_nick}>Nick</label>
          <input className={styles.boxLogin_inputNick} placeholder=". . ." value={nick} onChange={(e)=>{ setNickName(e.target.value)}} />
          <button className={styles.boxLogin_buttonEnter} onClick={() => { Login(nick) }}>Entrar</button>
        </div>
      </div>
    </div>
  );
}