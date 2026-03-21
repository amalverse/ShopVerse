import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Append product to state. Warn user if product already exists (to prevent duplicating single items rather than incrementing quantity)
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id,
      );
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        console.log("Item already added");
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    updateQuantity: (state, action) => {
      const products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          if (action.payload.type === "increment") {
            return { ...product, quantity: product.quantity + 1 };
          } else if (action.payload.type === "decrement") {
            if (product.quantity > 1) {
              return { ...product, quantity: product.quantity - 1 };
            }
          }
        }
        return product;
      });

      state.products = products;
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    removeFromCart: (state, action) => {
      const products = state.products.filter(
        (product) => product._id !== action.payload,
      );
      state.products = products;
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    // Wipe out complete cart contents post-checkout or upon user dismissal
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    setCart: (state, action) => {
      state.products = action.payload.map(product => ({
        ...product,
        quantity: product.quantity || 1
      }));
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
  },
});

// Action creators are generated for each case reducer function
// Helper selector functions recursively calculate sum dependencies to streamline component consumption
export const setSelectedItems = (state) =>
  state.products.reduce((total, product) => {
    return Number(total + product.quantity);
  }, 0);

export const setTotalPrice = (state) =>
  state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price);
  }, 0);

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => setTotalPrice(state) + setTax(state);

export const { addToCart, updateQuantity, removeFromCart, clearCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
