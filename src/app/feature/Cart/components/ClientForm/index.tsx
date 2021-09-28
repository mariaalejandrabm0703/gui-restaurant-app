import * as PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { IClient } from '../../models/Cart';
import React from 'react';

interface ClientFormProps {
  initialValues: IClient;
  handleSubmit: (values: IClient) => void;
  deleteCart: () => void;
}

const validationSchema = Yup.object().shape<IClient>({
  nombre: Yup.string()
    .min(2, 'Nombre muy corto')
    .max(50, 'Nombre muy largo')
    .required('Nacesitamos tu nombre'),
  email: Yup.string().email('Email no válido').required('Necesitamos tu email'),
  telefono: Yup.string().required('Necesitamos un telefono.'),
  identificacion: Yup.string().required('Necesitamos tu identificación'),
  activo: Yup.string(),
  id: Yup.number(),
});

const ClientForm: React.FC<ClientFormProps> = ({
  initialValues,
  handleSubmit,
  deleteCart,
}) => {
  
  return (
    <div className="mt-4">
      <h5>Cliente del pedido:</h5>
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row mb-3">
                <div className="col-12 col-md-3">
                  <label htmlFor="nombre" className="col-12 col-form-label">
                    Nombre:
                  </label>
                  <Field
                    name="nombre"
                    className="form-control col-12"
                    placeholder="Valentina Bohorquez"
                    autoComplete="off"
                  />
                  {errors.nombre && touched.nombre ? (
                    <small className="text-danger">{errors.nombre}</small>
                  ) : null}
                </div>
                <div className="col-12 col-md-3">
                  <label
                    htmlFor="identificacion"
                    className="col-12 col-form-label"
                  >
                    Identificación:
                  </label>
                  <Field
                    name="identificacion"
                    className="form-control col-12"
                    placeholder="1092456987"
                    autoComplete="off"
                  />
                  {errors.identificacion && touched.identificacion ? (
                    <small className="text-danger">
                      {errors.identificacion}
                    </small>
                  ) : null}
                </div>
                <div className="col-12 col-md-3">
                  <label htmlFor="email" className="col-12 col-form-label">
                    Email:
                  </label>
                  <Field
                    name="email"
                    className="form-control col-12"
                    placeholder="valen@gmail.com"
                    autoComplete="off"
                  />
                  {errors.email && touched.email ? (
                    <small className="text-danger">{errors.email}</small>
                  ) : null}
                </div>
                <div className="col-12 col-md-3">
                  <label htmlFor="telefono" className="col-12 col-form-label">
                    Telefono:
                  </label>
                  <Field
                    name="telefono"
                    className="form-control col-12"
                    placeholder="305 456 7896"
                    autoComplete="off"
                  />
                  {errors.telefono && touched.telefono ? (
                    <small className="text-danger">{errors.telefono}</small>
                  ) : null}
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-warning">
                  Guardar <i className="fas fa-user"></i>
                </button>                
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

ClientForm.propTypes = {
  initialValues: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    identificacion: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
};
export default ClientForm;
