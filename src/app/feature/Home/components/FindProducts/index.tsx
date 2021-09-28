import * as PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { IFilters } from '../../models/Home';
import React from 'react';
interface FindProductsProps {
  handleSearch: (values: IFilters) => void;
}

const initialValues = {
  description: '',
  category: '',
  price: 0,
};

const validationSchema = Yup.object().shape<IFilters>({
  description: Yup.string(),
  category: Yup.string(),
  price: Yup.number(),
});

const FindProducts: React.FC<FindProductsProps> = ({ handleSearch }) => {
  return (
    <div>
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSearch}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="description" className="col-12 col-form-label">
                    Descripción:
                  </label>
                  <Field
                    name="description"          
                    className="form-control col-12"
                    placeholder="Pasta"
                    autoComplete="off"
                  />
                  {errors.description && touched.description ? (
                    <small className="text-danger">{errors.description}</small>
                  ) : null}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="category" className="col-12 col-form-label">
                    Categoría:
                  </label>
                  <Field
                    name="category"          
                    className="form-control col-12"
                    placeholder="Entrada"
                    autoComplete="off"
                  />
                  {errors.category && touched.category ? (
                    <small className="text-danger">{errors.category}</small>
                  ) : null}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="price" className="col-12 col-form-label">
                    Precio (max):
                  </label>
                  <Field
                    name="price"          
                    className="form-control col-12"
                    type="number"
                    placeholder="500"
                    autoComplete="off"
                  />
                  {errors.price && touched.price ? (
                    <small className="text-danger">{errors.price}</small>
                  ) : null}
                </div>
                <div className="col-12 col-md-3 d-flex align-items-end ">
                  <button type="submit" className="btn btn-warning ml-3">
                    Buscar  <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

FindProducts.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
export default FindProducts;
