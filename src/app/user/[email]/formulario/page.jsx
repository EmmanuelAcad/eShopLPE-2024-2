import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';

import { autenticaUsuarioDB, atualizarUsuarioDB, autenticaUsuarioPorCodigoDB } from "@/componentes/bd/usecases/usuarioUseCases";

const FormularioPage = async ({ params }) => {

  let usuario = {};

  if (params.codigo == 0) {
    usuario = { email: "erro@erro.com", senha: "erro", tipo: "U", telefone: "erro", nome: "erro"};
  } else {
    usuario = await autenticaUsuarioPorCodigoDB(params.codigo);
  }

  const atualizarUsuario = async (formData) => {
    'use server';

    const objeto = {
      email: formData.get('email'),// chave primária, n muda
      senha: formData.get('senha'),
      tipo: formData.get('tipo'),// usuario ou admin, n muda
      telefone: formData.get('telefone'),
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
      <Suspense fallback={<Loading />}>
        <h1>Usuário autenticado</h1>

        <div defaultValue={usuario.email}></div>

        <form action={atualizarUsuario}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-6">
                <div>
                  <FloatingLabel controlId="campoEmail"
                    label="Nome" className="mb-3">
                    <Form.Control type="text"
                      defaultValue={usuario.email} readOnly
                      name="email" />
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
                  <FloatingLabel controlId="campoTipo"
                    label="Tipo" className="mb-3">
                    <Form.Control type="text"
                      defaultValue={"U"} readOnly
                      name="tipo" />
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
      </Suspense>
    </>
  );
};

export default FormularioPage;
