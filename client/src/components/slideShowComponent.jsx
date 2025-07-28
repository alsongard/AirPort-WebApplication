import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import passenger_view_1 from "../assets/images/passenger_view_1.jpg"
import private_flight from "../assets/images/private_flight.jpg"
import medium_passenger from "../assets/images/medium_passenger.jpg"
import large_passenger from "../assets/images/large_passenger.jpg";
import terminal_view from "../assets/images/terminal_view.jpg";
// large_passenger.jpg
const Slideshow = () => {
//   const slideImages = [
//     { url: passenger_view_1, caption: "Caption 1" },
//     { url: private_flight, caption: "Caption 2" },
//     { url: medium_passenger, caption: "Caption 3" },
//     { url: large_passenger, caption: "Caption 4" }
//   ];
    const slideImages = [
        {url: "/images/passenger_view_1.jpg", caption: "Fly With SkyLine"},
        {url: "/images/private_flight.jpg"},
        {url: "/images/medium_passenger.jpg"},
        {url: "/images/large_passenger.jpg"},
        {url: "images/terminal_view.jpg"}
    ]
  return (
    <Slide cssClass="">
      {slideImages.map((slideImage, index) => (
        <div className='  ' key={index}>
          <div 
            className="image"
            style={{
              backgroundImage: `url(${slideImage.url})`,
              height: '650px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position:'relative'
            }}
          >
            <span className="pt-[150px] left-[50%] text-[40px] absolute text-white">{slideImage.caption}</span>
            <span className="pt-[220px] left-[50%] text-[40px]  text-white"><button>Book  Flight</button></span>
          </div>
        </div>
      ))}
    </Slide>
  );
};

// export default Slideshow;