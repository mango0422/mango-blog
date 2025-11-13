# Part 3 요약노트 — SQL 기본 및 함수 (SQLD 2과목 전반부)

생성일: 2025년 11월 12일 오후 10:29

### 🧩 2-1 관계형 데이터베이스 개요

**Database / DBMS**

- **Database**: 데이터의 집합 (형식 없이 엑셀 파일도 포함 가능)
- **DBMS (Database Management System)**: 데이터를 효율적으로 관리하기 위한 시스템 (Oracle, MySQL 등)

**구성 요소**

- **계정(Account)**: 접근 제어 단위
- **테이블(Table)**: 데이터를 저장하는 2차원 구조 (행/열)
- **스키마(Schema)**: 테이블 구조 정의 (데이터 타입, 제약조건 등)

**테이블 특징**

- 1개의 테이블은 1명의 사용자(계정)가 소유
- 테이블 간 관계: 1:1, 1:N, N:M
- 데이터는 행(Row) 단위로 입력/삭제, 컬럼(Column) 단위로 수정 가능

**데이터 무결성 (Data Integrity)**

데이터의 정확성과 일관성 유지. 현실의 비즈니스 규칙과 일치해야 함.

| 종류 | 설명 |
| --- | --- |
| 개체 무결성 | 기본키는 NULL/중복 불가 |
| 참조 무결성 | 외래키 값은 NULL 또는 참조 테이블의 PK값 중 하나여야 함 |
| 도메인 무결성 | 속성값이 정의된 도메인 내에 있어야 함 |
| NULL 무결성 | 특정 컬럼은 NULL을 허용하지 않음 |
| 고유 무결성 | 중복되지 않는 유일값 보장 |
| 키 무결성 | 릴레이션(테이블)에는 최소 하나의 키 존재 |

**ERD (Entity Relationship Diagram)**

- 테이블 간의 관계를 시각적으로 표현한 다이어그램.
- 구성요소: 엔터티(Entity), 관계(Relationship), 속성(Attribute)

---

### 🔍 2-2 SELECT 문 기본 구조

**SQL의 종류**

- DDL (Data Definition Language): CREATE, ALTER, DROP
- DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE
- DCL (Data Control Language): GRANT, REVOKE
- TCL (Transaction Control Language): COMMIT, ROLLBACK

**SELECT 문 기본 구조**

```sql
SELECT 컬럼명 [, ...]
FROM 테이블명
WHERE 조건
GROUP BY 그룹컬럼
HAVING 그룹조건
ORDER BY 정렬조건;

```

**실행 순서 (내부 파싱 순서)**

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY

```

**SELECT 절**

- 컬럼명, 표현식(Expression), 연산 결과 지정 가능
- 모든 컬럼: `SELECT *`
- 별칭(Alias): 컬럼명 AS 별칭 (AS 생략 가능)
    - 공백/특수문자 포함 시 쌍따옴표 필수
    - ORDER BY 절에서만 별칭 사용 가능

**FROM 절**

- 데이터를 불러올 테이블 지정.
- 여러 테이블 나열 시 조인 발생 가능 (명시적 조건 없으면 카티시안 곱)
- Oracle에서는 FROM 생략 불가 → DUAL 테이블 사용.
- SQL Server에서는 FROM 생략 가능.

**예제: Oracle DUAL 테이블 사용**

```sql
SELECT SYSDATE FROM DUAL;

