// client/src/pages/Contact.js
import React from "react";

export default function Contact() {
  return (
    <section className="contact">
      <h2>Contact Me</h2>
      <p><strong>Name:</strong> Shashank Upadhyay</p>
      <p><strong>Email:</strong> theshashankupa8127@gmail.com</p>
      <p>
        <strong>GitHub:</strong>{" "}
        <a href="https://github.com/ShashankUpadhyay45" target="_blank" rel="noreferrer">
          ShashankUpadhyay45
        </a>
      </p>
      <p>
        <strong>LinkedIn:</strong>{" "}
        <a href="https://www.linkedin.com/in/shashank-upadhyay-a937a5322" target="_blank" rel="noreferrer">
          View Profile
        </a>
      </p>

      {/* mailto: will open the user's default mail client. If the OS has no default mail client,
          the OS will ask (this is normal and you saw that dialog previously). */}
      <a className="email-btn" href="mailto:theshashankupa8127@gmail.com">📧 Send Email</a>
    </section>
  );
}
