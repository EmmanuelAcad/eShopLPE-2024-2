import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { criarUsuarioDB } from "@/componentes/bd/usecases/usuarioUseCases";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Suspense } from "react";
import Loading from "@/componentes/comuns/Loading";

const FormularioPage = () => {
  const salvarUsuario = async (formData) => {
    "use server";
    const objeto = {
      email: formData.get("email"),
      senha: formData.get("senha"),
      tipo: formData.get("tipo"),
      telefone: formData.get("telefone"),
      nome: formData.get("nome"),
    };
    try {
      await criarUsuarioDB(objeto);
    } catch (err) {
      throw new Error("Erro: " + err);
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
                <div>
                  <FloatingLabel
                    controlId="campoEmail"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control type="email" required name="email" />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="campoSenha"
                    label="Senha"
                    className="mb-3"
                  >
                    <Form.Control type="password" required name="senha" />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="campoTipo"
                    label="Tipo (A/U)"
                    className="mb-3"
                  >
                    <Form.Control type="text" required name="tipo" />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="campoTelefone"
                    label="Telefone"
                    className="mb-3"
                  >
                    <Form.Control type="text" required name="telefone" />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="campoNome"
                    label="Nome"
                    className="mb-3"
                  >
                    <Form.Control type="text" required name="nome" />
                  </FloatingLabel>
                </div>
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
