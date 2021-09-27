import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IProduct, IProductOrder } from '../../../Home/models/Home';
import ClientForm from '../../components/ClientForm/index';
import { IClient } from '../../models/Cart';
import { IErrorToast } from '../../../../core/redux/modelo/IStateMain';
import ListProds from '../../components/ListProducts/index';
import ToastError from '../../../../shared/components/ToastError';
import { useDispatch } from 'react-redux';

interface CartProps {
  listProducts: Array<IProductOrder>;
  client: IClient;
  listProductMenu: Array<IProduct>;
  isLoading: boolean;
  errorMessage: IErrorToast;
  setClientAsync: (id: string, client: IClient) => void;
  addCountProduct: () => void;
  subtCountProduct: () => void;
  setProducts: (products: Array<IProductOrder>) => void;
}

const initialValues = {
  email: '',
  identificacion: '',
  nombre: '',
  telefono: '',
};

export const Cart: React.FC<CartProps> = ({
  listProducts,
  listProductMenu,
  client,
  isLoading,
  errorMessage,
  setClientAsync,
  addCountProduct,
  subtCountProduct,
  setProducts,
}) => {
  const dispatch = useDispatch();

  const confirmCart = () => {
    console.log('confirmar compra');
  };

  const handleSubmit = (values: IClient) => {
    const c = {
      id: client.id,
      nombre: values.nombre,
      identificacion: values.identificacion,
      telefono: values.telefono,
      email: values.email,
      activo: '1',
    };
    if (c.id === 0) {
      dispatch(setClientAsync(values.identificacion, c));
    }
  };

  const addProduct = (id: number, price: number) => {
    if (addCountProduct) dispatch(addCountProduct());
    // contar mismos prods
    const sameProd =
      listProducts && listProducts.filter((prod) => prod.id === id);
    let quantity: number = 0;
    if (sameProd && sameProd.length > 0) {
      quantity = sameProd && sameProd[0]?.cantidad;
    } else {
      quantity = 0;
    }

    // guardar nuevo prods
    let prods = listProducts && listProducts.filter((prod) => prod.id !== id);
    const prod: IProductOrder = {
      id: id,
      cantidad: quantity + 1,
      precio: price,
    };
    if (prods && prods.length > 0) {
      prods = [...prods, prod];
    } else {
      prods = [prod];
    }
    if (setProducts) {
      dispatch(setProducts(prods && prods));
    }
  };

  const subtProduct = (id: number, price: number) => {
    if (subtCountProduct) dispatch(subtCountProduct());
    // contar mismos prods
    const sameProd =
      listProducts && listProducts.filter((prod) => prod.id === id);
    let quantity: number = 0;
    if (sameProd && sameProd.length > 0) {
      quantity = sameProd && sameProd[0]?.cantidad;
    } else {
      quantity = 0;
    }
    console.log('quantity', quantity);
    // guardar los prods
    let prods;
    console.log('id ', id);
    if (quantity - 1 === 0 || quantity === 0) {
      prods = listProducts && listProducts.filter((prod) => prod.id !== id);
      console.log('prods ', prods);
    } else {
      prods = listProducts && listProducts.filter((prod) => prod.id !== id);
      const prod: IProductOrder = {
        id: id,
        cantidad: quantity - 1,
        precio: price,
      };
      if (prods && prods.length > 0) {
        prods = [...prods, prod];
      } else {
        prods = [prod];
      }
    }
    if (setProducts) {
      console.log('prods2 ', prods);
      dispatch(setProducts(prods && prods));
    }
  };

  return (
    <div className="container">
      <ToastError />
      <div className="">
        <h1>Mis compras</h1>
        {listProducts.length > 0 ? (
          <div>
            {client.id !== 0 ? (
              <h6 className="color-blue-text">Bienvenido {client.nombre}</h6>
            ) : (
              <ClientForm
                initialValues={initialValues}
                handleSubmit={handleSubmit}
              />
            )}
            <hr></hr>
            <ListProds
              listProducts={listProducts}
              listProductMenu={listProductMenu}
              addProduct={addProduct}
              subtProduct={subtProduct}
              confirmCart={confirmCart}
            />
            <hr></hr>
            <div className="btn-cart">
              <a type="submit" className="btn btn-primary">
                Confirmar compra <i className="fas fa-check-circle"></i>
              </a>
            </div>
          </div>
        ) : (
          <h5>*No se han añadido productos al carrito.</h5>
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
  listProducts: PropTypes.array.isRequired,
  listProductMenu: PropTypes.array.isRequired,
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    identificacion: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    activo: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  setClientAsync: PropTypes.func.isRequired,
  addCountProduct: PropTypes.func.isRequired,
  subtCountProduct: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
};
