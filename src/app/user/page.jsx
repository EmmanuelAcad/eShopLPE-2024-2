"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const User = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = () => {
    router.push("/user/editar");
  };

  return (
    <>
      <h1>Usuário autenticado</h1>
      {session ? (
        <>
          <h2>Email: {session.user.email}</h2>
          <h2>Nome: {session.user.name}</h2>
          <h2>Telefone: {session.user.telefone}</h2>
          <button onClick={handleEdit} className="btn btn-primary">
            Editar Dados
          </button>
        </>
      ) : (
        <h2>Nenhum usuário autenticado</h2>
      )}
    </>
  );
};

export default User;
