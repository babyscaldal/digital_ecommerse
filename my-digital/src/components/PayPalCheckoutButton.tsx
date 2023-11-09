import { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAppDispatch } from "../app/hooks";
import { removeAllProducts } from "../app/Redux/products/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IPayPalCheckoutButton {
  totalPrice: number;
}

export default function PayPalCheckoutButton({
  totalPrice,
}: IPayPalCheckoutButton) {
  const [paidFor, setPaidFor] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleApprove = () => {
    setPaidFor(true);
  };

  useEffect(() => {
    if (paidFor) {
      toast.success("Thank you for purchasing from us");
      dispatch(removeAllProducts());
      navigate("/");
    } else if (error) {
      toast.error("Purchasing is failed. Please try again!!!");
    }
  }, [paidFor, error]);

  return (
    <div style={{ height: "40px" }}>
      <PayPalButtons
        onClick={(_, actions) => {
          const hasAlreadyBought = false;
          if (hasAlreadyBought) {
            setError("You already bought this products");
            return actions.reject();
          }
          return actions.resolve();
        }}
        createOrder={(_, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "subtotal",
                amount: {
                  value: totalPrice.toString(),
                },
              },
            ],
          });
        }}
        onApprove={async (_, actions) => {
          const order = await actions.order?.capture();
          console.log("order", order);

          handleApprove();
        }}
        onCancel={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError={(err: any) => {
          setError(err);
        }}
      />
    </div>
  );
}
