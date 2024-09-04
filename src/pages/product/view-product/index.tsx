import { useNavigate } from 'react-router-dom';
import './style.css';

interface ViewProductProps {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  id: number;
  setRemove: (id: number) => void;
  setEdit: (id: number) => void;
  setShowCreate: (show: boolean) => void;
}

const ViewProduct = ({
  imageUrl,
  name,
  description,
  price,
  id,
  setRemove,
  setEdit,
  setShowCreate,
}: ViewProductProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    setEdit(id);
    setShowCreate(true);
  };

  const handleRoute = () => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <td>
        <img
          onClick={handleRoute}
          src={imageUrl}
          alt={name}
          className="product-image"
        />
      </td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>
        <button onClick={handleEdit} className="edit">
          Sửa
        </button>
        <button onClick={() => setRemove(id)} className="delete">
          Xóa
        </button>
      </td>
    </>
  );
};

export default ViewProduct;
