import axios from "axios";
import moment from "moment";
import { db } from "../../config/firebase";
import { TEMPLATE_ID } from "../../constants";
import { ERROR, LOADING } from "./types";

export const handleErrorGlobal = (payload, dispatch) => {
  setLoading(false, dispatch);
  dispatch({ type: ERROR, payload });

  setTimeout(() => {
    const payload = { error: false, errorMsn: "" };
    dispatch({ type: ERROR, payload });
  }, 4000);
};
export const setLoading = (loading, dispatch) => {
  dispatch({ type: LOADING, payload: loading });
};

export const addRequestDispatch = async (pqr, dispatch) => {
  console.log("send pqr =>", pqr);
  try {
    setLoading(true, dispatch);
    await db.collection("pqr").doc(pqr.id).set(pqr, { merge: true });
    const msg = {
      to: pqr.email,
      from: "atencionalusuario@saana.com.co",
      subject:
        "Bienvenido a saanafarma, donde puedes comprar tus medicamentos en linea",
      templateId: TEMPLATE_ID,
      dynamicTemplateData: {
        radicado: pqr.idRequest,
        date: moment(pqr.create).format("DD/MM/YY HH:mm"),
      },
    };
    await axios.post("/api/sendEmail", {
      msg,
    });
    setLoading(false, dispatch);
  } catch (error) {
    setLoading(false, dispatch);
    console.log("error:addRequestDispatch =>", error);
  }
};

export const searchPqr = async (idPqr, dispatch) => {
  try {
    setLoading(true, dispatch);
    const response = await db
      .collection("pqr")
      .where("idRequest", "==", idPqr)
      .get();
    const data = response.docs.map((doc) => {
      const item = doc.data();

      return {
        ...item,
        id: doc.id,
      };
    });
    console.log("data =>", data);
    if (data?.length > 0) {
      setLoading(false, dispatch);

      return data[0];
    } else {
      setLoading(false, dispatch);

      return null;
    }
  } catch (error) {
    setLoading(false, dispatch);

    console.log("error:searchPqr=>", error);
  }
};
