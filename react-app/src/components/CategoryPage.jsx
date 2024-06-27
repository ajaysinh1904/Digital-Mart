import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function CategoryPage() {
    const navigate = useNavigate();
    const { catName } = useParams();

    const [products, setProducts] = useState([]);
    const [cProducts, setCProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        fetchProducts(catName);
    }, [catName]);

    const fetchProducts = (category) => {
        const url = `${API_URL}/get-products?catName=${category}`;
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                alert('Server Error.');
            });
    };

    const handleSearch = () => {
        const url = `${API_URL}/search?search=${search}&loc=${localStorage.getItem('userLoc')}`;
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setCProducts(res.data.products);
                    setIsSearch(true);
                } else {
                    setCProducts([]);
                    setIsSearch(true);
                }
            })
            .catch((err) => {
                console.error('Error searching products:', err);
                alert('Server Error.');
            });
    };

    const handleCategory = (value) => {
        const filteredProducts = products.filter(item => item.category === value);
        setCProducts(filteredProducts);
        setIsSearch(false); // Reset search state when switching categories
    };

    const handleLike = (productId) => {
        const userId = localStorage.getItem('userId');
        const url = `${API_URL}/like-product`;
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.');
                }
            })
            .catch((err) => {
                console.error('Error liking product:', err);
                alert('Server Error.');
            });
    };

    const handleProduct = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div>
            <Header search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <Categories handleCategory={handleCategory} />
            
            {isSearch && cProducts.length === 0 && <h5>No Results Found</h5>}
            
            {isSearch && (
                <div className="d-flex justify-content-center flex-wrap">
                    {cProducts.map((item) => (
                        <div key={item._id} className="card m-3">
                            <div onClick={() => handleLike(item._id)} className="icon-con">
                                <FaHeart className="icons" />
                            </div>
                            <img width="300px" height="200px" src={`${API_URL}/${item.pimage}`} alt={item.pname} />
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <h3 className="m-2 text-danger">Rs. {item.price}</h3>
                            <p className="m-2 text-success">{item.pdesc}</p>
                        </div>
                    ))}
                </div>
            )}

            {!isSearch && (
                <div className="d-flex justify-content-center flex-wrap">
                    {products.map((item) => (
                        <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
                            <div onClick={() => handleLike(item._id)} className="icon-con">
                                <FaHeart className="icons" />
                            </div>
                            <img width="250px" height="150px" src={`${API_URL}/${item.pimage}`} alt={item.pname} />
                            <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                            <p className="m-2">{item.pname} | {item.category}</p>
                            <p className="m-2 text-success">{item.pdesc}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;
