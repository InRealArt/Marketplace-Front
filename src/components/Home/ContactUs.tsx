const ContactUs = () => {
  return (
    <section id="contact-us" className="ContactUs">
      <div className="ContactUs__infos">
        <h2 className="ContactUs__title">It’s your turn !</h2>
        <p className="ContactUs__description">
          Get ready to buy your artwork. Inreal art propose to offer this
          services for all creator. The principe is pretty simple. You propose
          your art and we see if your art inrest some client : It’s pretty
          simple you don’t think so ?
        </p>
      </div>
      <form className="ContactUs__input">
        <input
          className="ContactUs__search"
          type="search"
          placeholder="Get started with a mail"
        />
      </form>
    </section>
  );
};

export default ContactUs;
