This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```shell
# 0) 설정
$root    = "."
$outFile = "cur.txt"

# 포함할 확장자들
$includeExt = @(
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.mjs',
    '.cjs',
    '.json',
    '.jsonc',
    '.css',
    '.scss',
    '.md',
    '.mdx'
)

# 제외할 디렉터리 (정규식)
$excludeDirRegex = '(\\|/)(\.git|\.next|node_modules|dist|out|coverage|\.turbo)(\\|/)'

# 1) 결과 파일 초기화 및 자기자신 전체 경로
Remove-Item -LiteralPath $outFile -Force -ErrorAction SilentlyContinue
$outFull = (Join-Path (Get-Location) $outFile)

# 2) 수집 + 기록
Get-ChildItem -Path $root -Recurse -File -Force -Attributes !ReparsePoint -ErrorAction SilentlyContinue |
Where-Object {
    # 디렉터리 경로 필터 (정규식 매치되면 제외)
    $_.FullName -notmatch $excludeDirRegex -and
    # 확장자 포함 필터
    $includeExt -contains ($_.Extension.ToLowerInvariant()) -and
    # 결과 파일(cur.txt) 자기자신 제외
    $_.FullName -ne $outFull
} |
ForEach-Object {
    $p = $_.FullName
    # 파일 경로 주석으로 기록
    Add-Content -LiteralPath $outFull -Value "// $p" -Encoding utf8

    try {
        Get-Content -LiteralPath $p -Raw -Encoding UTF8 |
            Add-Content -LiteralPath $outFull -Encoding utf8
    }
    catch {
        Add-Content -LiteralPath $outFull -Value "<< failed to read >>" -Encoding utf8
    }

    Add-Content -LiteralPath $outFull -Value "`n" -Encoding utf8
}
```