import { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

const Navbar = ({ setIsLogin }) => {
  const { subTotal, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <>
      <div className="bg-[#f4cd8c7a] backdrop-blur-md p-4 flex justify-between items-center h-[120px] shadow-lg sticky top-0 z-10">
        <Link to="/">
          <img src={assets.logo} className="h-8" />
        </Link>
        <div className="flex flex-row gap-8 text-[20px] font-medium h-[40px]">
          <Link
            to="/"
            className="hover:border-b-2 pb-2 border-b-orange-500 cursor-pointer"
          >
            Home
          </Link>
          <a
            href="#menu"
            className="hover:border-b-2 pb-2 border-b-orange-500 cursor-pointer"
            onClick={()=>navigate('/')}
          >
            Menu
          </a>
          <a
            href="#mobile-app"
            className="hover:border-b-2 pb-2 border-b-orange-500 cursor-pointer"
            onClick={()=>navigate('/')}
          >
            Mobile-app
          </a>
          <a
            href="#contact"
            className="hover:border-b-2 pb-2 border-b-orange-500 cursor-pointer"
            onClick={()=>navigate('/')}
          >
            Contact Us
          </a>
        </div>
        <div className="flex flex-row w-max h-8 gap-8 pr-14 items-center">
          <img src={assets.search_icon}></img>
          {token ? (
            <div>
              <Popover>
                <PopoverTrigger>
                  <img src={assets.profile_icon} className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col items-start w-[160px] p-4 gap-4 shadow-2xl">
                  <Link to="/cart">
                    <div className="flex flex-row gap-2 items-center cursor-pointer">
                      <img
                        src={assets.basket_icon}
                        className={`${subTotal() != 0 ? "animate-bounce" : ""}`}
                      />
                      <span className="font-semibold hover:text-orange-600">
                        Your orders
                      </span>
                    </div>
                  </Link>
                  <div
                    className="flex flex-row gap-2 items-center cursor-pointer"
                    onClick={logout}
                  >
                    <img src={assets.logout_icon} />
                    <span className="font-semibold hover:text-orange-600">
                      Logout
                    </span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <button
              onClick={() => setIsLogin(true)}
              className="bg-transparent font-semibold hover:text-orange-600 !border-2 !border-orange-500 !rounded-[20px] px-6 py-2 hover:bg-orange-200 transition duration-500"
            >
              sign-in
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
