/**
 * Career content from Nam's CV (latest version), in both site languages.
 * Source of truth for the hero copy, Experience and Skills & Credentials.
 */

export type Lang = "en" | "vi";
export type Localized = Record<Lang, string>;

export const headline: Localized = {
  en: "Software Engineer building scalable backends and AI‑driven products.",
  vi: "Kỹ sư phần mềm xây dựng backend mở rộng tốt và sản phẩm ứng dụng AI.",
};

export const summary: Localized = {
  en: "I design high-throughput REST APIs, optimize databases and put LLMs into production: real-time meeting AI, RAG document pipelines and multilingual speech tools for enterprise and SaaS clients in Japan and Vietnam.",
  vi: "Mình thiết kế REST API thông lượng cao, tối ưu database và đưa LLM vào production: AI phân tích cuộc họp thời gian thực, pipeline tài liệu RAG và công cụ nhận dạng giọng nói đa ngôn ngữ cho khách hàng doanh nghiệp và SaaS tại Nhật Bản và Việt Nam.",
};

/** The page's one statement (word-highlight moment): the CV's results in a single line. */
export const statement: Record<Lang, { text: string; strong?: boolean }[]> = {
  en: [
    { text: "Real-time meeting AI for a Japanese enterprise, speech recognition lifted from" },
    { text: "60% to 90%", strong: true },
    { text: "on domain terms, document summaries 70% faster, and marketplace backends that hold at peak traffic." },
  ],
  vi: [
    { text: "AI phân tích cuộc họp thời gian thực cho doanh nghiệp Nhật, nhận dạng giọng nói tăng từ" },
    { text: "60% lên 90%", strong: true },
    { text: "với thuật ngữ chuyên ngành, tóm tắt tài liệu nhanh hơn 70%, và backend marketplace vững vàng giờ cao điểm." },
  ],
};

/** Hero data-strip facts. Every figure is stated in the CV. */
export const facts: { label: Localized; value: string }[] = [
  { label: { en: "Domain-term accuracy", vi: "Độ chính xác thuật ngữ" }, value: "60→90%" },
  { label: { en: "Summary time", vi: "Thời gian tóm tắt" }, value: "−70%" },
  { label: { en: "Valedictorian", vi: "Thủ khoa" }, value: "GPA 3.81" },
];

export type Metric = { value: string; label: Localized };

export type Project = {
  name: string;
  kind: Localized;
  metric?: Metric;
  highlights: Localized[];
  tech: string[];
};

export type Job = {
  company: string;
  role: Localized;
  period: string;
  location: string;
  stamp: Mark;
  /** Exit stamp for a finished role. */
  exit?: Mark;
  projects: Project[];
};

type Mark = { lines: [string, string, string]; shape: "oval" | "rect" | "circle"; ink: "navy" | "red" | "green" | "plum"; rotate: number };

