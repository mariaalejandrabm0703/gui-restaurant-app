import * as PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { IMyOrder } from '../../models/MyOrder';
import React from 'react';

interface FindOrderProps {
  searchOrderAsync: (id: number) => void;
  myOrder: IMyOrder;
}

const initialValues = {
  id: 0,
};

const validationSchema = Yup.object().shape<{ id: number }>({
  id: Yup.number()
    .min(1, 'Debe ser un número entero.')
    .required('Se debe ingresar un identificador.'),
});

const FindOrder: React.FC<FindOrderProps> = ({ searchOrderAsync, myOrder }) => {
  const handleSubmit = (values: { id: number }) => {
    console.log('submit ', values.id);
    searchOrderAsync(values.id);
  };
  return (
    <div className="mt-4">
      <h5>Buscar pedido:</h5>
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="id" className="col-12 col-form-label">
                    Identificador:
                  </label>
                  <Field
                    name="id"
                    type="number"
                    className="form-control col-12"
                    placeholder="235"
                    autoComplete="off"
                  />
                  {errors.id && touched.id ? (
                    <small className="text-danger">{errors.id}</small>
                  ) : null}
                </div>
                <div className="col-12 col-md-3 d-flex align-items-end ">
                  <button type="submit" className="btn btn-primary ml-3">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <hr></hr>
    </div>
  );
};

FindOrder.propTypes = {
  searchOrderAsync: PropTypes.func.isRequired,
  myOrder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fechaEntrega: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    activo: PropTypes.string.isRequired,
    productosPedidos: PropTypes.array.isRequired,
    cliente: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      identificacion: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      activo: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FindOrder;
