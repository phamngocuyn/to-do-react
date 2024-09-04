import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Product } from '../../../interfaces/Product';
import './style.css';

interface CreateProductProps {
  isOpen: boolean;
  onClose: (show: boolean) => void;
  onSubmit: (data: Product) => void;
  defaultValues: Partial<Product> | null;
}

const productSchema = Yup.object().shape({
  id: Yup.number().optional(),
  name: Yup.string().required('Tên sản phẩm là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  price: Yup.number()
    .required('Giá là bắt buộc')
    .min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  imageUrl: Yup.string()
    .required('URL hình ảnh là bắt buộc')
    .url('URL hình ảnh không hợp lệ'),
});

const CreateProduct: React.FC<CreateProductProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: defaultValues || {},
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    reset(defaultValues || {});
  }, [defaultValues, reset]);

  const handleClose = () => {
    reset({}); // Reset lại form khi đóng
    onClose(false); // Đóng popup
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleUpdate: SubmitHandler<Product> = (data) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <h2>{defaultValues ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
        <form
          onSubmit={handleSubmit(
            Object.keys(defaultValues || {}).length > 0
              ? handleUpdate
              : onSubmit,
          )}
        >
          <div className="form-group">
            <label htmlFor="name">Tên sản phẩm:</label>
            <input type="text" id="name" {...register('name')} />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả:</label>
            <textarea id="description" {...register('description')} />
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="price">Giá:</label>
            <input type="number" id="price" {...register('price')} />
            {errors.price && (
              <span className="error">{errors.price.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL Hình ảnh:</label>
            <input type="url" id="imageUrl" {...register('imageUrl')} />
            {errors.imageUrl && (
              <span className="error">{errors.imageUrl.message}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit">
              {Object.keys(defaultValues || {}).length > 0
                ? 'Cập nhật'
                : 'Thêm mới'}
            </button>
            <button type="button" onClick={handleClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
