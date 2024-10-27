import dynamic from "next/dynamic";

const App = dynamic(() => import("@/components/AppShell"), {
  ssr: false,
});

export async function generateStaticParams() {
  return [{ all: ["upload"] }];
}

export default function Page() {
  return <App />;
}
