import * as PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { IMyOrder } from '../../models/MyOrder';
import React from 'react';
import ToastError from 'app/shared/components/ToastError';
interface FindOrderProps {
  searchOrderAsync: (id: number) => void;
}

const initialValues = {
  id: 0,
};

const validationSchema = Yup.object().shape<{ id: number }>({
  id: Yup.number()
    .min(1, 'Debe ser un número entero.')
    .required('Se debe ingresar un identificador.'),
});

const FindOrder: React.FC<FindOrderProps> = ({ searchOrderAsync }) => {
  const handleSubmit = (values: { id: number }) => {
    console.log('click ---')
    searchOrderAsync(values.id);
  };
  return (
    <div data-testid="div-find-order" className="mt-4">
      {/* <ToastError /> */}
      <h5 data-testid="title-find-order">Buscar pedido:</h5>
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form id="form-find-order" data-testid="form-find-order">
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="id" className="col-12 col-form-label">
                    Identificador:
                  </label>
                  <Field
                    name="id"
                    id="id"
                    type="number"
                    className="form-control col-12"
                    placeholder="235"
                    autoComplete="off"
                    data-testid="form-find-order-id"
                  />
                  {errors.id && touched.id ? (
                    <small className="text-danger">{errors.id}</small>
                  ) : null}
                </div>
                <div className="col-12 col-md-3 d-flex align-items-end ">
                  <button
                    data-testid="btn-find-order"
                    id="btn-find-order"
                    type="submit"
                    className="btn btn-warning ml-3"
                  >
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
};

export default FindOrder;
