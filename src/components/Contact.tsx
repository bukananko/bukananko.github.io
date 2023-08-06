import { FaEnvelopeOpenText, FaWhatsapp } from "react-icons/fa6";

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <h1 className="text-blue-500 text-lg font-extrabold">Contact</h1>
      <p className="text-xl md:text-2xl font-extrabold">
        Don't be shy! Hit me up! 👇
      </p>

      <div className="flex flex-col md:flex-row mt-10 gap-10 md:gap-20">
        <a
          href="mailto:ankoo890@gmail.com"
          target="_blank"
          className="flex gap-5 items-center">
          <FaEnvelopeOpenText
            size={30}
            title="Email"
            className="fill-blue-500"
          />

          <div>
            <h1 className="font-extrabold text-blue-500">Email</h1>
            <p className="text-gray-500">ankoo890@gmail.com</p>
          </div>
        </a>

        <a
          href="https://wa.me/6289630138117"
          target="_blank"
          className="flex gap-5 items-center">
          <FaWhatsapp size={30} title="Whatsapp" className="fill-green-500" />

          <div>
            <h1 className="font-extrabold text-green-500">Whatsapp</h1>
            <p className="text-gray-500">+6289630138117</p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Contact;
