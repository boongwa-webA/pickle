# pickle

## DB구조

### 1. User

|                        | 필드명   | 유형   |
| ---------------------- | -------- | ------ |
| 이름                   | userName | string |
| 아이디(중복x)          | userId   | string |
| 비번                   | userPw   | string |
| 학교                   | univ     | string |
| 학과                   | major    | string |
| 학년                   | grade    | int    |
| 학번(중복x, 10자 제한) | stdNum   | int    |

**userID, userPW는 로그인 시 사용**

### 2. Timetable

|                            | 필드명 | 유형   |
| -------------------------- | ------ | ------ |
| 아이디(User의 userID)      | userId | string |
| 과목번호(lecture의 lecNum) | lecNum | string |

**과목번호의 경우 배열로 저장할 것**



### 3. lecture

수강과목 목록 json파일

| 내용            | 필드명    | 값(형식) |
| --------------- | --------- | -------- |
| 개설학과        | dep       | string   |
| 학년            | grade     | int      |
| 이수구분        | essential | string   |
| 영역구분        | div       | string   |
| 수강반번호      | lecNum    | string   |
| 과목명          | lecName   | string   |
| 학점            | hakjum    | int      |
| 시수            | lecTime   | int      |
| 담당교수        | prof      | string   |
| 강의시간&강의실 | lecInfo   | string   |
| 제한인원        | max       | int      |

