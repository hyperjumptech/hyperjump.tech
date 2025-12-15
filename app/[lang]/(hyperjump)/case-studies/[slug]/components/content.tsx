import Image from "next/image";
import { notFound } from "next/navigation";

import type { SupportedLanguage } from "@/locales/.generated/types";

type ContentProps = {
  lang: SupportedLanguage;
  slug: string;
};

function FisheriesCaseStudy({ lang }: { lang: SupportedLanguage }) {
  if (lang === "id") {
    return (
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Gambaran Umum</h2>
        <p>
          Sebuah startup perikanan yang berkembang menghadapi tantangan umum:
          tim teknologi yang bersemangat tapi belum berpengalaman, kepemimpinan
          yang masih hijau, dan misi penting, mendigitalkan rantai pasok
          perikanan Indonesia. Taruhannya besar, tapi potensi dampaknya sangat
          luas.
        </p>
        <p>
          Tanpa produk yang berjalan dan tim yang baru belajar berjalan,
          perusahaan ini bermitra dengan Hyperjump lewat model CTO-as-a-Service
          untuk membangun fondasi teknis, proses kerja, dan budaya yang kuat.
        </p>

        <h2>Tantangan</h2>
        <ul>
          <li>Tim teknologi belum memiliki perangkat lunak yang berjalan di produksi</li>
          <li>Kepemilikan produk tersebar, dan ritual sprint tidak dijalankan secara bermakna</li>
          <li>
            Tidak ada roadmap yang jelas, infrastruktur belum skalabel, dan
            kepemimpinan teknis senior sangat minim
          </li>
          <li>Kolaborasi lintas tim dan kontrol kualitas tidak konsisten</li>
        </ul>

        <h2>Pendekatan Kami</h2>
        <p>
          Selama 12 bulan, Hyperjump bekerja erat dengan tim produk,
          engineering, dan operasional. Inilah yang kami wujudkan:
        </p>

        <h3>Transformasi Agile</h3>
        <ul>
          <li>
            Menerapkan disiplin Scrum yang nyata: Definition of Done yang jelas,
            grooming terstruktur, dan retrospektif yang bermakna
          </li>
          <li>
            Menggunakan estimasi story point berbasis Fibonacci dan pelacakan
            velocity untuk perencanaan dan pengiriman yang lebih baik
          </li>
        </ul>

        <h3>Dari Nol ke Peluncuran</h3>
        <ul>
          <li>
            MVP aplikasi mobile &apos;Heroes&apos; berhasil diluncurkan dalam 3
            bulan
          </li>
          <li>
            Fitur baru dirilis setiap 2-4 minggu dengan CI/CD pipeline,
            pelaporan crash Firebase, dan pengujian otomatis
          </li>
        </ul>

        <h3>Meningkatkan Kematangan Engineering</h3>
        <ul>
          <li>Menerapkan unit testing, cakupan kode (70%+), dan pipeline CI via GitLab</li>
          <li>
            Menyatukan version control menjadi strategi Git trunk tunggal
            dengan proteksi cabang dan konvensi penamaan yang terstruktur
          </li>
          <li>Pengiriman produksi harian untuk Web, Android, dan backend ERP</li>
        </ul>

        <h3>Peluncuran Sistem Penuh</h3>
        <ul>
          <li>
            Mendukung berbagai Go-Live ERP di beberapa wilayah, dengan
            integrasi backend (Odoo) dan sistem mobile untuk pelacakan
            penjualan, inventaris, dan pengeluaran
          </li>
          <li>
            Menerapkan sistem inquiry dengan fitur pencarian untuk pembeli
            multibahasa, termasuk lokalisasi Mandarin
          </li>
        </ul>

        <h2>Pembelajaran Utama</h2>
        <ul>
          <li>
            Proses yang kuat lebih penting daripada individu kuat di awal. Dengan
            ritual yang tepat, bahkan tim junior pun bisa meluncurkan perangkat
            lunak dengan serius
          </li>
          <li>
            Tech debt tidak bisa dihindari, tapi harus dikendalikan. Identifikasi
            awal mencegah akumulasi kerja ulang yang membebani
          </li>
          <li>
            QA bukan departemen, tapi budaya. Komitmen bersama terhadap kualitas
            menurunkan bug dan meningkatkan kepercayaan diri saat rilis
          </li>
          <li>
            Dokumentasi adalah senjata rahasia. Wiki internal dan praktik Jira
            yang konsisten mempercepat onboarding dan scaling
          </li>
        </ul>

        <h2>Hasil</h2>
        <p>
          Tim kini stabil dan mandiri. Tantangan selanjutnya? Memperkuat
          kepemimpinan internal dan membangun roadmap produk jangka panjang
          untuk terus memberikan nilai dalam skala besar. Kami bangga telah
          membantu perusahaan perikanan ini membangun bukan hanya perangkat
          lunak, tetapi organisasi teknologi berkinerja tinggi yang siap
          mentransformasi industri.
        </p>

        <Image
          src="/images/case-studies/erp-fisheries.png"
          alt="Hasil Mengubah Tim Teknologi Perikanan Menjadi Mesin Produk yang Skalabel"
          className="h-auto w-full rounded-2xl"
          width={660}
          height={400}
        />

        <h2>What&apos;s Next</h2>
        <p>
          Tim kini stabil dan mandiri. Tantangan berikutnya? Memperkuat
          kepemimpinan internal dan menyusun roadmap produk jangka panjang
          untuk mempertahankan pencapaian yang ada.
        </p>
      </article>
    );
  }

  return (
    <article className="prose prose-neutral max-w-none dark:prose-invert">
      <h2>Overview</h2>
      <p>
        A growing fisheries startup faced a familiar challenge: a passionate but
        inexperienced tech team, green leadership, and a critical mission to
        digitize Indonesia&apos;s fisheries supply chain from coast to customer.
        The stakes were high, but the potential impact was massive.
      </p>
      <p>
        With no live product and a team just finding its feet, the company
        partnered with Hyperjump under a CTO-as-a-Service model to build strong
        technical foundations, processes, and culture.
      </p>

      <h2>The Challenge</h2>
      <ul>
        <li>The tech team had no working software in production</li>
        <li>
          Product ownership was scattered, and sprint ceremonies were more
          ritual than practice
        </li>
        <li>
          There was no clear roadmap, no scalable infrastructure, and major gaps
          in senior technical leadership
        </li>
        <li>Cross-functional collaboration and quality control were inconsistent</li>
      </ul>

      <h2>Our Approach</h2>
      <p>
        Working closely over 12 months, Hyperjump embedded with the product,
        engineering, and operations teams. Here&apos;s what we delivered:
      </p>

      <h3>Agile Overhaul</h3>
      <ul>
        <li>
          Implemented real Scrum discipline, clear Definition of Done, structured
          grooming, and meaningful retrospectives
        </li>
        <li>
          Introduced Fibonacci-based story point estimations and velocity
          tracking, enabling better planning and delivery
        </li>
      </ul>

      <h3>From Zero to Launch</h3>
      <ul>
        <li>
          Delivered an MVP of the mobile app &quot;Heroes&quot; within 3 months,
          beating the internal team in a friendly &quot;build-off&quot;
        </li>
        <li>
          Released new features every 2-4 weeks with CI/CD pipelines, Firebase
          crash reporting, and automated testing
        </li>
      </ul>

      <h3>Engineering Maturity</h3>
      <ul>
        <li>Introduced unit testing, 70%+ code coverage, and CI pipelines via GitLab</li>
        <li>
          Consolidated version control into a single-trunk Git strategy with
          branch protections and structured naming conventions
        </li>
        <li>
          Enabled daily production-ready deployments across Web, Android, and ERP
          backends
        </li>
      </ul>

      <h3>Full-System Rollouts</h3>
      <ul>
        <li>
          Supported multiple ERP go-lives across regions, with integrated backend
          (Odoo) and mobile systems for tracking sales, inventory, and expenses
        </li>
        <li>
          Deployed a search-enhanced inquiry system tailored for multilingual
          buyers across markets, including Mandarin localization
        </li>
      </ul>

      <h2>Key Learnings</h2>
      <ul>
        <li>
          Strong process beats strong people at first. With the right rituals,
          even a junior team can ship serious software
        </li>
        <li>
          Tech debt happens, but must be managed. By identifying technical debt
          early, the team avoided snowballing rework
        </li>
        <li>
          QA isn&apos;t a department, it&apos;s a culture. A shared commitment
          to quality reduced defects and increased confidence in releases
        </li>
        <li>
          Documentation is your secret weapon. A growing internal wiki and
          consistent Jira practices made onboarding and scaling smoother
        </li>
      </ul>

      <h2>Results</h2>
      <p>
        The team is now stable and self-sufficient. The next challenge?
        Strengthen internal leadership and establish a long-term product
        roadmap to keep delivering value at scale. We&apos;re proud to have
        played a part in helping this fisheries company build not just software,
        but a high-performing tech organization that&apos;s ready to transform
        the industry.
      </p>

      <Image
        src="/images/case-studies/erp-fisheries.png"
        alt="Transforming a Fisheries Tech Team into a Scalable Product Engine Results"
        className="h-auto w-full rounded-2xl"
        width={660}
        height={400}
      />

      <h2>What&apos;s Next</h2>
      <p>
        The team is now stable and self-sufficient. The next challenge?
        Strengthen internal leadership and establish a long-term product
        roadmap to keep delivering value at scale.
      </p>
    </article>
  );
}

