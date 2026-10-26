import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function WhatsAppWidget() {
  return (
    <a
      href={personalInfo.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Kishan"
      title="Chat on WhatsApp"
      className="floating-whatsapp-btn"
    >
      <span className="whatsapp-radar-dot">
        <span className="whatsapp-radar-ping" />
        <span className="whatsapp-radar-core" />
      </span>

      <svg
        className="w-7 h-7 fill-current"
        style={{ width: '28px', height: '28px', fill: '#fff' }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.777.978-.953 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.632-.929-2.235-.244-.588-.492-.508-.678-.518-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376-.276.301-1.054 1.029-1.054 2.509 0 1.48 1.079 2.908 1.23 3.109.15.2 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.723.23 1.38.197 1.9.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.201-.577-.351z"></path>
        <path d="M12 2a9.93 9.93 0 0 0-8.583 14.933L2 22l5.215-1.368A9.934 9.934 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.625 0-3.153-.437-4.48-1.202l-.322-.187-3.324.872.887-3.239-.205-.327A8.163 8.163 0 0 1 3.8 12c0-4.522 3.678-8.2 8.2-8.2 4.522 0 8.2 3.678 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z"></path>
      </svg>
    </a>
  );
}
