import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  getProdutorasDB,
  deleteProdutoraDB,
} from "@/componentes/bd/usecases/produtoraUseCases";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/componentes/comuns/Loading";

const deleteProdutora = async (codigo) => {
  "use server";
  try {
    await deleteProdutoraDB(codigo);
  } catch (err) {
    console.log("Erro: " + err);
    throw new Error("Erro: " + err);
  }
  revalidatePath("/privado/produtora/");
  redirect("/privado/produtora/");
};

export default async function Produtora() {
  revalidatePath("/privado/produtora/");

  const produtoras = await getProdutorasDB();

  return (
    <Suspense fallback={<Loading />}>
      <div style={{ padding: "20px" }}>
        <Link
          href={`/privado/produtora/${0}/formulario`}
          className="btn btn-primary"
        >
          <i className="bi bi-file-earmark-plus"></i> Novo
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Ações</th>
              <th>Código</th>
              <th>Nome</th>
              <th>Sede</th>
            </tr>
          </thead>
          <tbody>
            {produtoras.map((produtora) => (
              <tr key={produtora.codigo}>
                <td align="center">
                  <Link
                    className="btn btn-info"
                    title="Editar"
                    href={`/privado/produtora/${produtora.codigo}/formulario`}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <form
                    action={deleteProdutora.bind(null, produtora.codigo)}
                    className="d-inline"
                  >
                    <Button
                      className="btn btn-danger"
                      title="Excluir"
                      type="submit"
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </form>
                </td>
                <td>{produtora.codigo}</td>
                <td>{produtora.nome}</td>
                <td>{produtora.sede}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Suspense>
  );
}
