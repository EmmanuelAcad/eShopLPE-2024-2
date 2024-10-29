"use client";
import Link from "next/link";

import { useSession } from "next-auth/react";

export const User = () => {
    const { data: session } = useSession();

    return (
        <>
            <h1>Usuário autenticado</h1>
            <h2>{JSON.stringify(session)}</h2>

            <Link
                className="btn btn-info"
                title="Editar"
                href={`/user/${data.email}/formulario`}
            >
                <i className="bi bi-pencil-square"></i>
            </Link>
        </>
    );
};

export default User;
