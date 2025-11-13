# Part 4 요약노트 — WHERE~ORDER BY 및 고급 SQL (SQLD 2과목 후반부)

생성일: 2025년 11월 13일 오전 11:42

### 🔍 2-4 WHERE 절 (조건문)

**개념:**

- 데이터 필터링 조건을 지정하는 구문.
- SELECT 문 실행 시 **FROM → WHERE** 단계에서 행(Row) 단위로 조건 평가 수행.

**기본 비교 연산자**

| 연산자 | 의미 | 예시 |
| --- | --- | --- |
| = | 같다 | SAL = 3000 |
| <> 또는 != | 다르다 | JOB <> 'CLERK' |
| > / < / >= / <= | 대소 비교 | COMM > 1000 |
| BETWEEN A AND B | A 이상 B 이하 | SAL BETWEEN 2000 AND 4000 |
| IN (값1, 값2, …) | 지정된 목록과 일치 | DEPTNO IN (10, 20) |
| LIKE | 패턴 비교 | ENAME LIKE 'S%' |
| IS NULL / IS NOT NULL | NULL 여부 확인 | COMM IS NULL |

**논리 연산자**

| 연산자 | 설명 | 예시 |
| --- | --- | --- |
| AND | 두 조건 모두 참 | JOB = 'SALESMAN' AND SAL >= 2000 |
| OR | 하나라도 참 | DEPTNO = 10 OR DEPTNO = 20 |
| NOT | 조건 부정 | NOT (SAL > 3000) |

**패턴 매칭 (LIKE)**

| 기호 | 의미 | 예시 |
| --- | --- | --- |
| % | 임의 길이의 문자열 | 'S%' → S로 시작 |
| _ | 한 글자 | '_A%' → 두 번째 글자가 A |

**주의점**

- NULL은 비교연산자로 비교 불가 → 반드시 IS NULL 사용.
- 문자열 비교 시 대소문자 구분(DBMS 설정에 따라 다름).

---

### 🧮 2-5 GROUP BY / HAVING 절

**GROUP BY**

- 공통 속성값을 기준으로 데이터를 그룹화.
- **GROUP 함수(SUM, AVG 등)** 와 함께 사용.

```sql
SELECT DEPTNO, AVG(SAL)
FROM EMP
GROUP BY DEPTNO;

```

**HAVING**

- 그룹 단위 조건 지정.
- WHERE는 개별 행 필터링, HAVING은 그룹 필터링.

```sql
SELECT DEPTNO, AVG(SAL)
FROM EMP
GROUP BY DEPTNO
HAVING AVG(SAL) >= 3000;

```

**실행 순서 정리**

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY

```

**주의사항**

- SELECT 절에 GROUP BY에 없는 컬럼을 단독으로 기술하면 오류 발생.
- HAVING 절에서는 그룹 함수 사용 가능, WHERE에서는 불가.

---

### 📊 2-6 ORDER BY 절 (정렬)

**개념:**

- 조회된 결과를 지정된 기준으로 정렬.
- SELECT 문 마지막에 위치, SELECT 절의 컬럼명 또는 별칭 사용 가능.

**기본 형식**

```sql
SELECT *
FROM EMP
ORDER BY SAL DESC, ENAME ASC;

```

**정렬 옵션**

| 옵션 | 설명 |
| --- | --- |
| ASC | 오름차순 (기본값) |
| DESC | 내림차순 |
| NULLS FIRST / NULLS LAST | NULL 데이터의 정렬 위치 지정 (Oracle) |

**특징**

- ORDER BY 절에서 **SELECT 별칭** 사용 가능.
- **정렬 우선순위**는 지정 순서대로 적용.

---

### ⚙️ 2-7 고급 SQL 구문

### ✅ Top-N 쿼리

- 상위 N개의 행만 조회.

**Oracle**

```sql
SELECT * FROM EMP
WHERE ROWNUM <= 5
ORDER BY SAL DESC;

```

**SQL Server / MySQL**

```sql
SELECT TOP 5 * FROM EMP ORDER BY SAL DESC; -- SQL Server
SELECT * FROM EMP ORDER BY SAL DESC LIMIT 5; -- MySQL

```

---

### 📌 PIVOT / UNPIVOT (Oracle)

- 행 데이터를 열로 전환 (PIVOT)
- 열 데이터를 행으로 전환 (UNPIVOT)

**PIVOT 예시**

```sql
SELECT * FROM (
    SELECT DEPTNO, JOB, SAL FROM EMP
) PIVOT (
    SUM(SAL) FOR JOB IN ('MANAGER', 'CLERK', 'ANALYST')
);

```

---

### 🔤 문자열 결합 및 서브쿼리

**문자열 결합**: `||` (Oracle), `+` (SQL Server)

```sql
SELECT ENAME || '의 급여는 ' || SAL || '입니다.' AS MSG FROM EMP;

```

**서브쿼리(Subquery)**

- SELECT, WHERE, HAVING 등에서 사용 가능.

**예시**

```sql
SELECT ENAME, SAL
FROM EMP
WHERE SAL > (SELECT AVG(SAL) FROM EMP);

```

**서브쿼리 유형**

| 구분 | 설명 | 예시 |
| --- | --- | --- |
| 단일 행 | 결과가 1건 | =, <, > |
| 다중 행 | 결과가 여러 건 | IN, ANY, ALL |
| 상관 서브쿼리 | 외부쿼리 컬럼 참조 | WHERE EXISTS (...) |

---

### 🧩 정규표현식 (REGEXP)

**REGEXP_LIKE(문자열, 패턴)** — Oracle 전용 패턴 검색

```sql
SELECT * FROM EMP WHERE REGEXP_LIKE(ENAME, '^[A-C]');

```

**기타 REGEXP 함수**

| 함수 | 설명 |
| --- | --- |
| REGEXP_REPLACE | 정규식 기반 문자열 치환 |
| REGEXP_SUBSTR | 정규식 패턴 일부 추출 |

---

### ⚡ 실무 SQL 작성 팁

- WHERE → GROUP BY → HAVING → ORDER BY 순서로 작성 습관화.
- NULL 값은 연산 전 NVL 등으로 처리.
- PIVOT/UNPIVOT은 통계/리포트용 쿼리에 유용.
- 서브쿼리보다 조인을 우선 고려하되, 조인으로 표현 불가한 경우에만 사용.

---

✅ **핵심 암기 문장**

- WHERE은 행 필터링, HAVING은 그룹 필터링.
- ORDER BY는 SELECT의 마지막 단계에서 실행된다.
- ROWNUM/LIMIT/TOP은 **Top-N** 쿼리 방식에 따라 다르다.
- **PIVOT은 행을 열로, UNPIVOT은 열을 행으로 변환한다.**
- **REGEXP_LIKE**는 WHERE절에서 문자열 패턴 검색에 사용된다.