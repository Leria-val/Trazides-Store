import { useState } from "react";

export default function Debito() {
  const [cardNumber, setCardNumber] = useState("");

  function handleChange(e) {
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    if (onlyNumbers.length <= 16) {
      setCardNumber(onlyNumbers);
    }
  }

  function handleSend() {
    alert("Cartão enviado: " + cardNumber);
  }

  return (
    <>
      <h1>Débito</h1>

      <input
        type="text"
        placeholder="Número do cartão"
        value={cardNumber}
        onChange={handleChange}
        maxLength={16}
      />

      <button onClick={handleSend}>Enviar</button>
    </>
  );
}
