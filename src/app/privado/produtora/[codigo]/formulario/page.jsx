import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getProdutoraPorCodigoDB,
  addProdutoraDB,
  updateProdutoraDB,
} from "@/componentes/bd/usecases/produtoraUseCases";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Suspense } from "react";
import Loading from "@/componentes/comuns/Loading";

const FormularioPage = async ({ params }) => {
  let produtora = null;
  if (params.codigo == 0) {
    produtora = { codigo: 0, nome: "" };
  } else {
    try {
      produtora = await getProdutoraPorCodigoDB(params.codigo);
    } catch (err) {
      return notFound();
    }
  }

  const salvarProdutora = async (formData) => {
    "use server";
    const objeto = {
      codigo: formData.get("codigo"),
      nome: formData.get("nome"),
      sede: formData.get("sede"),
    };
    try {
      if (objeto.codigo == 0) {
        await addProdutoraDB(objeto);
      } else {
        await updateProdutoraDB(objeto);
      }
    } catch (err) {
      throw new Error("Erro: " + err);
    }
    revalidatePath("/privado/produtora/");
    redirect("/privado/produtora");
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div style={{ textAlign: "center" }}>
          <h2>Produtora</h2>
        </div>
        <form action={salvarProdutora}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-6">
                <div>
                  <FloatingLabel
                    controlId="campoCodigo"
                    label="Código"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      defaultValue={produtora.codigo}
                      readOnly
                      name="codigo"
                    />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="campoNome"
                    label="Nome"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      defaultValue={produtora.nome}
                      required
                      name="nome"
                    />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="campoSede"
                    label="Sede"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      defaultValue={produtora.sede}
                      required
                      name="sede"
                    />
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
