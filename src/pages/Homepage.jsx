import { Link } from "react-router-dom";
import PageNav from "../components/Pagenav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>Welcome to Homepage</h1>
      <Link to="/product">Product</Link>
    </div>
  );
}

export default Homepage;
