import Navbar from "../Components/navbar";
import Hero from "../Components/hero";
import Productgrid from "../Components/productgrid";



const Home = () => {
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