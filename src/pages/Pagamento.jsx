import { useState } from "react";
import Credito from "../pagamentos/Credito";
import Debito from "../pagamentos/Debito";
import Pix from "../pagamentos/Pix"

export default function Pagamento() {
    const [selected, setSelect] = useState("");

    return (
        <>
            <h1>Pagamentos</h1>
            <select onChange={(e) => setSelect(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="credito">Crédito</option>
                <option value="debito">Débito</option>
                <option value="pix">Pix</option>
            </select>
            {selected === "credito" && <Credito/>}
            {selected === "debito" && <Debito/> }
            {selected === "pix" && <Pix/> }
        </>
    )
}