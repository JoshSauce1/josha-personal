import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import emailjs from "emailjs-com";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9frosre", // Replace with your service ID
        "template_tmfhwvf", // Replace with your template ID
        e.target,
        "nGos5it6J5jTk_45o" // Replace with your user ID
      )
      .then((result) => {
        console.log(result.text);
        alert("Message sent!");
        // Reset form fields after submission
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.log(error.text);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="formcontainer">
      <form onSubmit={sendEmail}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button className="contact_btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const Carousel = ({ items = [], onCaptionChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      // Notify parent component of the current caption
      onCaptionChange(items[currentIndex].caption);

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 10000); // Change slide every 10 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [items.length, currentIndex, onCaptionChange]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="carousel-slides">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="carousel-slide"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 0.5s ease",
              }}
            >
              <img src={item.image} alt={item.alt} />
            </div>
          ))
        ) : (
          <p>No items available</p> // Fallback if items array is empty
        )}
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

const MainContent = () => {
  const [caption, setCaption] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleScroll = () => {
    const welcomeSection = document.getElementById("welcome-section");
    const { bottom } = welcomeSection.getBoundingClientRect();
    setIsButtonVisible(bottom < 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToWelcome = () => {
    const welcomeSection = document.getElementById("welcome-section");
    welcomeSection.scrollIntoView({ behavior: "smooth" });
  };

  // Define your carousel items here
  const carouselItems = [
    {
      image: "/recipe_app.png",
      alt: "Slide 1",
      caption:
        "The Recipe Search API project uses React.js to let users search dishes and view ingredients via Edamam's API. It involves React Hooks, async API calls, and CSS modules, and is deployed on Google Firebase. More details are in the case study.",
    },
    {
      image: "/CLIPT.png",
      alt: "Slide 2",
      caption:
        "The CLI-RESTAPI_DotNet6 project is a RESTful API built with .NET 6 to manage CLI commands. It uses .NET Core, MVC architecture, and C#, and supports CRUD operations with SwaggerUI for testing. More details are in the case study.",
    },
    {
      image: "/cpu-emulator.png",
      alt: "Slide 3",
      caption:
        "The CPU-Emulator project in Java simulates a simple CPU, including binary operations, arithmetic, and logical functions. It features an assembler to convert assembly code into machine code. Key aspects include instruction formats, opcode compositions, and register usage. More details are in the architecture document.",
    },
    {
      image: "/newegg.png",
      alt: "Slide 4",
      caption:
        "The Newegg Webscraper project is a Python script that searches Newegg.com for products, retrieves their prices and links, and sorts them by price. It uses Beautiful Soup and Requests for web scraping. The project aims to practice web scraping skills and was inspired by building a PC. More details are in the case study.",
    },
  ];

  return (
    <main className="main-content">
      <div className="welcome-section" id="welcome-section">
        <h1>
          Hi, <br />
          I'm Joshua Abreu:
        </h1>
        <p>
          An enthusiastic student in college completing my computer science
          degree.
        </p>
        <a href="#about-me" className="btn">
          See more &#8594;
        </a>
      </div>

      {isButtonVisible && (
        <button className="scroll-to-top" onClick={scrollToWelcome}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}

      <div className="about-me" id="about-me">
        <div className="row">
          <div className="column-one">
            <h1>About Me</h1>
            <p>
              Passionate about technology and driven by a commitment to
              continuous learning, I am a front-end developer with a strong
              foundation in React JS, HTML, CSS, and JavaScript. My experience
              includes working on diverse projects that blend creativity and
              technical skills to solve real-world problems. Outside of my
              professional work, I enjoy reading, staying fit, and pursuing
              various interests that keep me engaged and inspired.
            </p>

            <p>You can find links to my socials below</p>

            <div className="about-links">
              <p>
                <a
                  href="https://www.linkedin.com/in/josh-abreu-26359527a/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </p>
              <p>
                <a href="mailto:joshuaabreu16@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/JoshSauce1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </p>
            </div>
          </div>
          <div className="column-two">
            {/* <img src="/CLIPT.png" alt="graduation" style={{ width: "225px" }} /> */}
          </div>
        </div>
      </div>

      <div className="projects">
        <div className="row">
          <div className="projects-column-one">
            <h1>Projects</h1>
            <p>{caption}</p> {/* Display caption */}
          </div>
          <div className="projects-column-two">
            <Carousel items={carouselItems} onCaptionChange={setCaption} />
          </div>
        </div>
      </div>

      <div className="contact">
        <div className="row">
          <div className="contact-column-one">
            <h1>Contact</h1>
            <p>
              Have a question or want to work together? Leave your details and
              I'll get back to you as soon as possible.
              <br />
            </p>
          </div>
          <div className="contact-column-two">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <p>Josh Abreu &#xa9;2024</p>
      <div className="footer-container">
        <p>
          <a href="mailto:joshuaabreu16@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </p>
        <p>
          <a
            href="https://github.com/JoshSauce1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </p>
      </div>
    </div>
  );
};

const Screen = () => {
  return (
    <div className="App">
      <MainContent />
      <Footer />
    </div>
  );
};

export default Screen;
