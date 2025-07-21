import "./globals.css";
import SearchMenu from "./components/SearchMenu";
import MenuBtn from "./components/MenuBtn";
import GoogleMap from "./components/GoogleMap";

export default function Home() {
  return (
    <div className="">
       <GoogleMap />
   <SearchMenu />
   <MenuBtn />
    </div>
  );
}