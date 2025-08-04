import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const content = `
# LLMs.txt for https://hyperjump.tech
Site: https://hyperjump.tech
Owner: PT Artha Rajamas Mandiri
Contact: solution@hyperjump.tech

- [Reliable Software Partner](https://hyperjump.tech/en): Expert software solutions for scalable, high-quality digital systems.
- [Tech Job Opportunities](https://hyperjump.tech/en/jobs): Explore various tech job opportunities at Hyperjump.
- [Open-Source DevOps Solutions](https://hyperjump.tech/en/smdd2024): Hyperjump offers open-source solutions for modern DevOps practices.
- [Engineering Transformation Case Studies](https://hyperjump.tech/en/case-studies): Explore engineering transformations through real case studies and success stories.
- [AI Chatbot Solutions](https://hyperjump.tech/en/inferenceai/rag-chatbot): Create an AI chatbot for accurate, real-time answers.
- [Reliable Software Solutions](https://hyperjump.tech/en): Expert technology solutions for scalable, high-quality digital systems.
- [Media-Tech Innovation Transformation](https://hyperjump.tech/en/case-studies/ctoaas-media): Transforming a media-tech team into innovative leaders through agile practices.
- [Custom AI Solutions](https://hyperjump.tech/en/inferenceai): Custom AI agents designed to enhance business efficiency and growth.
- [Tech Solutions Provider](https://hyperjump.tech/en/services): Hyperjump offers tech solutions for startups and enterprises.
- [Hyperjump Overview](https://hyperjump.tech/sitemap.xml): Explore Hyperjump's services, jobs, and case studies.
- [Fisheries Tech Transformation](https://hyperjump.tech/en/case-studies/erp-fisheries): Transforming a fisheries tech team into a scalable product engine.
- [Site Reliability Operator](https://hyperjump.tech/en/jobs/sro): Remote Site Reliability Operator role focusing on service maintenance.
- [UI Designer Position](https://hyperjump.tech/en/jobs/ui-designer): Remote UI Designer role focusing on wireframes and user research.
- [Senior Software Engineer](https://hyperjump.tech/en/jobs/se-backend): Remote Senior Software Engineer role for cloud data processing.
- [Software Engineer Position](https://hyperjump.tech/en/jobs/se-frontend): Remote or on-site front-end developer role with React/Vue.js.
- [Software Engineer Position](https://hyperjump.tech/en/jobs/se-mobile): Remote Software Engineer role for Android/iOS development.
- [Tech Due Diligence](https://hyperjump.tech/en/services/tech-due-diligence): Evaluate technology risks and opportunities for informed decisions.
- [SaaS Product Development](https://hyperjump.tech/en/services/software-as-a-service): Dedicated SaaS solutions for scalable product development and innovation.
- [ERP Implementation Services](https://hyperjump.tech/en/services/erp-implementation): Expert ERP implementation services for streamlined business operations.
- [CTO-as-a-Service](https://hyperjump.tech/en/services/cto-as-a-service): Access senior engineering leadership without hiring a full-time CTO.
- [Reliable Software Solutions](https://hyperjump.tech/id): Helping organizations build scalable, high-quality digital systems.
- [Hyperjump 404 Page](https://hyperjump.tech/404): Explore Hyperjump's services and chat with HyperBot for help.
- [Tech Job Opportunities](https://hyperjump.tech/id/jobs): Explore various tech job opportunities at Hyperjump.
- [Engineering Team Transformations](https://hyperjump.tech/id/case-studies): Transforming engineering teams for scalable product success.
- [Hyperjump Open-Source Solutions](https://hyperjump.tech/id/smdd2024): Hyperjump offers open-source solutions for modern DevOps practices.
- [Tech Solutions for Growth](https://hyperjump.tech/id/services): Hyperjump offers comprehensive tech solutions for startups and businesses.
- [AI Chatbot Solutions](https://hyperjump.tech/id/inferenceai/rag-chatbot): Instant, accurate answers using your own data with AI.
- [Custom AI Solutions](https://hyperjump.tech/id/inferenceai): Custom AI agents designed to enhance business efficiency and reduce costs.
- [Media-Tech Engineering Transformation](https://hyperjump.tech/id/case-studies/ctoaas-media): Transforming media-tech engineering teams into innovation hubs.
- [Fisheries Tech Transformation](https://hyperjump.tech/id/case-studies/erp-fisheries): Transforming fisheries tech team into a scalable product machine.
- [Site Reliability Operator](https://hyperjump.tech/id/jobs/sro): Remote Site Reliability Operator role focusing on service maintenance.
- [UI Designer Position](https://hyperjump.tech/id/jobs/ui-designer): Remote UI Designer role focusing on wireframes and user research.
- [Senior Software Engineer Job](https://hyperjump.tech/id/jobs/se-backend): Remote or on-site Senior Software Engineer position in Jakarta.
- [Software Engineer Position](https://hyperjump.tech/id/jobs/se-frontend): Remote or on-site front-end software engineer position available.
- [Software Engineer Position](https://hyperjump.tech/id/jobs/se-mobile): Remote Software Engineer role for Android/iOS development.
- [Tech Due Diligence Services](https://hyperjump.tech/id/services/tech-due-diligence): Comprehensive tech due diligence for informed decision-making.
- [Software as a Service](https://hyperjump.tech/id/services/software-as-a-service): Dedicated SaaS solutions for product development and modernization.
- [ERP Implementation Services](https://hyperjump.tech/id/services/erp-implementation): Streamline operations and enhance visibility with ERP implementation.
- [CTO-as-a-Service](https://hyperjump.tech/id/services/cto-as-a-service): Access senior technical leadership without hiring a full-time CTO.
  `.trim();

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
