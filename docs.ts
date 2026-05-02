export interface DocSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  code: string;
  language: string;
  points: string[];
}

export const DOCS: DocSection[] = [
  {
    id: "architecture",
    title: "System Architecture",
    subtitle: "High-level overview of our microservices infrastructure.",
    content: "Our architecture is built on a distributed network of edge nodes, ensuring sub-100ms latency globally. We leverage WASM-based serverless functions for critical path logic, coupled with a multi-region PostgreSQL cluster for data persistence.",
    points: [
      "Edge Computing with WebAssembly",
      "Global Data Replication",
      "Real-time Mesh Networking",
      "Zero-Trust Security Perimeter"
    ],
    code: "// Edge Function Definition\nexport async function onRequest(context) {\n  const cache = await stores.open('v1');\n  const response = await fetch(request);\n  return new Response(response.body, {\n    headers: { 'X-Edge-Node': 'US-WEST-2' }\n  });\n}",
    language: "typescript"
  },
  {
    id: "deployment",
    title: "CI/CD Pipelines",
    subtitle: "Automating excellence from commit to cluster.",
    content: "Deployment shouldn't be a guess. Our pipelines include automated visual regression testing, shadow deployments for traffic analysis, and atomic rollbacks that trigger in milliseconds if health checks fail.",
    points: [
      "Blue-Green Deployment Strategies",
      "Automated Visual Diffing",
      "Log-based Anomaly Detection",
      "Instant Rollback Hooks"
    ],
    code: "name: Production Deploy\non:\n  push:\n    branches: [main]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - run: npm run build && b-deploy --prod",
    language: "yaml"
  },
  {
    id: "scalability",
    title: "Elastic Scalability",
    subtitle: "Handling traffic spikes without breaking a sweat.",
    content: "Scaling isn't just about adding more servers. It's about intelligently routing traffic through a dynamic load balancer that understands application state and user locality.",
    points: [
      "Predictive Auto-scaling",
      "Geographic Traffic Shaping",
      "Connection Pooling Efficiency",
      "Stateful Session Resumption"
    ],
    code: "{\n  \"scaling\": {\n    \"min_capacity\": 2,\n    \"max_capacity\": 200,\n    \"target_cpu_utilization\": 65,\n    \"cooldown_period\": \"300s\"\n  }\n}",
    language: "json"
  }
];
