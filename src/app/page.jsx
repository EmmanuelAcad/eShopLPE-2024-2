import { getJogosDB } from "@/componentes/bd/usecases/jogoUseCases";
import Link from "next/link";

export const revalidate = 60; // tempo em segundos para revalidar

export default async function Home() {
  const jogos = await getJogosDB();
  return (
    <div style={{ padding: "20px" }}>
      <div className="row">
        {jogos.length > 0 &&
          jogos.map((jogo) => (
            <div key={jogo.codigo} className="col-sm-3">
              <div className="card mb-3 text-center">
                <div className="card-header">{jogo.titulo}</div>
                <div className="card-body ">
                  <h5 className="card-title">{jogo.titulo}</h5>
                  <p className="card-text">
                    <small className="text-muted">Preço: {jogo.preco}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Produtora: {jogo.produtora_nome}
                    </small>
                  </p>
                </div>
                <div className="card-footer text-muted">
                  <Link
                    type="button"
                    className="btn btn-secondary"
                    href={`/${jogo.codigo}/detalhe`}
                  >
                    Detalhes do jogo
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
