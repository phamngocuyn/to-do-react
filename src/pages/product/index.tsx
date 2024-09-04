import { useEffect, useState } from 'react';
import productApi from '../../apis/productApi';
import CreateProduct from './create-product';
import ViewProduct from './view-product';
import { Product } from '../../interfaces/Product';
import './style.css';

const Products = () => {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [detailProduct, setDetailProduct] = useState<Partial<Product>>({});
  const [showCreate, setShowCreate] = useState(false);
  const [remove, setRemove] = useState(0);
  const [edit, setEdit] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const getProductById = async () => {
      if (edit) {
        try {
          const productDetail = await productApi.getProductById(edit);
          if (productDetail && typeof productDetail === 'object') {
            setDetailProduct(productDetail);
            setShowCreate(true);
          } else {
            console.error('Unexpected product detail format:', productDetail);
          }
        } catch (error) {
          console.error('Lấy chi tiết sản phẩm lỗi:', error);
        }
      }
    };

    getProductById();
  }, [edit]);

  useEffect(() => {
    const deleteProduct = async () => {
      if (remove) {
        try {
          await productApi.deleteProduct(remove);
          alert('Xóa sản phẩm thành công');
          fetchProducts();
        } catch (error) {
          console.error('Failed to delete products:', error);
        }
      }
    };

    deleteProduct();
  }, [remove]);

  const fetchProducts = async () => {
    try {
      const response = await productApi.getListProduct();
      setListProduct(response);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleCreateOrUpdateProduct = async (data: Product) => {
    try {
      if (edit) {
        await productApi.updateProduct(edit, data);
      } else {
        await productApi.createProduct(data);
      }
      fetchProducts();
      setShowCreate(false);
      setEdit(0);
      setDetailProduct({});
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  return (
    <div className="product-container">
      <button onClick={() => setShowCreate(true)}>Thêm sản phẩm</button>
      <CreateProduct
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          setEdit(0);
          setDetailProduct({});
        }}
        onSubmit={handleCreateOrUpdateProduct}
        defaultValues={edit ? detailProduct : null}
      />

      {listProduct.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Mô tả</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {listProduct.map((product) => (
              <tr key={product.id}>
                <ViewProduct
                  id={product.id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  setRemove={setRemove}
                  setEdit={setEdit}
                  setShowCreate={setShowCreate}
                />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Products;
