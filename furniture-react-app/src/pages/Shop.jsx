import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
import axios from "axios";

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [initialProds, setInitialProds] = useState([]);
  const [filterVal, setFilterVal] = useState("Filter By Category");
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await axios.get(
          `http://localhost:5001/products/list`
        );
        setProductsData(productsData.data);
        setInitialProds(productsData.data);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (e) => {
    const filterItem = e.target.value;
    setFilterVal(filterItem);
    handleDisplay(filterItem, searchVal);
  };

  const handleSearch = (e) => {
    const searchItem = e.target.value;
    setSearchVal(searchItem);
    handleDisplay(filterVal, searchItem);
  };

  const handleDisplay = (filterVal, searchVal) => {
    var prods = initialProds;
    if (searchVal === "" && filterVal === "Filter By Category") {
      prods = initialProds;
    } else if (searchVal && filterVal === "Filter By Category") {
      prods = productsData.filter((item) =>
        item?.title.toLowerCase().includes(searchVal.toLowerCase())
      );
    } else if (searchVal === "" && filterVal !== "Filter By Category") {
      prods = initialProds.filter(
        (item) => item?.category?.toLowerCase() === filterVal.toLowerCase()
      );
    } else {
      prods = initialProds.filter(
        (item) => item?.category?.toLowerCase() === filterVal.toLowerCase()
      );
      prods = prods.filter((item) =>
        item?.title.toLowerCase().includes(searchVal.toLowerCase())
      );
    }
    setProductsData(prods);
  };


  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row class="Shop">
            <Col lg={5} md="6" sm={6}>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="Sofa">Sofa</option>
                  <option value="chair">Chair</option>
                  <option value="table">Table</option>
                  <option value="bed">Bed</option>
                </select>
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="search_box">
                <input
                  type="text"
                  placeholder="Search..... "
                  onChange={handleSearch}
                />
                <span>
                  <SearchIcon />
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {initialProds.length === 0 ? (
              <h1>Products Loading...</h1>
            ) : productsData.length === 0 ? (
              <>
              <h1>No Products Found!!</h1>
              </>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
