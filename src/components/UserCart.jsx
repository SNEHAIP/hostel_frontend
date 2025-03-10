import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Navbar from './Navbar';

const UserCart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const userId = sessionStorage.getItem('userid'); // Get the logged-in user's ID
    
    // Filter cart items to only include those belonging to the logged-in user
    const userCart = savedCart.filter(item => item.userid === userId);
    
    setCart(userCart);  // Set the filtered cart to state
  }, []);

  // Remove item from the cart
  const removeItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove); // Filter out the removed item
    setCart(updatedCart); // Update the cart state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save the updated cart to localStorage
  };

  // Calculate the total amount based on item price and quantity
  const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  // Function to confirm order and navigate to Payment
  const confirmOrder = () => {
    const userId = sessionStorage.getItem('userid'); // Get the logged-in user's ID again for navigation

    navigate('/foodpayment', {
      state: {
        cart,         // Pass the entire cart array
        totalAmount,  // Pass the total amount
        userId        // Pass the userId
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h3>Your Cart</h3>
        <ul className="list-group">
          {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {item.name} - ₹{item.price} x {item.quantity} 
              </div>
              <div>
                ₹{(parseFloat(item.price) * item.quantity).toFixed(2)} {/* Item total */}
              </div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => removeItem(index)} // Call removeItem when the button is clicked
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="my-3">
          <h4>Total Amount: ₹{totalAmount.toFixed(2)}</h4> {/* Display total sum with two decimal places */}
        </div>
         {/* Confirm Order Button */}
         <div className="text-center">
          <button 
            className="btn btn-success"
            onClick={confirmOrder} // Handle confirm order button click to navigate
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCart; 