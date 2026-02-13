import { NextResponse } from "next/server";
import data from "@/data.json";
import { mainOpenInGoogleMaps } from "@/locales/.generated/strings";
import {
  getCommercialProduct,
  openSourceProducts
} from "../[lang]/(hyperjump)/products/data";
import {
  getCaseStudies,
  getFaqs,
  location,
  services
} from "../[lang]/(hyperjump)/data";
import { team } from "../[lang]/(hyperjump)/team/data";

export const dynamic = "force-static";
export async function GET() {
  const content = `# Hyperjump

Your partner in building reliable, modern software. We help organizations deliver scalable, high-quality digital systems through engineering excellence and cloud-native technology.

## Clients

${clientList()}

## Services

We offer expert technology solutions to help businesses scale, enhance efficiency, optimize operations, and drive continuous innovation.

${serviceList()}

## Case studies

Discover how we successfully transform challenges into opportunities with real-world solutions that drive lasting impact and business growth.

${caseStudyList()}

## Products by Hyperjump

Explore the products that power tomorrow's digital solutions.

${productList()}

## Open source product

Explore our open-source projects and see how we innovate, collaborate, and build solutions that drive real impact. Join our community and contribute to cutting-edge technology.

${openSourceProductList()}

## Frequently asked questions

Find answers to commonly asked questions. If you need further assistance, feel free to reach out to us.

${faqList()}

## Our location

${addressList()}

## Meet our team

Our team consists of highly skilled professionals dedicated to delivering exceptional results.

${teamList()}`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

const LOCALE = "en";
const { clients, url } = data;

function clientList() {
  return clients
    .map(({ imageUrl, name }) => `- ![${name}](${url}${imageUrl}) ${name}`)
    .join("\n");
}

function serviceList() {
  return services(LOCALE)
    .map(
      ({ description, slug, title }) =>
        `- [${title}](${url}/${LOCALE}/services/${slug}): ${description}`
    )
    .join("\n");
}

function caseStudyList() {
  return getCaseStudies(LOCALE)
    .map(
      ({ description, title, url: urlCaseStudy }) =>
        `- [${title}](${url}${urlCaseStudy}): ${description}`
    )
    .join("\n");
}

function productList() {
  return getCommercialProduct(LOCALE)
    .map(({ description, title }) => `- ${title}: ${description}`)
    .join("\n");
}

function openSourceProductList() {
  return openSourceProducts(LOCALE)
    .map(
      ({ description, repoUrl, title }) =>
        `- [${title}](${repoUrl}): ${description}`
    )
    .join("\n");
}

function faqList() {
  return getFaqs(LOCALE)
    .map(({ answer, question }) => `### ${question}\n\n${answer}`)
    .join("\n\n");
}

const {
  address: { street, locality, postalCode, country },
  duns,
  email,
  mapsUrl,
  title
} = location;

function addressList() {
  return `### ${title}

Address: ${street}, ${locality} - ${postalCode}, ${country}
Email: [${email}](mailto:${email})
D&B D-U-N-S: ${duns}
[${mainOpenInGoogleMaps(LOCALE)}](${mapsUrl})`;
}

function teamList() {
  return team
    .map(
      ({ description, name, linkedIn, role }) =>
        `- [${name}](${linkedIn}) (**${role}**) - ${description}`
    )
    .join("\n");
}
