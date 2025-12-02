import { useState } from "react";

export default function Credito() {
  const [cardNumber, setCardNumber] = useState("");
  const [parcelas, setParcelas] = useState(1);

  const valorCompra = 100; // coloque o valor real aqui

  function handleCardChange(e) {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    if (onlyNumbers.length <= 16) {
      setCardNumber(onlyNumbers);
    }
  }

  const juros = 0.12; // 12%

  // total COM juros (juros compostos)
  function calcularTotalComJuros() {
    const total = valorCompra * (1 + juros) ** (parcelas - 1);
    return total;
  }

  // valor de cada parcela
  function calcularValorParcela() {
    return calcularTotalComJuros() / parcelas;
  }

  function handleSend() {
    alert(`
Número do cartão: ${cardNumber}
Parcelas: ${parcelas}x
Total SEM juros: R$ ${valorCompra.toFixed(2)}
Total COM juros: R$ ${calcularTotalComJuros().toFixed(2)}
Valor de cada parcela: R$ ${calcularValorParcela().toFixed(2)}
    `);
  }

  return (
    <>
      <h1>Crédito</h1>

      {/* Número do cartão */}
      <input
        type="text"
        placeholder="Número do cartão"
        value={cardNumber}
        onChange={handleCardChange}
        maxLength={16}
      />

      {/* Parcelamento */}
      <select value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))}>
        {[...Array(10)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}x
          </option>
        ))}
      </select>

      {/* Valores */}
      <p><strong>Total sem juros:</strong> R$ {valorCompra.toFixed(2)}</p>
      <p><strong>Total com juros:</strong> R$ {calcularTotalComJuros().toFixed(2)}</p>
      <p><strong>Valor da parcela:</strong> R$ {calcularValorParcela().toFixed(2)}</p>

      <button onClick={handleSend}>Enviar</button>
    </>
  );
}
