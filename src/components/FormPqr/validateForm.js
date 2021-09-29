import util from "../../util";

export const TYPE_IDENTIFICATION = [
  {
    name: "CEDULA DE CIUDADANÍA",
  },
  {
    name: "CEDULA DE EXTRANJERÍA",
  },
  {
    name: "TARJETA DE IDENTIDAD",
  },
  {
    name: "NIT",
  },
  {
    name: "PASAPORTE",
  },
  {
    name: "PERMISO ESPECIAL DE PERMANECÍA",
  },
];

export const TYPE_DOCUMENT = [
  {
    label: "Seleccione tipo de documento",
    value: "",
  },
  {
    label: "C.C",
    value: "Cedula de Ciudadania",
  },
  {
    label: "C.E",
    value: "Cédula de Extranjería",
  },
  {
    label: "T.I",
    value: "Tarjeta de Identidad",
  },
];

export const VALUES_GUEST = {
  name: "",
  phone: "",
  address: "",
  ci: "",
  email: "",
  city: "",
};

export const INITIAL_VALUE = {
  ...VALUES_GUEST,
  typeRequest: "",
  reasonForRequest: "",
  descriptionDocuments: "",
  checkTyC: false,
  checkPersonalData: false,
  checkEmail: false,
  typeDocument: "",
  invitePersonalData: null,
  evidence: [],
};
export const TYPE_REQUEST = [
  {
    name: "Petición",
  },
  {
    name: "Queja",
  },
  {
    name: "Reclamo",
  },
  {
    name: "Sugerencia",
  },
];
export const handleValidation = (values) => {
  const {
    address,
    checkTyC,
    ci,
    city,
    email,
    invitePersonalData,
    name,
    phone,
    reasonForRequest,
    typeDocument,
    typeRequest,
  } = values;
  const validateEmail = util.validateEmail(email);
  if (!validateEmail) {
    return {
      errorValidation: true,
      msn: "Por favor ingrese un email valido.",
    };
  }
  if (invitePersonalData) {
    if (
      invitePersonalData.name === "" ||
      invitePersonalData.phone === "" ||
      invitePersonalData.address === "" ||
      invitePersonalData.ci === "" ||
      invitePersonalData.email === "" ||
      invitePersonalData.city === ""
    ) {
      const validateEmailGuest = util.validateEmail(invitePersonalData.email);

      if (!validateEmailGuest) {
        return {
          errorValidation: true,
          msn: "El email del de el otro solicitante es invalido.",
        };
      }
      return {
        errorValidation: true,
        msn: "Todos los campos de la otra persona que presenta. Son obligatorios.",
      };
    }
  }
  if (
    address === "" ||
    ci === "" ||
    name === "" ||
    reasonForRequest === "" ||
    email === "" ||
    phone === "" ||
    city === "" ||
    !checkTyC ||
    typeRequest === "" ||
    typeDocument === ""
  ) {
    return {
      errorValidation: true,
      msn: "Todos los campos son obligatorios,  recuerda aceptar nuestra política de tratamiento de datos personales",
    };
  } else {
    return {
      errorValidation: false,
      msn: "",
    };
  }
};
