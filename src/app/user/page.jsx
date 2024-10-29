"use client";

import { useSession } from "next-auth/react";
import { autenticaUsuarioDB, atualizarUsuarioDB } from "@/componentes/bd/usecases/usuarioUseCases";

export default async function User() {
  const { data: session } = useSession();
  const usuario = await autenticaUsuarioDB;

  const atualizarUsuario = async (formData) => {
    'use server';
        const objeto = {
            email: formData.get('email'),
            senha: formData.get('senha'),
            telefone: formData.get('telefone'),
            tipo: 'U',
            nome: formData.get('nome')
        }
        try {
            await atualizarUsuarioDB(objeto);
        } catch (err) {
            throw new Error('Erro: ' + err);
        }
        revalidatePath('/user');
        redirect('/user');
    }

  return (
    <>
      <h1>Usuário autenticado</h1>
      <h2>{JSON.stringify(session)}</h2>
      <div defaultValue={usuario.email}></div>

      <form action={atualizarUsuario}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                              <div>
                                    <FloatingLabel controlId="campoEmail"
                                        label="Nome" className="mb-3">
                                        <Form.Control type="text"
                                            defaultValue={usuario.email} required
                                            name="nome" />
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="campoSenha"
                                        label="Senha" className="mb-3">
                                        <Form.Control type="password"
                                            defaultValue={usuario.senha} required
                                            name="senha" />
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="campoTelefone"
                                        label="Telefone" className="mb-3">
                                        <Form.Control type="number"
                                            defaultValue={usuario.telefone} required
                                            name="telefone" />
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="campoNome"
                                        label="Nome" className="mb-3">
                                        <Form.Control type="text"
                                            defaultValue={usuario.nome} required
                                            name="nome" />
                                    </FloatingLabel>
                                </div>
                                <div className="form-group text-center mt-3">
                                    <button type="submit" className="btn btn-success">
                                        Salvar <i className="bi bi-save"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </form>
    </>
  );
};

