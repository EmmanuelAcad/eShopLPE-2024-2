import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { criarUsuarioDB } from "@/componentes/bd/usecases/usuarioUseCases";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Suspense } from "react";
import Loading from "@/componentes/comuns/Loading";

const FormularioPage = async () => {
  const salvarUsuario = async (formData) => {
    "use server";
    const objeto = {
      email: formData.get("email"),
      senha: formData.get("senha"),
      tipo: "U",
      telefone: formData.get("telefone"),
      nome: formData.get("nome"),
    };
    try {
      await criarUsuarioDB(objeto);
    } catch (err) {
      throw new Error("Erro ao criar usuário: " + err);
    }
    revalidatePath("/");
    redirect("/");
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div style={{ textAlign: "center" }}>
          <h2>Cadastro de Usuário</h2>
        </div>
        <form action={salvarUsuario}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-6">
                <FloatingLabel
                  controlId="campoEmail"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control type="email" required name="email" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="campoSenha"
                  label="Senha"
                  className="mb-3"
                >
                  <Form.Control type="password" required name="senha" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="campoTelefone"
                  label="Telefone"
                  className="mb-3"
                >
                  <Form.Control type="text" required name="telefone" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="campoNome"
                  label="Nome"
                  className="mb-3"
                >
                  <Form.Control type="text" required name="nome" />
                </FloatingLabel>
                <div className="form-group text-center mt-3">
                  <button type="submit" className="btn btn-success">
                    Cadastrar <i className="bi bi-save"></i>
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
