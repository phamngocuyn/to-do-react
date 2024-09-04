import { Product } from '../interfaces/Product';

const apiUrl = 'http://127.0.0.1:8080/api/products';

const productApi = {
  getListProduct: async (): Promise<Product[]> => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

  createProduct: async (productData: Product): Promise<Product> => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      const data: Product = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  },

  deleteProduct: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Xóa sản phẩm thành công');
        return true;
      } else {
        console.error('Xóa sản phẩm thất bại');
        return false;
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      return false;
    }
  },

  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data: Product = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      throw error;
    }
  },

  updateProduct: async (id: number, productData: Product): Promise<Product> => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const data: Product = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  },
};

export default productApi;
