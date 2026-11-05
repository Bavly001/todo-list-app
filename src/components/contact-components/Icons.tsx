import {
     FaFacebook,
     FaWhatsapp,
     FaLinkedin,
     FaInstagram,
} from "react-icons/fa";

const Icons = () => {
     return (
          <div className="flex space-x-4 mt-6 text-xl sm:text-2xl md:text-3xl">
               <a
                    href="https://www.facebook.com/bavly.ashraf.7"
                    target="_blank"
                    rel="noreferrer"
               >
                    <FaFacebook className=" transition-all hover:text-blue-950" />
               </a>
               <a
                    href="https://www.instagram.com/a.bavly/"
                    target="_blank"
                    rel="noreferrer"
               >
                    <FaInstagram className=" transition-all hover:text-blue-950" />
               </a>
               <a
                    href="https://wa.me/201271931937"
                    target="_blank"
                    rel="noreferrer"
               >
                    <FaWhatsapp className=" transition-all hover:text-blue-950" />
               </a>
               <a
                    href="https://www.linkedin.com/in/bavlyashraf/"
                    target="_blank"
                    rel="noreferrer"
               >
                    <FaLinkedin className=" transition-all hover:text-blue-950" />
               </a>
          </div>
     );
};

export default Icons;
