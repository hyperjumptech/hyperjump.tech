import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const content = `# Hyperjump

Your partner in building reliable, modern software. We help organizations deliver scalable, high-quality digital systems through engineering excellence and cloud-native technology.

## Clients

- Amman Mineral Internasional
- Bank Tabungan Negara
- Eka Mas Republik
- Sinar Mas Digital Day
- SMDV
- Smartfren

## Services

We offer expert technology solutions to help businesses scale, enhance efficiency, optimize operations, and drive continuous innovation.

- [Inference AI](https://hyperjump.tech/en/services/inference-ai): Design, develop, and deploy purpose-built AI agents that save time, cut costs, and scale operations.
- [ERP Implementation](https://hyperjump.tech/en/services/erp-implementation): Streamline operations with enterprise-grade ERP solutions, boosting efficiency and business intelligence.
- [CTO-as-a-Service](https://hyperjump.tech/en/services/cto-as-a-service): Finding, hiring, managing, and retaining top software engineers is complex and time-consuming. Let us handle it all for you.
- [Software-as-a-Service](https://hyperjump.tech/en/services/software-as-a-service): Deploy and scale software solutions tailored to your enterprise for optimal performance and growth.
- [Tech Due Diligence](https://hyperjump.tech/en/services/tech-due-diligence): Verify and assess your company's ability to execute its roadmap and evaluate its current state.

## Case studies

Discover how we successfully transform challenges into opportunities with real-world solutions that drive lasting impact and business growth.

- [Transforming a fisheries tech team into a scalable product engine](https://hyperjump.tech/case-studies/erp-fisheries): A junior but passionate tech team. Zero products in production. High impact at stake. We embedded deeply with their team to introduce structure, build confidence, and ship a functional MVP within 3 months. Through rigorous agile practices and full-system rollouts, we helped evolve a fragile tech org into a reliable product engine.
- [Elevating a media-tech engineering team from feature factory to innovation powerhouse](https://hyperjump.tech/case-studies/ctoaas-media): When rapid growth outpaced engineering maturity, this team needed more than features, they needed transformation. We restructured their agile practices, automated DevOps, established measurable KPIs, and helped them move from task execution to true product ownership and experimentation.

## Open source product

Explore our open-source projects and see how we innovate, collaborate, and build solutions that drive real impact. Join our community and contribute to cutting-edge technology.

- [Grule](https://github.com/hyperjumptech/grule-rule-engine): Grule is a powerful open-source rule engine for Go that lets you define business rules in a human-readable format—making your app more flexible and maintainable.
- [Monika](https://github.com/hyperjumptech/monika): Monika is a command line application to monitor every part of your web app using a simple JSON configuration file. Get alert not only when your site is down but also when it's slow.
- [WhatsApp Chatbot Connector](https://github.com/hyperjumptech/whatsapp-chatbot-connector): WhatsApp Chatbot Connector backend built using Express.js. It is designed to integrate with the WhatsApp Business API and supports various AI platforms such as Dify and Rasa.

## Frequently asked questions

Find answers to commonly asked questions. If you need further assistance, feel free to reach out to us.

### What is CTO as a Service (CTOaaS), and how can it benefit my company?

CTOaaS provides on-demand access to experienced technology leadership without the cost of a full-time executive. It helps enterprises with strategic IT planning, digital transformation, and technical decision-making to scale efficiently.

### How do you approach ERP implementation for enterprises?

We follow a structured process that includes business analysis, system selection, customization, integration, training, and post-implementation support to ensure seamless adoption and long-term success.

### What does your tech due diligence service cover?

Our tech due diligence includes codebase reviews, security assessments, scalability analysis, infrastructure evaluation, and compliance checks to ensure that your technology investments are low-risk and high-value.

### Why should we choose your consulting services over hiring an in-house team?

We offer specialized expertise, flexibility, and cost-effective solutions without the overhead of full-time employees. Our team brings years of experience in enterprise IT, ensuring faster implementation and better ROI.

## Our location

### Sinar Mas MSIG Tower (34th floor)

Jl. Jenderal Sudirman Kav. 21, Jakarta Selatan - 12920 Indonesia
Email: [solution@hyperjump.tech](mailto:solution@hyperjump.tech)
D&B D-U-N-S: 65-975-4901
[Open in Google Maps](https://maps.app.goo.gl/Dew762WwKLruRYGC9)`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
