import Navbar from "../Components/navbar";
import Hero from "../Components/hero";
import Productgrid from "../Components/productgrid";
import { useState } from "react";


const Home = () => {
  const [showFilters, setShowFilters] = useState(true);
    return (
    <div>
      <Navbar />
      <Hero />

      <div className="flex">
        <Productgrid />
      </div>
    </div>
  );
};

export default Home;