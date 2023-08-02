import { useEffect, createContext, useState } from "react";
import axios from "axios";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchOrder, setSearchOrder] = useState("");
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders/");
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getAllOrder();
  }, []);

  const filteredProducts = order.filter((product) =>
    product.User?.username?.toLowerCase().includes(searchOrder.toLowerCase())
  );

  return (
    <SearchContext.Provider
      value={{ setSearchOrder, searchOrder, filteredProducts }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
