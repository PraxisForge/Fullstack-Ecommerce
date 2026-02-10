import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "../api/axiosClient";
import {
  Loader2,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
} from "lucide-react";
import { showToast } from "../store/uiSlice"; // <--- Import this

interface OrderItem {
  product_name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  total_price: string;
  is_paid: boolean;
  created_at: string;
  items: OrderItem[];
}

const Orders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    axiosClient
      .get("orders/my-orders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePay = async (orderId: number) => {
    // REMOVED: window.confirm logic
    
    try {
      await axiosClient.put(`orders/${orderId}/pay/`);
      dispatch(showToast({ message: "Payment Successful! 💳", type: "success" }));
      fetchOrders();
    } catch {
      dispatch(showToast({ message: "Payment Failed", type: "error" }));
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-50 p-6 flex justify-between items-center border-b border-slate-100">
                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Order #{order.id}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock size={16} />
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="font-bold text-slate-900 text-lg">
                    ₹{order.total_price}
                  </p>

                  {/* STATUS BADGE */}
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${order.is_paid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {order.is_paid ? (
                      <CheckCircle size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}
                    {order.is_paid ? "Paid" : "Pending"}
                  </span>

                  {/* PAY BUTTON (Only if Pending) */}
                  {!order.is_paid && (
                    <button
                      onClick={() => handlePay(order.id)}
                      className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
                    >
                      <CreditCard size={12} /> Pay Now
                    </button>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="p-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg text-slate-400">
                        <Package size={20} />
                      </div>
                      <span className="font-medium text-slate-700">
                        {item.product_name}
                      </span>
                      <span className="text-xs text-slate-400">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="text-slate-600">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
