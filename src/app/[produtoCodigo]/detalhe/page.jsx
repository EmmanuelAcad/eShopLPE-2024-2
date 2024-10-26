import { getJogoPorCodigoDB } from "@/componentes/bd/usecases/jogoUseCases";
import { notFound } from "next/navigation";
import Loading from "@/componentes/comuns/Loading";
import { Suspense } from "react";
import Link from "next/link";

const JogoDetalhe = async ({ params }) => {
  let jogo = null;
  try {
    jogo = await getJogoPorCodigoDB(params.jogoCodigo);
  } catch (err) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <div style={{ padding: "20px" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-3" key={jogo.codigo}>
              <div className="card mb-3 text-center">
                <div className="card-header">{jogo.titulo}</div>
                <div className="card-body ">
                  <h5 className="card-title">Código: {jogo.codigo}</h5>
                  <p className="card-text">{jogo.genero}</p>
                  <p className="card-text">
                    <small className="text-muted">Preço: {jogo.preco}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Produtora: {jogo.produtora_nome}
                    </small>
                  </p>
                </div>
                <div class="card-footer text-muted">
                  <Link className="btn btn-success" href={"/"}>
                    {" "}
                    Voltar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default JogoDetalhe;
