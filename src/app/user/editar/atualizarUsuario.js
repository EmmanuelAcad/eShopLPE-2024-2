"use server";

import { atualizarUsuarioDB } from "@/componentes/bd/usecases/usuarioUseCases";

export const atualizarUsuario = async (formData) => {
  const objeto = {
    email: formData.get("email"),
    nome: formData.get("nome"),
    telefone: formData.get("telefone"),
    senha: formData.get("senha"),
  };

  await atualizarUsuarioDB(objeto);
};
