import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiBankCardFill } from "react-icons/ri";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useCreateCheckoutSessionMutation } from "../../redux/features/orders/ordersApi";
import { useEditProfileMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const currentUser = user?.user ? user.user : user;
  const products = useSelector((store) => store.cart.products);
  const [addressData, setAddressData] = useState({
    address: typeof currentUser?.address === 'string' ? currentUser.address : currentUser?.address?.address || "",
    city: currentUser?.address?.city || "",
    district: currentUser?.address?.district || "",
    state: currentUser?.address?.state || "",
    country: currentUser?.address?.country || "",
    pincode: currentUser?.address?.pincode || "",
  });

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector(
    (store) => store.cart
  );
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [editProfile] = useEditProfileMutation();

  useEffect(() => {
    if (currentUser?.address) {
      const addr = currentUser.address;
      const newAddress = {
        address: typeof addr === 'string' ? addr : addr.address || "",
        city: addr.city || "",
        district: addr.district || "",
        state: addr.state || "",
        country: addr.country || "",
        pincode: addr.pincode || "",
      };
      
      // only update if data actually changed
      if (JSON.stringify(newAddress) !== JSON.stringify(addressData)) {
          setAddressData(newAddress);
      }
    }
  }, [currentUser]);


  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const makePayment = async (e) => {
    e.stopPropagation();

    if (!currentUser) {
      toast.warning("Please login to proceed to checkout!");
      return;
    }

    const { address, city, state, country, pincode } = addressData;
    
    if (!address || !city || !state || !country || !pincode) {
      toast.warning("Please fill in all required shipping address fields!");
      return;
    }

    // specific validation for pincode (must be numeric and at least 5-6 digits)
    if (!/^\d{5,10}$/.test(pincode)) {
      toast.warning("Please enter a valid numeric pincode (5-10 digits)!");
      return;
    }

    // Save address if it changed or if it was empty in the profile
    const currentAddr = currentUser?.address || {};
    const isChanged = 
      typeof currentAddr === 'string' || 
      addressData.address !== currentAddr.address ||
      addressData.city !== currentAddr.city ||
      addressData.district !== currentAddr.district ||
      addressData.state !== currentAddr.state ||
      addressData.country !== currentAddr.country ||
      addressData.pincode !== currentAddr.pincode;

    if (isChanged) {
      try {
        const res = await editProfile({
          userId: currentUser?._id,
          address: addressData,
        }).unwrap();
        // Update Redux state
        const updatedUser = res.user;
        const newState = user?.user ? { ...user, user: updatedUser } : updatedUser;
        dispatch(setUser(newState));
        toast.success("Shipping address saved to profile!");
      } catch (err) {
        console.error("Error saving address:", err);
        toast.error("Failed to save shipping address. Please try again.");
        return;
      }
    }

    try {
      const res = await createCheckoutSession({ products, userEmail: currentUser?.email }).unwrap();
      
      if (res.url) {
        window.location.href = res.url;
      } else {
        console.error("No checkout URL returned from server");
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    }
  };

  const inputClass = "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder:text-slate-400 transition";

  return (
    <div className="text-sm">
      <div className="px-6 py-5 space-y-5">
        {/* Header */}
        <h2 className="text-lg font-bold font-sans text-slate-800">Order Summary</h2>

        {/* Price breakdown */}
        <div className="space-y-2 text-slate-500">
          <div className="flex justify-between">
            <span>Items ({selectedItems})</span>
            <span className="font-semibold text-slate-700">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax ({taxRate * 100}%)</span>
            <span className="font-semibold text-slate-700">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-1">
            <span className="font-bold text-slate-800 text-base">Grand Total</span>
            <span className="text-indigo-600 font-black text-xl">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
            Shipping Address
          </label>
          <textarea
            name="address"
            value={addressData.address}
            onChange={handleAddressChange}
            rows={2}
            className={inputClass + " resize-none"}
            placeholder="Street Address *"
          />
          <div className="flex gap-2">
            <input type="text" name="city" value={addressData.city} onChange={handleAddressChange} placeholder="City *" className={inputClass} />
            <input type="text" name="district" value={addressData.district} onChange={handleAddressChange} placeholder="District" className={inputClass} />
          </div>
          <div className="flex gap-2">
            <input type="text" name="state" value={addressData.state} onChange={handleAddressChange} placeholder="State *" className={inputClass} />
            <input type="text" name="country" value={addressData.country} onChange={handleAddressChange} placeholder="Country *" className={inputClass} />
            <input type="text" name="pincode" value={addressData.pincode} onChange={handleAddressChange} placeholder="Pincode *" className={inputClass} />
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-1">
          <button
            onClick={makePayment}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm text-sm"
          >
            <RiBankCardFill className="text-lg" />
            Proceed to Checkout
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleClearCart(); }}
            className="w-full bg-white hover:bg-red-50 text-red-500 hover:text-red-600 border border-slate-200 hover:border-red-200 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
          >
            <AiTwotoneDelete className="text-lg" />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
