"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { atualizarUsuarioDB } from "@/componentes/bd/usecases/usuarioUseCases";

export const User = () => {
  const { data: session } = useSession();
  const [nome, setNome] = useState(session ? session.user.name : "");
  const [telefone, setTelefone] = useState(
    session ? session.user.telefone : ""
  );
  const [senha, setSenha] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const objeto = {
      email: session.user.email,
      nome,
      telefone,
      senha: senha,
    };

    try {
      await atualizarUsuarioDB(objeto);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar dados: " + error.message);
    }
  };

  return (
    <>
      <h1>Usuário autenticado</h1>
      {session ? (
        <>
          <h2>Email: {session.user.email}</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Telefone:</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Nova Senha:</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Atualizar Dados
            </button>
          </form>
        </>
      ) : (
        <h2>Nenhum usuário autenticado</h2>
      )}
    </>
  );
};

export default User;
