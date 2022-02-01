import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import TypingMessage from "./TypingMessage";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import INITIAL_BOTTY_MESSAGE from "../../../common/constants/initialBottyMessage";
import "../styles/_messages.scss";

//Inicialización de socketio, con la direccion de Botty server
const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

//Constantes de identificacion
const ME = "me";
const BOT = "bot";

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);

  //Context para guardar el ultimo mensaje
  const { setLatestMessage } = useContext(LatestMessagesContext);

  //Mensaje actual
  const [message, setMessage] = useState("");

  //Lista de mensajes total
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      user: BOT,
      message: INITIAL_BOTTY_MESSAGE,
    },
  ]);

  const [botTyping, setBotTyping] = useState(false);

  //Hook para recepcion de mensajes de bot
  useEffect(() => {
    socket.on("bot-message", (message) => {
      setBotTyping(false);

      setMessages([...messages, { message, user: BOT, id: Date.now() }]);

      setLatestMessage(BOT, message);
    });
  }, [messages]);

  //Hook para muestreo de escritura por parte del bot
  useEffect(() => {
    socket.on("bot-typing", () => {
      setBotTyping(true);
    });
  }, []);

  //funcion de envío
  const sendMessage = () => {
    setMessages([...messages, { id: Date.now(), user: ME, message: message }]);

    socket.emit("user-message", message);

    setLatestMessage(ME, message);

    setMessage("");

    document.getElementById("user-message-input").value = "";
  };

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {messages.map((message, index) => (
          <Message
            nextMessage={messages[index + 1]}
            message={message}
            botTyping={botTyping}
          />
        ))}
      </div>
      {botTyping ? <TypingMessage /> : null}
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={(e) => setMessage(e.target.value)}
      />
    </div>
  );
}

export default Messages;
