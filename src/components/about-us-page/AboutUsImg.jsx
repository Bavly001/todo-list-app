import BavlyAshrafImage from "../../assets/bavly-ashraf-image.jpg";
const AboutUsImg = () => {
     return (
          <div className="relative flex items-center justify-center py-36 md:py-0 w-full h-full">
                     <div className="absolute right-36 sm:right-60 md:right-20 w-3/6 sm:w-2/6 md:w-4/6 aspect-square rounded-full bg-blue-600 shadow-sm"/>
               <div className="absolute w-3/6 sm:w-2/6 md:w-4/6 object-cover aspect-square rounded-full overflow-hidden shadow-md">
                    <img
                         src={BavlyAshrafImage}
                         alt="Bavly Ashraf"
                         className="w-full"
                    />
               </div>
          </div>
     );
};

export default AboutUsImg;
