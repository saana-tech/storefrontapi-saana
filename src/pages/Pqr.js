import React from "react";
import { Container } from "react-bootstrap";
import FormPqr from "../components/FormPqr";
import Seo from "../components/Seo";

const Pqr = () => {
  return (
    <div>
      <Seo
        author={"SaanaFarma"}
        copyright={"CALMM.SAS"}
        title={"Crear PQR"}
        description={
          "Crear y da seguimiento a tus peticiones quejas reclamos (PQR) "
        }
      />
      <Container>
        <FormPqr />
      </Container>
    </div>
  );
};

export default Pqr;
