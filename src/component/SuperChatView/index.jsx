'use client';
import { useState, useRef, useEffect } from "react"
import MessageOwner from "../MessageOwner";
import MessageOther from "../MessageOther";

export default function SuperChatView({ userId, nickName }) {
  const socketRef = useRef(null);
  const cathDivRef = useRef(null);
  const inputMessageRef = useRef(null);
  const [chatId, setChatId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("desconectado");

  //para reagir ao message alterado
  useEffect(() => {
    console.log("Messages Count: " + messages.length)
    messages.forEach(function (elemento, indice, array) {
      console.log(elemento);
      // Ação a ser executada para cada elemento
    });
    // const chatDiv = cathDivRef.getElementById('suaDiv');


    cathDivRef.current.scrollTo({
      top: cathDivRef.current.scrollHeight,
      behavior: 'smooth' // Rola suavemente
    });

  }, [messages]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket conectado");
      setStatus("conectado");
    };

    socket.onmessage = (event) => {
      console.log("Mensagem recebida:", event.data);
      //  if (prev.length > 500) return [...prev.slice(-500), event.data];
      const msgData = JSON.parse(event.data);
      setMessages((prev) => [...prev, msgData]);
    };

    socket.onerror = (err) => {
      console.log("WebSocket erro:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket desconectado");
      setStatus("desconectado");
    };

    return () => {
      socket.close();
    };
  }, []);

  function sendMessage() {
    console.log(input)
    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      var objMessage = {
        type: chatId,
        userId,
        nickName,
        message: input,
      }

      var messageData = JSON.stringify(objMessage)
      socketRef.current.send(messageData);
      setInput("");
      inputMessageRef.current.value = "";
    }
  }

  function RenderMessage(element, index) {
    if (element.type != chatId) return;
    return element.userId == userId ? <MessageOwner key={index} message={element.message} /> : <MessageOther key={index} name={element.nickName} message={element.message} />
  }

  return (
    <div style={{
      position: "relative",
      height: "100vh",
      width: "600px",
      backgroundColor: "#111827",
      padding: "1%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      boxSizing: "border-box",
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: "calc(100% - 100px)",
        display: "flex",
        flexDirection: "row",
      }}>
        <div style={{
          width: "200px",
          height: "100%",
          display: "block",
          backgroundColor: "#0b0c0f",
          marginRight: "6px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}>
          <span className={"titleCollum"}>Rooms</span>
          <div className={"boxroom"}>
            <div className={"room"} onClick={() => { setChatId(0) }}>
              Programação
            </div>
            <div className={"room"} onClick={() => { setChatId(1) }}>
              IA
            </div>
            <div className={"room"} onClick={() => { setChatId(2) }}>
              JavaScript
            </div>
            <div className={"room"} onClick={() => { setChatId(3) }}>
              C#
            </div>
            <div className={"room"} onClick={() => { setChatId(4) }}>
              Games
            </div>
          </div>
        </div>
        <div style={{
          backgroundColor: "#0b0c0f",
          width: "100%",
          height: "100%",
          display: "block",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}>
          <span className={"titleCollum"}>Chat</span>
          <div ref={cathDivRef} style={{
            boxSizing: "border-box",
            width: "100%",
            marginTop: "4px",
            height: "calc(100% - 34px)",
            display: "block",
            backgroundColor: "#0b0c0f",
            overflowX: "hidden",
            overflowY: "scroll"
          }}>
            {
              messages.length > 0
                ? messages.map((element, index) => (
                  RenderMessage(element, index)
                )) : ""
            }

          </div>
        </div>
      </div>
      <div style={{
        position: "relative",
        width: "calc(100% - 6px)",
        height: "106px",
        display: "block",
        backgroundColor: '#0b0c0f',
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
      }}>
        <span className={"titleBoxSend"}>Message</span>
        <input ref={inputMessageRef} className={"inputMessage"} placeholder="Message . . ." onChange={(e) => { setInput(e.target.value) }}>
        </input>
        <div className="buttonSend" onClick={() => { sendMessage() }}>
          Send
        </div>
      </div>
    </div>
  );
}