function MediaCaseStudy({ lang }: { lang: SupportedLanguage }) {
  if (lang === "id") {
    return (
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <h2>Gambaran Umum</h2>
        <p>
          Sebuah platform media digital yang populer di kalangan Milenial dan
          Gen Z berkembang pesat, namun tim engineering-nya kesulitan mengikuti
          laju tersebut. Mereka andal dalam mengeksekusi permintaan, namun belum
          mampu menjadi inovator strategis. Untuk mengubah pola kerja dari
          reaktif ke proaktif, mereka menggandeng Hyperjump untuk pendampingan
          transformasi secara menyeluruh.
        </p>

        <h2>Tantangan</h2>
        <ul>
          <li>
            Tim engineering berfungsi seperti agensi internal, mengerjakan
            permintaan fitur dari unit bisnis tanpa struktur atau pelacakan
            yang jelas
          </li>
          <li>Tidak ada sistem manajemen tugas atau ticketing</li>
          <li>Permintaan fitur langsung ke developer tanpa perantara</li>
          <li>Tidak ada metrik yang jelas untuk mengukur performa</li>
          <li>
            Tidak ada seremonial agile atau proses pengembangan standar. Saat
            permintaan produk melonjak, bisnis membutuhkan inovasi, bukan
            sekadar eksekusi
          </li>
        </ul>

        <h2>Pendekatan Kami</h2>
        <p>
          Lewat model CTO-as-a-Service, Hyperjump memperkenalkan serangkaian
          perbaikan mendasar agar tim bisa bertumbuh secara berkelanjutan.
        </p>

        <h3>Transformasi Agile</h3>
        <ul>
          <li>
            Memperkenalkan seremonial Scrum yang benar: Sprint Planning,
            Grooming, Retrospective, dan Standup harian
          </li>
          <li>
            Menetapkan Definition of Done yang jelas dan membantu tim menulis
            user story yang baik untuk memperjelas komunikasi antar tim produk,
            desain, dan developer
          </li>
          <li>
            Melacak velocity tim untuk siklus pengiriman yang lebih terukur dan
            konsisten
          </li>
        </ul>

        <h3>Transformasi CI/CD</h3>
        <ul>
          <li>
            Membangun pipeline CI/CD otomatis untuk menghilangkan proses
            deployment manual
          </li>
          <li>
            Mewajibkan cakupan unit test untuk meningkatkan kualitas kode dan
            deteksi dini masalah
          </li>
          <li>Developer kini bisa fokus pada inovasi, bukan infrastruktur</li>
        </ul>

        <h3>Penguatan Quality Assurance</h3>
        <ul>
          <li>
            Mengorganisir ulang tim QA menjadi unit lintas fungsi yang
            terstruktur
          </li>
          <li>
            Pengujian menjadi langkah wajib sebelum rilis, dengan dokumentasi
            dan perencanaan coverage yang lebih baik
          </li>
        </ul>

        <h3>Pertumbuhan Berbasis KPI</h3>
        <ul>
          <li>
            Menetapkan metrik kualitas internal (bug saat QA, cakupan unit
            test) untuk menjaga maintainability dan mengurangi utang teknis
          </li>
          <li>
            Melacak metrik kualitas eksternal (bug produksi) untuk percepatan
            penyelesaian masalah
          </li>
        </ul>

        <h3>Penanganan Masukan Terpusat</h3>
        <ul>
          <li>
            Membangun sistem service desk untuk mengumpulkan laporan bug dan
            masukan dari unit bisnis
          </li>
          <li>
            Setiap isu dilacak, ditindaklanjuti, dan didokumentasikan
            pencegahannya secara jelas
          </li>
        </ul>

        <h2>Pembelajaran Utama</h2>
        <ul>
          <li>
            Dari pelaksana ke inovator: transformasi tim engineering dari
            reaktif ke proaktif memerlukan perubahan struktur, budaya, dan
            proses, bukan hanya penambahan sumber daya
          </li>
          <li>
            Fondasi agile meningkatkan prediktabilitas: Scrum dan Definition of
            Done menciptakan kejelasan, akuntabilitas, dan ritme kerja yang
            konsisten
          </li>
          <li>
            CI/CD membebaskan developer untuk berinovasi: otomatisasi deployment
            dan testing memungkinkan tim fokus pada nilai, bukan pemeliharaan
          </li>
          <li>
            Kualitas harus terstruktur: QA sebagai bagian dari proses dev
            meningkatkan coverage, mengurangi bug, dan mempercepat feedback
          </li>
          <li>
            Tim berbasis data berkembang lebih cepat: metrik internal dan
            eksternal memberi visibilitas atas performa dan arah pengembangan
          </li>
          <li>
            Loop feedback yang terstruktur membangun kepercayaan: penanganan
            masukan yang sistematis menciptakan sinergi yang lebih baik dengan
            unit bisnis
          </li>
          <li>
            Transformasi budaya butuh pendampingan langsung: coaching,
            kolaborasi real-time, dan dukungan berkelanjutan adalah kunci
            perubahan mindset menuju keunggulan engineering
          </li>
        </ul>

        <h2>Hasil</h2>
        <p>Setelah 6 bulan kolaborasi dan pendampingan intensif:</p>

        <Image
          src="/images/case-studies/ctoaas-media.png"
          alt="Hasil Meningkatkan Tim Engineering Media-Tech dari Feature Factory ke Pusat Inovasi"
          className="h-auto w-full rounded-2xl"
          width={660}
          height={400}
        />

        <p>
          Mereka telah membangun fondasi keunggulan engineering. Sekarang,
          mereka siap membangun masa depan.
        </p>
      </article>
    );
  }

  return (
    <article className="prose prose-neutral max-w-none dark:prose-invert">
      <h2>Overview</h2>
      <p>
        A prominent digital media platform catering to Millennials and Gen Z was
        growing rapidly, but its engineering team wasn&apos;t keeping pace. The
        team was excellent at shipping features on request, but struggled to
        evolve into strategic innovators capable of leading product and
        technology transformation. To shift gears from reactive to proactive
        development, they brought in Hyperjump to support the transformation
        with a structured, hands-on approach.
      </p>

      <h2>The Challenge</h2>
      <ul>
        <li>
          Engineering team functioning like an internal agency, handling feature
          requests from business units with minimal structure or tracking
        </li>
        <li>No task management or ticketing systems</li>
        <li>Feature requests often went directly to individual developers</li>
        <li>Lack of metrics to measure performance or progress</li>
        <li>
          No agile ceremonies or standardized development processes, even as
          product demand surged
        </li>
      </ul>

      <h2>Our Approach</h2>
      <p>
        With a dedicated CTO-as-a-Service engagement, Hyperjump introduced a
        series of foundational improvements designed to help the team scale
        sustainably.
      </p>

      <h3>Agile Overhaul</h3>
      <ul>
        <li>
          Introduced proper Scrum ceremonies, including Sprint Planning,
          Grooming, Retrospectives, and Daily Standups
        </li>
        <li>
          Defined a clear Definition of Done (DoD) and taught teams to write
          better user stories, bridging communication gaps between product,
          design, and development
        </li>
        <li>Tracked team velocity to create predictable, measurable delivery cycles</li>
      </ul>

      <h3>CI/CD Transformation</h3>
      <ul>
        <li>
          Established automated CI/CD pipelines, removing manual deployment work
          from engineers
        </li>
        <li>
          Enforced unit test coverage, improving internal code quality and
          catching issues early
        </li>
        <li>Developers could now focus on innovation, not infrastructure</li>
      </ul>

      <h3>Quality Assurance Reinforcement</h3>
      <ul>
        <li>
          Reorganized the QA team into a structured, cross-functional unit where
          testing became a mandatory release step
        </li>
        <li>
          Improved knowledge sharing and coverage planning across teams to
          reduce escaped bugs
        </li>
      </ul>

      <h3>KPI-Driven Growth</h3>
      <ul>
        <li>
          Developed internal quality metrics (defects caught during QA, unit
          test coverage) to improve maintainability and reduce tech debt
        </li>
        <li>
          Tracked external quality metrics (production defects) to ensure faster
          issue resolution and service reliability
        </li>
      </ul>

      <h3>Centralized Feedback Handling</h3>
      <ul>
        <li>
          Set up a proper service desk system to collect bug reports and
          feedback from business units
        </li>
        <li>
          Ensured each issue was tracked, triaged, and resolved with clear
          preventive documentation
        </li>
      </ul>

      <h2>Key Learnings</h2>
      <ul>
        <li>
          From order-takers to innovators: shifting an engineering team from
          reactive development to proactive innovation requires structural,
          cultural, and process-level changes, not just more resources
        </li>
        <li>
          Agile foundations enable predictability: introducing Scrum ceremonies
          and a Definition of Done created clarity, accountability, and a shared
          rhythm
        </li>
        <li>
          CI/CD frees developers to focus on value: automating deployments and
          enforcing test coverage allowed engineers to spend more time
          innovating
        </li>
        <li>
          Quality must be systematized: embedding QA into the development cycle
          and using cross-functional QA teams improved test coverage, reduced
          defects, and accelerated feedback loops
        </li>
        <li>
          Data-driven teams grow faster: KPIs and metrics gave teams visibility
          into performance gaps and guided continuous improvement
        </li>
        <li>
          Structured feedback loops build trust: centralizing issue intake and
          resolution fostered stronger alignment with business units
        </li>
        <li>
          Cultural transformation is hands-on: coaching, real-time
          collaboration, and continuous support were crucial to building a
          mindset of engineering excellence and ownership
        </li>
      </ul>

      <h2>Results</h2>
      <p>After 6 months of close collaboration and coaching:</p>

      <Image
        src="/images/case-studies/ctoaas-media.png"
        alt="Elevating a Media-Tech Engineering Team from Feature Factory to Innovation Powerhouse Results"
        className="h-auto w-full rounded-2xl"
        width={660}
        height={400}
      />

      <p>
        They&apos;ve laid the foundation for engineering excellence. Now,
        they&apos;re ready to build the future.
      </p>
    </article>
  );
}

const caseStudies = [
  {
    slug: "erp-fisheries",
    content: FisheriesCaseStudy
  },
  {
    slug: "ctoaas-media",
    content: MediaCaseStudy
  }
];

export function Content({ lang, slug }: ContentProps) {
  const caseStudy = caseStudies.find((caseStudy) => caseStudy.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const Component = caseStudy.content;

  return <Component lang={lang} />;
}
