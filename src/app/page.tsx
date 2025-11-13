// app/page.tsx
export default function HomePage() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-50">환영합니다 👋</h2>
      <p className="text-sm text-slate-300">
        이곳은 SQlD, 정보처리기사, CS 등 시험·개발 공부를 위해 만든{" "}
        <span className="font-medium text-emerald-300">오답노트 / 블로그</span>
        입니다.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
        <li>우선은 SQLD 오답노트부터 정리합니다.</li>
        <li>
          각 노트는 &quot;틀린 이유 → 개념 정리 → 예제&quot; 구조로 정리합니다.
        </li>
      </ul>
      <p className="text-sm text-slate-400">
        상단 메뉴의 <span className="text-emerald-300">SQLD 오답노트</span>에서
        시작하세요.
      </p>
    </section>
  );
}
