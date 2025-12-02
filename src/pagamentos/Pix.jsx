import { useEffect, useState } from "react";

export default function Pix() {
  const [pixKey, setPixKey] = useState("");

  useEffect(() => {
    const randomKey = crypto.randomUUID();
    setPixKey(randomKey);
  }, []);

  return (
    <>
        <h1>Pix</h1>
        <p><strong>Chave PIX:</strong>{pixKey}</p>
    </>
  );
}
