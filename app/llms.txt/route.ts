import { NextResponse } from "next/server";
import data from "@/data.json";
import { mainOpenInGoogleMaps } from "@/locales/.generated/server";
import {
  getCommercialProduct,
  getOpenSource
} from "../[lang]/(hyperjump)/products/data";
import {
  getCaseStudies,
  getFaqs,
  pageData,
  services
} from "../[lang]/(hyperjump)/data";

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

${addressList()}`;

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
      ({ description, title, urlCaseStudy }) =>
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
  return getOpenSource(LOCALE)
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

const { address, duns, email, mapsUrl, title } = pageData.location;

function addressList() {
  return `### ${title}

${address.join(" ")}
Email: [${email}](mailto:${email})
D&B D-U-N-S: ${duns}
[${mainOpenInGoogleMaps(LOCALE)}](${mapsUrl})`;
}