export const experience: Job[] = [
  {
    company: "Kozocom Vietnam",
    role: { en: "Software Engineer", vi: "Kỹ sư phần mềm" },
    period: "03/2025 – Present",
    location: "Đà Nẵng, Việt Nam",
    stamp: { lines: ["KOZOCOM", "MAR 2025", "ENTRY · DA NANG"], shape: "oval", ink: "navy", rotate: -8 },
    projects: [
      {
        name: "Work Buddy AI",
        kind: {
          en: "AI workplace & meeting analytics SaaS for a Japanese enterprise client",
          vi: "SaaS phân tích cuộc họp và không gian làm việc bằng AI cho khách hàng doanh nghiệp Nhật",
        },
        highlights: [
          {
            en: "Built the real-time AI Meeting Worker that detects silence, speaker imbalance and time overruns, streaming AI summaries and agenda updates to the dashboard live over SSE.",
            vi: "Xây dựng AI Meeting Worker thời gian thực phát hiện im lặng, mất cân bằng người nói và quá giờ, stream tóm tắt AI và cập nhật agenda lên dashboard trực tiếp qua SSE.",
          },
          {
            en: "Restored production reliability of the WebSocket AI worker by fixing a session resource leak on disconnect and a context overflow in long meetings.",
            vi: "Khôi phục độ ổn định production của AI worker WebSocket: xử lý rò rỉ tài nguyên session khi ngắt kết nối và lỗi tràn context trong các cuộc họp dài.",
          },
          {
            en: "Delivered the hardware recorder integration and the invitation + RBAC module behind tenant onboarding.",
            vi: "Tích hợp thiết bị ghi âm phần cứng vào tài khoản người dùng, cùng module lời mời và phân quyền RBAC cho onboarding tenant.",
          },
        ],
        tech: ["TypeScript", "NestJS", "React", "TypeORM", "Oracle DB", "Redis", "BullMQ", "WebSocket", "SSE", "Azure OpenAI"],
      },
      {
        name: "KzComtor Platform",
        kind: {
          en: "Internal real-time AI collaboration platform for multilingual communication",
          vi: "Nền tảng cộng tác AI thời gian thực nội bộ cho giao tiếp đa ngôn ngữ",
        },
        metric: {
          value: "60% → 90%",
          label: { en: "recognition accuracy on domain terminology", vi: "độ chính xác nhận dạng thuật ngữ chuyên ngành" },
        },
        highlights: [
          {
            en: "Integrated Soniox speech-to-text and engineered context optimization pipelines that lifted domain-term recognition accuracy from 60% to 90%.",
            vi: "Tích hợp Soniox speech-to-text và xây dựng pipeline tối ưu context, nâng độ chính xác nhận dạng thuật ngữ chuyên ngành từ 60% lên 90%.",
          },
          {
            en: "Contributed to the system architecture that bridges real-time streaming with the frontend and backend services.",
            vi: "Tham gia thiết kế kiến trúc hệ thống, kết nối luồng streaming thời gian thực với các service frontend và backend.",
          },
          {
            en: "Built JWT + RBAC authentication and secure API middleware for enterprise data security.",
            vi: "Xây dựng xác thực JWT + RBAC và middleware API bảo mật cho dữ liệu doanh nghiệp.",
          },
        ],
        tech: ["React", "NestJS", "Soniox", "LLMs", "LangGraph", "Real-time streaming", "JWT", "PostgreSQL"],
      },
      {
        name: "Docmind AI",
        kind: {
          en: "Internal RAG platform for semantic search and chat over Markdown and Google Docs",
          vi: "Nền tảng RAG nội bộ cho tìm kiếm ngữ nghĩa và hỏi đáp trên Markdown và Google Docs",
        },
        metric: {
          value: "−70%",
          label: { en: "processing time for large-document summarization", vi: "thời gian xử lý khi tóm tắt tài liệu lớn" },
        },
        highlights: [
          {
            en: "Optimized the summarization engine for large documents, cutting processing time by 70% while keeping core context and key insights.",
            vi: "Tối ưu engine tóm tắt cho tài liệu lớn, giảm 70% thời gian xử lý mà vẫn giữ trọn context và ý chính.",
          },
          {
            en: "Added Redis caching and background job queues for async embedding generation, lowering server load under concurrent traffic.",
            vi: "Dùng Redis cache và hàng đợi background job để tạo embedding bất đồng bộ, giảm tải server khi truy cập đồng thời.",
          },
        ],
        tech: ["NestJS", "FastAPI", "React", "Prisma", "MySQL", "ChromaDB", "Redis", "LangGraph"],
      },
    ],
  },
  {
    company: "KDHM Solutions",
    role: { en: "Backend Developer", vi: "Lập trình viên Backend" },
    period: "01/2024 – 11/2024",
    location: "Đà Nẵng, Việt Nam",
    stamp: { lines: ["KDHM", "JAN 2024", "ENTRY · DA NANG"], shape: "rect", ink: "red", rotate: 6 },
    exit: { lines: ["KDHM", "NOV 2024", "EXIT · DA NANG"], shape: "oval", ink: "plum", rotate: -9 },
    projects: [
      {
        name: "SellGame Platform",
        kind: {
          en: "Digital asset marketplace for gaming accounts and virtual items",
          vi: "Sàn giao dịch tài sản số cho tài khoản game và vật phẩm ảo",
        },
        highlights: [
          {
            en: "Architected a secure NestJS marketplace backend that handles concurrent user operations.",
            vi: "Thiết kế backend marketplace bảo mật bằng NestJS, xử lý tốt thao tác đồng thời của người dùng.",
          },
          {
            en: "Engineered a multi-tier listing validation engine and a secure checkout flow to prevent fraud and keep data consistent at peak traffic.",
            vi: "Xây dựng engine kiểm duyệt tin đăng nhiều tầng và luồng thanh toán an toàn, chống gian lận và giữ toàn vẹn dữ liệu giờ cao điểm.",
          },
          {
            en: "Optimized schemas with multi-attribute indexing, speeding up catalog search and filtering under heavy load.",
            vi: "Tối ưu schema với index đa thuộc tính, tăng tốc tìm kiếm và lọc danh mục khi tải cao.",
          },
        ],
        tech: ["NestJS", "PostgreSQL", "Cloudflare R2", "JWT", "Docker"],
      },
    ],
  },
];

export const skills: { label: Localized; items: string[] }[] = [
  { label: { en: "AI / LLM & real-time", vi: "AI / LLM & real-time" }, items: ["Azure OpenAI", "LangGraph", "RAG pipelines", "WebSocket", "SSE", "BullMQ"] },
  { label: { en: "Backend", vi: "Backend" }, items: ["NestJS", "Node.js", "FastAPI"] },
  {
    label: { en: "Databases & ORMs", vi: "Database & ORM" },
    items: ["PostgreSQL", "MySQL", "Oracle DB", "MongoDB", "Redis", "TypeORM", "Prisma"],
  },
  { label: { en: "Languages", vi: "Ngôn ngữ" }, items: ["TypeScript", "JavaScript", "Python"] },
  { label: { en: "Frontend", vi: "Frontend" }, items: ["React", "Next.js", "Zustand"] },
  {
    label: { en: "Tools & practices", vi: "Công cụ & thực hành" },
    items: ["Claude Code", "Git", "Docker", "Cloudflare R2", "JWT & RBAC", "Clean Architecture"],
  },
];

export const education = {
  school: "Dong A University",
  degree: { en: "Bachelor of Information Technology", vi: "Cử nhân Công nghệ Thông tin" } as Localized,
  period: "08/2021 – 07/2025",
  gpa: "3.81 / 4.0",
  honors: [
    {
      en: "Valedictorian of the IT department, at both entrance and graduation",
      vi: "Thủ khoa khoa Công nghệ Thông tin cả đầu vào lẫn tốt nghiệp",
    },
    { en: "TOEIC 860 / 990", vi: "TOEIC 860 / 990" },
  ] as Localized[],
};
