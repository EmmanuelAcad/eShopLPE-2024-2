import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getProdutorasDB } from "@/componentes/bd/usecases/produtoraUseCases";
import {
  getJogoPorCodigoDB,
  addJogoDB,
  updateJogoDB,
} from "@/componentes/bd/usecases/jogoUseCases";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Suspense } from "react";
import Loading from "@/componentes/comuns/Loading";

const FormularioPage = async ({ params }) => {
  const produtoras = await getProdutorasDB();

  let jogo = null;
  if (params.codigo == 0) {
    jogo = {
      codigo: 0,
      titulo: "",
      genero: "",
      preco: "",
      produtora: "",
    };
  } else {
    try {
      jogo = await getJogoPorCodigoDB(params.codigo);
    } catch (err) {
      return notFound();
    }
  }

  const salvarJogo = async (formData) => {
    "use server";
    const objeto = {
      codigo: formData.get("codigo"),
      titulo: formData.get("titulo"),
      genero: formData.get("genero"),
      preco: formData.get("preco"),
      produtora: formData.get("produtora"),
    };
    try {
      if (objeto.codigo == 0) {
        await addJogoDB(objeto);
      } else {
        await updateJogoDB(objeto);
      }
    } catch (err) {
      throw new Error("Erro: " + err);
    }
    revalidatePath("/privado/jogo/");
    redirect("/privado/jogo");
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div style={{ textAlign: "center" }}>
          <h2>Jogo</h2>
        </div>
        <form action={salvarJogo}>
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
                      defaultValue={jogo.codigo}
                      readOnly
                      name="codigo"
                    />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="campoTitulo"
                    label="Título"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      defaultValue={jogo.titulo}
                      required
                      name="titulo"
                    />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="campoGenero"
                    label="Gênero"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      defaultValue={jogo.genero}
                      required
                      name="genero"
                    />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="campoPreco"
                    label="Preço"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      defaultValue={jogo.preco}
                      required
                      name="preco"
                    />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="selectProdutora"
                    label="Produtora"
                    className="mb-3"
                  >
                    <Form.Select
                      defaultValue={jogo.produtora}
                      required
                      name="produtora"
                    >
                      <option value="" disabled>
                        Selecione a produtora
                      </option>
                      {produtoras.map((prod) => (
                        <option key={prod.codigo} value={prod.codigo}>
                          {prod.nome}
                        </option>
                      ))}
                    </Form.Select>
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
