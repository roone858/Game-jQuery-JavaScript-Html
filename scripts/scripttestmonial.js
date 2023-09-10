const testimonialsContainer = document.querySelector(".testimonials-container");
const testimonial = document.querySelector(".testimonial");
const userImage = document.querySelector(".user-image");
const username = document.querySelector(".username");
const role = document.querySelector(".role");

const testimonials = [
  {
    name: "Mahmoud Gamal",
    position: "Dev Ops",
    photo: "https://randomuser.me/api/portraits/men/97.jpg",
    text: "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer.  clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
  },
  {
    name: "Ahmed Samir",
    position: "Software Engineer",
    photo: "https://randomuser.me/api/portraits/men/97.jpg",
    text: "This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!",
  },
  {
    name: "Safy Ibrahim",
    position: "Front-end Dev",
    photo: "https://randomuser.me/api/portraits/men/97.jpg",
    text: "She is a hard worker. Communication was also very good with her and She was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
  },
  {
    name: "Kirollos George",
    position: "Front-end Dev",
    photo: "https://randomuser.me/api/portraits/men/97.jpg",
    text: "Working with Kirollos has been a great experience. and fast in react native and publishing on google play and apple store, and Having good communication skills, he's easy to work with, driven and enthusiastic. Highly recommended!",
  },
];

let idx = 1;

function updateTestimonial() {
  const { name, position, photo, text } = testimonials[idx];

  testimonial.innerHTML = `" ${text} "`;
  userImage.src = photo;
  username.innerHTML = name;
  role.innerHTML = position;

  idx++;

  if (idx > testimonials.length - 1) {
    idx = 0;
  }
}
updateTestimonial()
setInterval(updateTestimonial, 4000);
