/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import Typography from "@mui/material/Typography";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../reduxSlices/orderSlice";
import { toast } from "react-toastify";
import Loading from "../../more/Loader";
import { useNavigate } from "react-router-dom";
import { backend_Url } from "../../server";

const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post(
        `${backend_Url}/payment/process`,
        paymentData,
        {withCredentials: true}
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } 
      else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } 
        else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Payment" />
          <CheckoutSteps activeStep={2} />

          <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
              <Typography>Card Info</Typography>
              <div>
                <CreditCardIcon />
                <CardNumberElement className="paymentInput" />
              </div>
              <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
              </div>
              <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
              </div>

              <input
                type="submit"
                value={`Pay - $ ${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="paymentFormBtn"
              />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Payment;
