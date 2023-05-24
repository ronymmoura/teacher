"use client";

import axios from "axios";
import { useState } from "react";
import { MessageType, MessageTypeButton } from "./MessageTypeButton";

export function Teacher() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("to pt-br");

  const [loading, setLoading] = useState(false);

  async function handleGo() {
    try {
      setLoading(true);
      setResponse("");
      const { data: response } = await axios.post(
        "http://localhost:3000/api/corrector",
        {
          message,
          messageType,
        }
      );

      setResponse(response);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-[700px] flex-col items-center justify-center space-y-5 p-10">
      <input
        type="text"
        className="w-full rounded-md px-3 py-2 text-purple-600"
        placeholder="Say something here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <MessageTypeButton
          title="Translate to Portuguese"
          value="to pt-br"
          currentValue={messageType}
          onChange={setMessageType}
        />

        <MessageTypeButton
          title="Translate to English"
          value="to en"
          currentValue={messageType}
          onChange={setMessageType}
        />

        <MessageTypeButton
          title="Synonyms"
          value="synonyms"
          currentValue={messageType}
          onChange={setMessageType}
        />

        <MessageTypeButton
          title="Correct something"
          value="correct"
          currentValue={messageType}
          onChange={setMessageType}
        />
      </div>

      <button className="button" onClick={handleGo}>
        Go!
      </button>

      {loading && <>Carregando...</>}

      {response && (
        <textarea className="w-full flex-1 resize-none bg-transparent" disabled>
          {response}
        </textarea>
      )}
    </div>
  );
}
