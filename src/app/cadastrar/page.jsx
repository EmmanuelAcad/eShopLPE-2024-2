import { redirect, revalidatePath } from "next/navigation";
import { addUsuarioDB } from "@/componentes/bd/usecases/usuarioUseCases";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Suspense, useState } from "react";
import Loading from "@/componentes/comuns/Loading";

const CadastroUsuarioPage = () => {
  const [error, setError] = useState(null);

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
      await addUsuarioDB(objeto);
      revalidatePath("/");
      redirect("/");
    } catch (err) {
      setError("Erro ao cadastrar usuário: " + err.message);
    }
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div style={{ textAlign: "center" }}>
          <h2>Cadastro de Usuário</h2>
        </div>
        {error && (
          <h4 className="text-center" style={{ color: "red" }}>
            {error}
          </h4>
        )}
        <form action={salvarUsuario}>
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
                    placeholder="Informe o email"
                    name="email"
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="campoSenha"
                  label="Senha"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Senha"
                    name="senha"
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="campoTelefone"
                  label="Telefone"
                  className="mb-3"
                >
                  <Form.Control
                    type="tel"
                    placeholder="Telefone"
                    name="telefone"
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="campoNome"
                  label="Nome"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Nome completo"
                    name="nome"
                    required
                  />
                </FloatingLabel>
                <div className="form-group text-center mt-3">
                  <button type="submit" className="btn btn-success">
                    Registrar
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

export default CadastroUsuarioPage;