```

---

### 🔣 2-3 함수(Function)

**정의:** 입력값(Input)에 따라 결과값(Output)을 반환하는 기능.

**함수 구분**

| 분류 기준 | 종류 | 설명 |
| --- | --- | --- |
| 입력값 수 | 단일행 함수 | 행마다 결과 1개 (LENGTH, UPPER 등) |
|  | 복수행 함수 | 여러 행 → 1개의 결과 (SUM, AVG 등) |
| 반환 타입 | 문자형 | 문자열 처리 (SUBSTR, INSTR 등) |
|  | 숫자형 | 숫자 계산 (ROUND, CEIL, FLOOR 등) |
|  | 날짜형 | 날짜 연산 (SYSDATE, ADD_MONTHS 등) |
|  | 변환형 | 타입 변환 (TO_CHAR, TO_DATE 등) |
|  | 그룹함수 | 집계용 (SUM, COUNT 등) |
|  | 일반함수 | 조건/널 처리 (NVL, DECODE 등) |

---

### 📘 문자형 함수

| 함수 | 설명 |
| --- | --- |
| SUBSTR(문자열, 시작위치, 길이) | 문자열 일부 추출 |
| LENGTH(문자열) | 문자 길이 반환 |
| INSTR(문자열, 찾을문자) | 특정 문자 위치 반환 |
| CONCAT(A, B) | 문자열 결합 |
| LOWER / UPPER | 대소문자 변환 |

**SQL Server 대응**: SUBSTRING, LEN, CHARINDEX

---

### 🔢 숫자형 함수

| 함수 | 설명 |
| --- | --- |
| ROUND(값, 자릿수) | 반올림 |
| TRUNC(값, 자릿수) | 절삭 |
| CEIL(값) / FLOOR(값) | 올림 / 내림 |
| MOD(값1, 값2) | 나머지 계산 |

---

### 📅 날짜형 함수

| 함수 | 설명 |
| --- | --- |
| SYSDATE | 현재 날짜 반환 |
| ADD_MONTHS(날짜, 개월수) | 지정 개월수 더하기 |
| MONTHS_BETWEEN(A, B) | 두 날짜 간 개월 차이 |
| NEXT_DAY(날짜, 요일) | 다음 요일 날짜 |
| LAST_DAY(날짜) | 해당 월의 마지막 날 |

**SQL Server 대응**: GETDATE, DATEADD, DATEDIFF

---

### 🔄 변환 함수

| 함수 | 설명 |
| --- | --- |
| TO_NUMBER(문자열) | 문자열 → 숫자 |
| TO_DATE(문자열, 형식) | 문자열 → 날짜 |
| TO_CHAR(날짜, 형식) | 날짜/숫자 → 문자열 |
| CAST(expr AS type) | 데이터 타입 변환 |
| CONVERT(type, expr, style) | SQL Server 형식 변환 |

---

### 📊 그룹 함수 (집계 함수)

| 함수 | 설명 |
| --- | --- |
| SUM(컬럼) | 합계 |
| AVG(컬럼) | 평균 |
| MIN(컬럼) / MAX(컬럼) | 최솟값 / 최댓값 |
| COUNT(컬럼) | NULL 제외한 행 수 |
| COUNT(*) | 전체 행 수 (NULL 포함) |

---

### ⚙️ 일반(조건/널 처리) 함수

| 함수 | 설명 |
| --- | --- |
| NVL(값, 대체값) | NULL을 대체값으로 치환 |
| NVL2(값, NULL이 아닐 때, NULL일 때) | NULL 여부에 따라 반환값 다름 |
| COALESCE(A, B, ...) | 첫 번째 NULL 아닌 값 반환 |
| DECODE(값, 비교1, 결과1, 비교2, 결과2, ...) | 조건 기반 치환 (Oracle 전용) |
| CASE WHEN 조건 THEN 결과 [ELSE 결과] END | 범용 조건식 (대체 DECODE) |
| NULLIF(A, B) | A와 B가 같으면 NULL, 다르면 A 반환 |
| ISNULL(값, 대체값) | SQL Server용 NULL 대체 |

---

**CASE문 예시**

```sql
SELECT ENAME,
       CASE
           WHEN DEPTNO = 10 THEN '인사부'
           WHEN DEPTNO = 20 THEN '재무부'
           ELSE '기타부서'
       END AS 부서명
FROM EMP;

```

✅ **핵심 암기 문장**

- SELECT 실행 순서는 **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY**.
- Oracle에서 FROM 생략 불가 → DUAL 테이블 사용.
- NVL은 NULL 치환, COALESCE는 **첫 번째 NULL 아닌 값 반환**.
- CASE문은 모든 DBMS에서 사용 가능하며 **DECODE의 범용 버전**.