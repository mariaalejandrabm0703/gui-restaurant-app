import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as Yup from 'yup';
import { Button } from 'app/shared/components/Button';
import { FormikHelpers } from 'formik/dist/types';
import { Input } from 'app/shared/components/Input';
import { Producto } from '../../models/Producto';
import { SpanError } from './styles';
import { useFormik } from 'formik';

interface FormValues {
  title: string;
  slug: string;
  body: string;
}

interface FormCrearProductoProp {
  onSubmit: (payload: Producto) => any;
  disabled?: boolean;
  formTitle: string;
  initialValues?: FormValues;
}

const validationSchema = Yup.object().shape<FormValues>({
  title: Yup.string().required('El campo title es requerido.'),
  slug: Yup.string().required('El campo slug es requerido.'),
  body: Yup.string().required('El campo body es requerido.'),
});

export const FormCrearProducto: React.FC<FormCrearProductoProp> = ({
  onSubmit,
  disabled,
  formTitle,
  initialValues = {
    title: '',
    slug: '',
    body: '',
  },
}) => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    onSubmit({
      title: values.title,
      slug: values.slug,
      body: values.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    resetForm();
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>{formTitle}</h2>
      <Input
        disabled={disabled}
        name="title"
        placeholder="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      {formik.touched.title && formik.errors.title && (
        <SpanError>{formik.errors.title}</SpanError>
      )}
      <Input
        disabled={disabled}
        name="slug"
        placeholder="Slug"
        value={formik.values.slug}
        onChange={formik.handleChange}
      />
      {formik.touched.slug && formik.errors.slug && (
        <SpanError>{formik.errors.slug}</SpanError>
      )}
      <Input
        disabled={disabled}
        name="body"
        placeholder="Body"
        value={formik.values.body}
        onChange={formik.handleChange}
      />
      {formik.touched.body && formik.errors.body && (
        <SpanError>{formik.errors.body}</SpanError>
      )}
      <Button type="submit">Registrar</Button>
    </form>
  );
};

FormCrearProducto.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formTitle: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  initialValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};
