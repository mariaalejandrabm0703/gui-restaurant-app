import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IProduct, IProductOrder } from '../../../Home/models/Home';
import ClientForm from '../../components/ClientForm/index';
import { IClient } from '../../models/Cart';
import { IErrorToast } from '../../../../core/redux/modelo/IStateMain';
import { IMyOrderReg } from 'app/feature/MyOrder/models/MyOrder';
import ListProds from '../../components/ListProducts/index';
import ToastError from '../../../../shared/components/ToastError';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

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
  setOrderAsync: (pedido: IMyOrderReg) => void;
  deleteCountProduct: () => void;
  deleteClient: () => void;
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
  setOrderAsync,
  deleteCountProduct,
  deleteClient,
}) => {
  const [date, setDate] = React.useState('01/10/2021 12:00:00');

  const history = useHistory();

  const confirmCart = () => {
    if (client.identificacion === '') {
      console.log('no cliente');
      toast.error('No se ha establecido un cliente.');
      return;
    }
    let pedido: IMyOrderReg;
    if (client.id !== 0) {
      const precio = listProducts
        .map((item) => item.precio * item.cantidad)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
      pedido = {
        fechaEntrega: date,
        precio: precio,
        activo: '1',
        productos: listProducts,
        cliente: client.id!,
      };
      setOrderAsync(pedido);
    }
    history.push('/myOrder');    
  };

  const handleChangeDate = (e: React.FormEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
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
      setClientAsync(values.identificacion, c);
    }
  };

  const addProduct = (id: number, price: number) => {
    if (addCountProduct) addCountProduct();
    // contar mismos prods
    const sameProd =
      listProducts && listProducts.filter((prod) => prod.producto === id);
    let quantity: number = 0;
    if (sameProd && sameProd.length > 0) {
      quantity = sameProd && sameProd[0]?.cantidad;
    } else {
      quantity = 0;
    }

    // guardar nuevo prods
    let prods =
      listProducts && listProducts.filter((prod) => prod.producto !== id);
    const prod: IProductOrder = {
      producto: id,
      cantidad: quantity + 1,
      precio: price,
    };
    if (prods && prods.length > 0) {
      prods = [...prods, prod];
    } else {
      prods = [prod];
    }
    if (setProducts) {
      setProducts(prods && prods);
    }
  };

  const subtProduct = (id: number, price: number) => {
    if (subtCountProduct) subtCountProduct();
    // contar mismos prods
    const sameProd =
      listProducts && listProducts.filter((prod) => prod.producto === id);
    let quantity: number = 0;
    if (sameProd && sameProd.length > 0) {
      quantity = sameProd && sameProd[0]?.cantidad;
    } else {
      quantity = 0;
    }

    // guardar los prods
    let prods;
    if (quantity - 1 === 0 || quantity === 0) {
      prods =
        listProducts && listProducts.filter((prod) => prod.producto !== id);
    } else {
      prods =
        listProducts && listProducts.filter((prod) => prod.producto !== id);
      const prod: IProductOrder = {
        producto: id,
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
      setProducts(prods && prods);
    }
  };

  const deleteCart = () => {
    const p = Array<IProductOrder>();
    setProducts(p);
    deleteCountProduct();
    deleteClient();
  };

  return (
    <div className="container">
      <ToastError />
      <div className="">
        <h1>Mis compras</h1>

        {listProducts.length > 0 ? (
          <div>
            <div style={{ textAlign: 'right' }}>
              <button
                type="submit"
                onClick={deleteCart}
                className="btn btn-danger"
              >
                Vaciar <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
            {client.id !== 0 ? (
              <h6 className="color-blue-text">Bienvenido {client.nombre}</h6>
            ) : (
              <ClientForm
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                deleteCart={deleteCart}
              />
            )}
            <hr></hr>
            <div className="col-12 col-md-3">
              <label htmlFor="fecha" className="col-12 col-form-label">
                Fecha de entrega:
              </label>
              <input
                onChange={handleChangeDate}
                type="text"
                value={date}
              ></input>
            </div>
            <ListProds
              listProducts={listProducts}
              listProductMenu={listProductMenu}
              addProduct={addProduct}
              subtProduct={subtProduct}
            />
            <hr></hr>
            <div className="btn-cart">
              <a
                type="submit"
                onClick={confirmCart}
                className="btn btn-warning"
              >
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
  setOrderAsync: PropTypes.func.isRequired,
  deleteCountProduct: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
};
