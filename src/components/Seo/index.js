import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const Seo = ({
  title = "Saana farma",
  description = "Saana farma productos farma al alcanza de la palma de tu mano",
  keywords = "saaan farma, farmacia, delivery,domicilio",
  author = "saana salud",
  copyright = "saana salud CALMMM",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="copyright" content={copyright} />
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
  copyright: PropTypes.string,
};

export default Seo;
