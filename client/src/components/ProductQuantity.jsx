import { Button, ButtonGroup } from 'react-bootstrap';

const ProductQuantitySelector = ({ productId, quantity, price, onQuantityChange }) => {
  const handleAdd = () => {
    onQuantityChange(productId, 1, price); // Increase quantity by 1
  };

  const handleIncrement = () => {
    onQuantityChange(productId, 1, price); // Increase quantity by 1
  };

  const handleDecrement = () => {
    onQuantityChange(productId, -1, price); // Decrease quantity by 1
  };

  return (
    <div className="text-center">
      {quantity === 0 ? (
        <Button
          variant="primary"
          className="d-flex align-items-center justify-content-center"
          onClick={handleAdd}
        >
          Tambah
        </Button>
      ) : (
        <ButtonGroup>
          <Button style={{borderRadius:'5px'}} variant="primary" onClick={handleDecrement}>
            -
          </Button>
          <span className="px-3 d-flex align-items-center">{quantity}</span>
          <Button style={{borderRadius:'5px'}} variant="primary" onClick={handleIncrement}>
            +
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default ProductQuantitySelector;
