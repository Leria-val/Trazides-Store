import React, { useEffect } from 'react'

export default function Toast({ id, message, type = 'info', onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(id), 3000)
    return () => clearTimeout(t)
  }, [id, onClose])

  const bg =
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'

  return (
    <div className={`fixed right-5 top-5 z-40 ${bg} text-white rounded-lg shadow-lg p-3 px-4 m-2`}>
      <div className="flex items-center gap-3">
        <div className="font-semibold">{type === 'success' ? 'Sucesso' : type === 'error' ? 'Erro' : 'Info'}</div>
        <div className="text-sm opacity-90">{message}</div>
      </div>
    </div>
  )
}
