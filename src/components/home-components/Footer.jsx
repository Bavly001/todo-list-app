import {
     FaFacebook,
     FaInstagram,
     FaGithub,
     FaLinkedin,
     FaEnvelope,
     FaBehance,
     FaPhoneAlt,
     FaWhatsapp,
} from "react-icons/fa";
import Logo from "../Logo";
import { LuCopyright } from "react-icons/lu";

export function Footer() {
     return (
          <footer className="w-full bg-gray-100 p-8">
               <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
                    <p className="flex items-center justify-center text-lg font-bold">
                         <Logo smallLogo className="w-16 h-16 mb-1"/>
                         Doit
                    </p>

                    <div className="flex flex-row gap-x-4 text-xl text-gray-500">
                         <a href="tel:+201271931937">
                              <FaPhoneAlt className=" transition-all hover:text-gray-700" />
                         </a>
                         <a
                              href="https://www.facebook.com/bavly.ashraf.7"
                              target="_blank"
                              rel="noreferrer"
                         >
                              <FaFacebook className=" transition-all hover:text-gray-700" />
                         </a>
                         <a
                              href="https://www.instagram.com/a.bavly/"
                              target="_blank"
                              rel="noreferrer"
                         >
                              <FaInstagram className=" transition-all hover:text-gray-700" />
                         </a>
                         <a
                              href="https://wa.me/201271931937"
                              target="_blank"
                              rel="noreferrer"
                         >
                              <FaWhatsapp className=" transition-all hover:text-gray-700" />
                         </a>
                         <a
                              href="https://www.linkedin.com/in/bavlyashraf/"
                              target="_blank"
                              rel="noreferrer"
                         >
                              <FaLinkedin className=" transition-all hover:text-gray-700" />
                         </a>
                         <a
                              href="https://github.com/Bavly001"
                              target="_blank"
                              rel="noreferrer"
                         >
                              <FaGithub className=" transition-all hover:text-gray-700" />
                         </a>
                         <a
                              href="https://www.behance.net/bavlyashraf"
                              target="_blank"
                              rel="noreferrer"
                         >
                              <FaBehance className=" transition-all hover:text-gray-700" />
                         </a>
                         <a
                              href="mailto:a_bavly@yahoo.com"
                              target="_blank"
                              rel="noreferrer"
                         >
                              <FaEnvelope className=" transition-all hover:text-gray-700" />
                         </a>
                    </div>
               </div>
               <hr className="my-8 border-blue-gray-50" />
               <p className="flex flex-col md:flex-row justify-center items-center gap-x-1 text-gray-500 text-xs md:text-base ">
                    <span>
                         <LuCopyright className="inline" /> {new Date().getFullYear()}{" "}
                         <span className="text-blue-600 font-bold">Doit</span> |
                         All
                    Rights Reserved to
                    </span>
                    <span className="italic font-bold w-full text-center md:w-auto"> Bavly Ashraf</span>
               </p>
          </footer>
     );
}

export default Footer;
