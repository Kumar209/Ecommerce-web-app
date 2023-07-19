import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
// import Products from "./components/Products/Products.jsx";
import "./App.css";
// import { useSelector } from 'react-redux';
import WebFont from "webfontloader";
import ProductDetails from './components/Products/ProductDetails';
// import { loadUser } from "./reduxSlices/userSlice";
// import Store from "./store";

const App = () => {
  // const {isAuthenticated,user} = useSelector((state) =>state.user);


  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
    // const { data } = await axios.get("/api/v2/stripeapikey");

    // setStripeApiKey(data.stripeApiKey);
  // }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },


    });
    
    // Store.dispatch(loadUser());
    
    // getStripeApiKey();

  }, []);

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App
