import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import visa from "../assets/visa.jpeg"
import mastercard from "../assets/mastercard.jpeg"

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart); // Fetch cart items from Redux
  const totalPrice = useSelector((state) => state.cart.totalPrice); // Fetch total price from Redux

  // State for required inputs
  const [shippingAddress, setShippingAddress] = useState("");
  const [selectedShippingOption, setSelectedShippingOption] = useState(""); // Radio button selection
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [radioSelection, setRadioSelection] = useState(""); // Track radio button selection
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Track button state

  // State for validation errors
  const [errors, setErrors] = useState({
    shippingAddress: "",
    selectedShippingOption: "",
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  // State to track if the form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Function to validate all inputs
  const validateInputs = () => {
    const newErrors = {
      shippingAddress:
        shippingAddress.trim() === "" ? "Shipping address is required." : "",
      selectedShippingOption:
        selectedShippingOption === "" ? "Please select a shipping option." : "",
      nameOnCard: nameOnCard.trim() === "" ? "Name on card is required." : "",
      cardNumber: cardNumber.trim() === "" ? "Card number is required." : "",
      expirationDate:
        expirationDate.trim() === "" ? "Expiration date is required." : "",
      cvv: cvv.trim() === "" ? "CVV is required." : "",
    };

    setErrors(newErrors);

    // Return true if no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  // Update button state whenever inputs change
  useEffect(() => {
    setIsButtonDisabled(!validateInputs());
  }, [
    shippingAddress,
    selectedShippingOption,
    nameOnCard,
    cardNumber,
    expirationDate,
    cvv,
  ]);

  // Handle Pay Now button click
  const handlePayNow = () => {
    setFormSubmitted(true); // Mark the form as submitted
    if (validateInputs()) {
      console.log("Proceeding to payment...");
    } else {
      console.log("Validation failed. Please complete all required fields.");
    }
  };

  return (
    <div className="shipping-container w-[700px] max-[800px]:w-[90%] mx-auto py-20">
      <div className="head flex flex-col">
        <span className="text-[32px] font-bold">Delivery</span>
      </div>

      <div className="where pt-5">
        <span className="font-bold text-[20px]">
          Where should we ship this order?
        </span>

        <form className="pt-3">
          <div className="inp flex flex-col py-2">
            <label htmlFor="name" className="text-gray-600 text-[12px]">
              Country*
            </label>
            <input
              type="text"
              className="border border-gray-400 w-full rounded h-[40px] px-2"
            />
          </div>

          <div className="inp flex py-2 gap-5 items-center">
            <div className="first w-full">
              <input
                type="text"
                placeholder="First name"
                className="border placeholder:font-bold border-gray-400 w-full rounded-  h-[40px] p-2"
              />
            </div>
            <div className="last w-full">
              <input
                type="text"
                placeholder="Last name"
                className="border placeholder:font-bold border-gray-400 w-full rounded-  h-[40px] p-2"
              />
            </div>
          </div>

          <div className="inp flex flex-col py-2">
            <input
              type="text"
              placeholder="Address"
              className="border border-gray-400 w-full rounded h-[40px] px-2 placeholder:font-bold"
            />
          </div>

          <div className="inp flex flex-col py-2">
            <input
              placeholder="Apartment, suite, etc. (optional)"
              type="text"
              className="border border-gray-400 w-full rounded h-[40px] px-2 placeholder:font-bold"
            />
          </div>

          <div className="inp flex py-2 gap-5">
            <div className="city w- w-full">
              <input
                type="text"
                placeholder="City"
                className="border border-gray-400 w-full rounded h-[40px] px-2 placeholder:font-bold"
              />
            </div>
            <div className="state w-full">
              <input
                placeholder="State"
                type="text"
                className="border border-gray-400 w-full rounded h-[40px] px-2 placeholder:font-bold"
              />
            </div>
            <div className="zip w-full">
              <input
                placeholder="ZIP code"
                type="text"
                className="border border-gray-400 w-full rounded h-[40px] px-2 placeholder:font-bold"
              />
            </div>
          </div>

          <div className="inp flex flex-col py-2">
            <input
              placeholder="Phone"
              type="tel"
              className="border border-gray-400 w-full rounded h-[40px] px-2 placeholder:font-bold"
            />
          </div>
        </form>
      </div>

      <div className="opt flex flex-col pt-10">
        <span className="font-bold text-[20px]">Shopping Options *</span>
        <span className="text-[12px] w-[70%] text-gray-600">
          Below are estimates from shipping data to delivery for orders shipping
          within the contiguous United States...
        </span>

        <div className="flex flex-col gap-5 pt-5">
          <div className="radios-item flex gap-2">
            <input
              type="radio"
              name="plan"
              id="Basic"
              value="Basic"
              onChange={(e) => setSelectedShippingOption(e.target.value)}
            />
            <label htmlFor="Basic" className="flex flex-col">
              <div className="top text-[14px] font-bold">
                Basic <span className="text-gray-500">- Free</span>
              </div>
              <div className="bottom text-[12px]">4 - 9 Business days</div>
            </label>
          </div>
          <div className="radios-item flex gap-2">
            <input
              type="radio"
              name="plan"
              id="Priority"
              value="Priority"
              onChange={(e) => setSelectedShippingOption(e.target.value)}
            />
            <label htmlFor="Priority" className="flex flex-col">
              <div className="top text-[14px] font-bold">
                Priority <span className="text-gray-500">- $12</span>
              </div>
              <div className="bottom text-[12px]">3 - 4 Business days</div>
            </label>
          </div>
          <div className="radios-item flex gap-2">
            <input
              type="radio"
              name="plan"
              id="Express"
              value="Express"
              onChange={(e) => setSelectedShippingOption(e.target.value)}
            />
            <label htmlFor="Express" className="flex flex-col">
              <div className="top text-[14px] font-bold">
                Express <span className="text-gray-500">- $25</span>
              </div>
              <div className="bottom text-[12px]">1 - 2 Business days</div>
            </label>
          </div>
        </div>
        {/* </div> */}
        {formSubmitted && errors.selectedShippingOption && (
          <p className="text-red-500 text-sm">
            {errors.selectedShippingOption}
          </p>
        )}

        {/* Radio Buttons */}
        <div className="py-10">
          <span className="font-bold text-[20px]">
            Where should we ship refills? *
          </span>
          <div className="radio-buttons pt-5 flex flex-col gap-5 ">
            <div className="radios-item flex gap-2">
              <input
                type="radio"
                name="refills"
                id="same"
                value="same"
                checked={radioSelection === "same"}
                onChange={(e) => setRadioSelection(e.target.value)}
              />
              <label htmlFor="same" className="flex flex-col">
                <div className="top text-[14px] font-bold">
                  The same address as above
                </div>
              </label>
            </div>

            <div className="radios-item flex gap-2">
              <input
                type="radio"
                name="refills"
                id="other"
                value="other"
                checked={radioSelection === "other"}
                onChange={(e) => setRadioSelection(e.target.value)}
              />
              <label htmlFor="other" className="flex flex-col">
                <div className="top text-[14px] font-bold">
                  A different address
                </div>
              </label>
            </div>
          </div>
        </div>

      </div>

      <div className="payment-details pt-10">
        <div className="head flex flex-col">
          <span className="text-[32px] font-bold">Payment</span>
          <span className="text-gray-500 text-[14px]">
            All transactions are secure and encrypted
          </span>
        </div>

        <div className="border rounded-md border-gray-500 bg-gray-200 mt-3">
          <div className="credit flex items-center justify-between p-3 border border-gray-400 box-border bg-[#26292e40]">
            <span className="font-bold">Credit</span>
            <div className="more flex gap-2 items-center">
              <img className="h-[25px]" src={visa} alt="" />
              <img className="h-[25px]" src={mastercard} alt="" />
              <span className="bg-white rounded px-2 font-bold">+4</span>
            </div>
          </div>

          <div className="inps p-5 flex flex-col gap-5">
            <div className="card">
              <input
                className="border bg-white placeholder:font-bold border-gray-400 w-full rounded h-[40px] p-2"
                type="text"
                placeholder="Card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              {formSubmitted && errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </div>
            <div className="code flex gap-5">
              <div className="date w-full">
                <input
                  className="border bg-white placeholder:font-bold border-gray-400 w-full rounded h-[40px] p-2"
                  type="text"
                  placeholder="Expiration date (MM/YY)"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
                {formSubmitted && errors.expirationDate && (
                  <p className="text-red-500 text-sm">
                    {errors.expirationDate}
                  </p>
                )}
              </div>
              <div className="code w-full">
                <input
                  className="border bg-white placeholder:font-bold border-gray-400 w-full rounded h-[40px] p-2"
                  type="text"
                  placeholder="Security code"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                {formSubmitted && errors.cvv && (
                  <p className="text-red-500 text-sm">{errors.cvv}</p>
                )}
              </div>
            </div>
            <div className="name">
              <input
                className="border bg-white placeholder:font-bold border-gray-400 w-full rounded h-[40px] p-2"
                type="text"
                placeholder="Name on card"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
              {formSubmitted && errors.nameOnCard && (
                <p className="text-red-500 text-sm">{errors.nameOnCard}</p>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="order-summary pt-5">
        <div className="head flex flex-col pt-10">
          <span className="text-[32px] font-bold">Order Summary</span>
        </div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.asin}
              className="i flex gap-5 py-2 justify-between items-center"
            >
              <div className="it flex items-center gap-5">
                
              <img
                src={item.img}
                alt={item.name}
                className="h-[50px] object-cover rounded-md"
              />
              <span className="font-bold">{item.name}</span>
              </div>
              <span className="justify-self-end">
                £{item.price} x {item.amount}
              </span>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="total pt-5 font-bold text-right">
          Total: £{totalPrice.toFixed(2)}
        </div>
      </div>

      <div className="continue pt-10 pb-3 flex justify-center">
        <button
          className="text-white bg-[#26292e] px-16 text-[12px] font-bold py-2 rounded-full flex justify-center items-center" 
          onClick={handlePayNow}
        >
          Pay now
        </button>
      </div>
      
      <div className="back text-[12px] font-bold text-[#26292e] mx-auto p-1 hover:text-[#EB3E32] w-fit cursor-pointer">
        <Link to="/cart">Back to cart</Link>
      </div>


      <div className="help text-[12px] font-bold text-[#26292e] mx-auto p-1 w-fit">
        Need help? 
        <span className="text-[#EB3E32] px-1 cursor-pointer">Contact us</span>
      </div>
    </div>
  );
};

export default Checkout;
