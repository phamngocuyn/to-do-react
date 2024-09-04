import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productApi from '../../../apis/productApi';
import { Product } from '../../../interfaces/Product';
import './style.css';

const DetailProduct: React.FC = () => {
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const { productId } = useParams<{ productId: string }>();
  console.log(productId);
  const id = Number(productId);
  console.log(id);

  useEffect(() => {
    const getProductById = async () => {
      try {
        if (id) {
          const productDetail = await productApi.getProductById(id);
          if (productDetail && typeof productDetail === 'object') {
            setDetailProduct(productDetail as Product);
          } else {
            console.error('Unexpected product detail format:', productDetail);
          }
        }
      } catch (error) {
        console.error('Lấy chi tiết sản phẩm lỗi:', error);
      }
    };

    getProductById();
  }, [id]);

  if (!detailProduct) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <h1>Chi tiết sản phẩm</h1>
      <p>Tên sản phẩm: {detailProduct.name}</p>
      <p>Giá: {detailProduct.price}</p>
      <img src={detailProduct.imageUrl} alt={detailProduct.name} />
    </div>
  );
};

export default DetailProduct;
