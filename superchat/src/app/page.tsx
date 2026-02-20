'use client';

import { useState } from "react";
import  ScreenAlerta  from "../component/AlertSuperChat";
import  LoginSuperChat from "../component/LoginSuperChat";
import  SuperChatView  from "../component/SuperChatView";

export default function ContentCoreSuperChat(){
  const [userId, setUserId] = useState("");
  const [stateMachine, setStateMachine] = useState(0);
  const [nickName, setNickName] = useState("Marcos");
 

  function RenderContent(){
    switch (stateMachine) {
      case 0: return <LoginSuperChat Login = {Login}/>
      case 1: return <SuperChatView userId={userId} nickName={nickName}/>
      case 100: return <ScreenAlerta ReturnLogin = {ReturnLogin} />
      default: return null
    }
  }

    function Login(nick: string)
    {

      if (!nick){    
          // Cai aqui se for: null, undefined, "", 0, false ou NaN
          //Exibe modal
          setStateMachine(100);
          return;
      }

      if (nick.length<6) {
         setStateMachine(100);
          return;
      }
            setNickName(nick);
      setStateMachine(1);
      const newUuid = crypto.randomUUID();
      setUserId(newUuid);
    }

  function ReturnLogin(nick: string)
    {
          setStateMachine(0);
    }

    
return (
  <>
    {RenderContent()}
  </>
)
}