import { MoveRight } from 'lucide-react';

const ContactUs = () => {
  return (
    <section id="contact-us" className="max-w-full bg-[#2C2C2C] p-[50px] flex flex-col mt-[50px] scroll-mt-[60px] sm:p-[60px] md:mt-[80px] lg:p-[80px] xl:px-[180px] xl:py-[80px] md:flex-row md:justify-between md:items-end">
      <div className="mb-5 md:mb-0">
        <h2 className="font-montserrat text-[32px] tracking-[0px] text-white font-bold mb-5 md:text-[60px] lg:text-[90px]">It&apos;s your turn !</h2>
        <p className="font-montserrat text-base tracking-[-0.25px] text-white font-normal leading-[24px] w-full md:text-[18px] md:leading-[27px] md:w-[70%]">
          Get ready to buy your artwork. Inreal art propose to offer this
          services for all creator. The principe is pretty simple. You propose
          your art and we see if your art inrest some client : It&apos;s pretty
          simple you don&apos;t think so ?
        </p>
      </div>
      <form className="w-full relative md:max-w-[50%]">
        <input
          className="font-montserrat text-xs tracking-[-0.25px] border border-white text-white py-[15px] px-[15px] bg-transparent w-full placeholder:text-white md:text-[18px] md:py-5 md:px-[30px]"
          type="email"
          placeholder="Get started with a mail"
        />
        <MoveRight className="absolute right-3 top-[14px] text-[#2C2C2C] bg-white pr-2 pl-[3px] w-5 h-5 md:right-[10px] md:top-[13px] md:pr-3 md:pl-[5px] md:w-[40px] md:h-[40px]" width={20} height={20} />
      </form>
    </section>
  );
};

export default ContactUs;
