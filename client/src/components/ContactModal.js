// src/components/ContactModal.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ContactModal.css";

const ContactModal = ({ darkMode, onClose }) => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <motion.div
      className="contact-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`contact-box ${darkMode ? "dark-contact" : ""}`}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="modal-header">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              ℹ️ About
            </button>
            <button
              className={`tab-btn ${activeTab === "contact" ? "active" : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              📞 Contact
            </button>
          </div>
          <button className="close-x" onClick={onClose}>
            ✖
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "about" ? (
            <motion.div
              key="about"
              className="modal-content"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.25 }}
            >
              <h3>🎮 About PlayPulse</h3>
              <p>
                <strong>PlayPulse</strong> — A real-time multi-sport live
                scoreboard bringing you instant updates from Cricket, Football,
                and more!
              </p>
              <p>
                Stay updated with match stats, player info, upcoming events, and
                much more. Built with ❤️ by{" "}
                <strong>Shashank Upadhyay</strong>.
              </p>
              <p>Version: <strong>2.0</strong></p>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              className="modal-content"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <h3>📬 Contact Details</h3>
              <p><strong>Name:</strong> Shashank Upadhyay</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:theshashankupa8127@gmail.com">
                  theshashankupa8127@gmail.com
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a
                  href="https://github.com/ShashankUpadhyay45"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/ShashankUpadhyay45
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href="https://www.linkedin.com/in/shashank-upadhyay-a937a5322"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/shashank-upadhyay
                </a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
