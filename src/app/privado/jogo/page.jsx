import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  getJogosDB,
  deleteJogoDB,
} from "@/componentes/bd/usecases/jogoUseCases";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/componentes/comuns/Loading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";

const deleteJogo = async (codigo) => {
  "use server";
  try {
    await deleteJogoDB(codigo);
  } catch (err) {
    console.log("Erro: " + err);
    throw new Error("Erro: " + err);
  }
  revalidatePath("/privado/jogo/");
  redirect("/privado/jogo/");
};

export default async function Jogo() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  revalidatePath("/privado/jogo/");

  const jogos = await getJogosDB();

  return (
    <Suspense fallback={<Loading />}>
      <div style={{ padding: "20px" }}>
        <Link
          href={`/privado/jogo/${0}/formulario`}
          className="btn btn-primary"
        >
          <i className="bi bi-file-earmark-plus"></i> Novo
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Ações</th>
              <th>Código</th>
              <th>Título</th>
              <th>Gêneros</th>
              <th>Preco</th>
              <th>Produtora</th>
            </tr>
          </thead>
          <tbody>
            {jogos.map((jogo) => (
              <tr key={jogo.codigo}>
                <td align="center">
                  <Link
                    className="btn btn-info"
                    title="Editar"
                    href={`/privado/jogo/${jogo.codigo}/formulario`}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  {session?.user?.tipo === "A" && (
                    <form
                      action={deleteJogo.bind(null, jogo.codigo)}
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
                  )}
                </td>
                <td>{jogo.codigo}</td>
                <td>{jogo.titulo}</td>
                <td>{jogo.genero}</td>
                <td>{jogo.preco}</td>
                <td>{jogo.produtora_nome}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Suspense>
  );
}
