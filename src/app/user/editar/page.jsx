"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { atualizarUsuarioDB } from "@/componentes/bd/usecases/usuarioUseCases";
import { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Loading from "@/componentes/comuns/Loading";

const EditarUsuario = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      setUserData({
        email: session.user.email,
        nome: session.user.name,
        telefone: session.user.telefone,
      });
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, [session, status, router]);

  const handleUpdate = async (formData) => {
    "use server";
    const objeto = {
      email: formData.get("email"),
      nome: formData.get("nome"),
      telefone: formData.get("telefone"),
      senha: formData.get("senha"),
    };
    try {
      await atualizarUsuarioDB(objeto);
      router.push("/user");
    } catch (err) {
      throw new Error("Erro ao atualizar usuário: " + err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h2>Editar Dados do Usuário</h2>
      <form action={handleUpdate}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <FloatingLabel
                controlId="campoEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  defaultValue={userData.email}
                  name="email"
                  required
                  readOnly
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="campoNome"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  defaultValue={userData.nome}
                  name="nome"
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="campoTelefone"
                label="Telefone"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  defaultValue={userData.telefone}
                  name="telefone"
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="campoSenha"
                label="Nova Senha"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  name="senha"
                  placeholder="Nova Senha"
                />
              </FloatingLabel>
              <button type="submit" className="btn btn-success">
                Atualizar Dados
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditarUsuario;
