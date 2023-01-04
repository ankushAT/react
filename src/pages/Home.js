import React from 'react'
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoaderComponent } from '../components/Loader';
import { addToCart, fetchAllProducts } from '../services/products';
import { getIdTokenFromCookie } from '../services/auth';
import { Navigate, useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate()
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [cart, setCart] = React.useState();

    React.useEffect(() => {
        fetchProductsHandler();
        return () => {
            console.log("This will be logged on unmount");
        }
    }, []);

    const fetchProductsHandler = async () => {
        const productsData = await fetchAllProducts();
        if (productsData) {
            setData(productsData);
        }
        setLoading(false)
    }

    const addProductToCartHandler = async (id) => {
        if (!getIdTokenFromCookie()) {
            navigate('/login')
            return
        }
        const addProductToCartResponse = await addToCart(id);
        if (addProductToCartResponse) {
            toast("Your product has been added to cart")
        }
        setCart(cart)
    }


    if (loading) {
        return <LoaderComponent />
    }

    const ItemCard = (id, image, name, price) => {
        return (
            <div style={HomeStyles.MainCard}>
                <div style={HomeStyles.ImageContainer}>
                    <img style={HomeStyles.Image} src={image} alt="" />
                </div>
                <div style={HomeStyles.TextContainer}>
                    <div style={HomeStyles.ItemName}>
                        {name}
                    </div>
                    <div style={HomeStyles.ItemPrice}>
                        {price}
                    </div>
                </div>
                <button
                    style={HomeStyles.AddToCardBtn}
                    onClick={() => { addProductToCartHandler(id) }}
                >
                    Add To Card
                </button>
            </div>
        )

    }

    return (
        <div className="body-color">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2><b>Products</b ></h2 >
                        <div id="myCarousel" className="d-flex flex-row" data-ride="carousel" data-interval="0">
                            <div style={HomeStyles.ItemCardContainer}>
                                {
                                    data && data?.map(((item, index) => (
                                        <div className="carousel-inner" key={index}>
                                            {ItemCard(item.id, item.image, item.name, item.price)}
                                        </div>
                                    )))}
                            </div>
                        </div>
                    </div >
                </div >
            </div >
            <ToastContainer />
        </div >
    )

};

export default Home;


const HomeStyles = {
    ItemCardContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    MainCard: {
        // maxWidth: '20vw',
        // minHieght: '25vh',
        // maxHieght: '25vh',
        padding: '5px',
        border: '3px solid white'
    },
    ImageContainer: {
        display: 'flex',

    },
    Image: {
        maxWidth: '18vw',
        // minHieght: '21vh'
    },
    TextContainer: {
        display: 'flex',
        padding: '3px',
        justifyContent: 'space-between'
    },
    ItemName: {
        fontSize: '21px'
    },
    ItemPrice: {
        fontSize: '21px'
    },
    AddToCardBtn: {
        display: 'flex',
        padding: '3px',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid gray',
        borderRadius: '15px'
    }
}