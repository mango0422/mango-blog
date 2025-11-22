export function JavaDoc({
  name,
  className,
}: {
  name?: string;
  className: string;
}) {
  // Java 17 문서 기준 URL 생성
  const baseUrl = "https://docs.oracle.com/en/java/javase/17/docs/api/";
  const path = className.replace(/\./g, "/") + ".html";

  return (
    <a
      href={`${baseUrl}${path}`}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline decoration-wavy underline-offset-4"
    >
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
        {name || className.split(".").pop()}
      </code>
    </a>
  );
}
