import Icons from "./Icons";

const ContactInfo = () => {
     return (
          <div className="flex flex-col items-center h-full md:block bg-blue-600 text-gray-50 px-6 py-5 md:py-8 md:rounded-e-3xl transition-all">
                    <h2 className="text-3xl font-bold mb-6 text-center md:text-start lg:mb-16">
                         Contact Information
                    </h2>
               <div className="flex flex-wrap gap-x-16 gap-y-4 md:pe-6">
                    <div>
                         <p className="md:text-xl font-bold">Phone</p>
                         <a
                              href="tel:+201271931937"
                              className="hover:text-blue-950 transition-all"
                         >
                              (+20) 127-193-1937
                         </a>
                    </div>
                    <div>
                         <p className="md:text-xl font-bold">Email</p>
                         <a
                              href="mailto:a_bavly@yahoo.com"
                              className="hover:text-blue-950 transition-all"
                         >
                              a_bavly@yahoo.com
                         </a>
                    </div>
               </div>
               <div className="mt-8 text-center md:text-start">
                    <p>Or contact us on</p>
                    <Icons />
               </div>
          </div>
     );
};

export default ContactInfo;
