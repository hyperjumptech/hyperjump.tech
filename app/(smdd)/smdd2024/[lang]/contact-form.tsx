"use client";

import {
  briefDescription,
  company,
  companySize,
  email,
  name,
  person,
  phone,
  send,
  talkIntro,
  talkPunchline,
  talkWithUs
} from "@/locales/.generated/server";
import { SupportedLanguage } from "@/locales/.generated/types";
import { useState } from "react";
import data from "@/data.json";

export default function ContactForm({ lang }: { lang: SupportedLanguage }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    company_size: "",
    message: ""
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recipient = data.SMDD_2024_SUBMIT_FORM_EMAIL;
    const subject = "SMDD 2024 Contact Form";
    const body = `
    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone}
    Company: ${formData.company}
    Company Size: ${formData.company_size}
    Message: ${formData.message}
        `.trim();

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="container mx-auto w-full max-w-7xl px-4 text-black sm:px-0">
      <h1 className="my-4 mb-8 text-2xl leading-tight font-bold xl:text-5xl">
        {talkWithUs(lang)}
      </h1>
      <p>
        {talkIntro(lang)}{" "}
        <span className="font-semibold">{talkPunchline(lang)}</span>
      </p>
      <form
        id="contact-form"
        className="my-4 flex flex-col gap-2"
        onSubmit={handleSubmit}>
        <label className="font-semibold" htmlFor="name">
          {name(lang)}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
        <label className="font-semibold" htmlFor="email">
          {email(lang)}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
        <label className="font-semibold" htmlFor="phone">
          {phone(lang)}
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
        <label className="font-semibold" htmlFor="company">
          {company(lang)}
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 p-2"
        />
        <label className="font-semibold" htmlFor="company_size">
          {companySize(lang)}
        </label>
        <select
          name="company_size"
          value={formData.company_size}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 p-2">
          <option value="1-10">1-10 {person(lang)}</option>
          <option value="10-25">10-25 {person(lang)}</option>
          <option value="25-100">25-100 {person(lang)}</option>
          <option value="100-500">100-500 {person(lang)}</option>
          <option value="500+">500+ {person(lang)}</option>
        </select>
        <label className="font-semibold" htmlFor="message">
          {briefDescription(lang)}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 p-2"></textarea>
        <button
          type="submit"
          className="bg-smdd-red disabled:bg-smdd-red/50 my-2 self-start rounded-full p-2 px-8 text-white transition-all duration-150">
          <span>{send(lang)}</span>
        </button>
      </form>
    </div>
  );
}
