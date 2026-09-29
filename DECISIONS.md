# 결정사항

## 2026-09-29

- 정적 페이지의 실행 방식을 유지하기 위해 프레임워크나 빌드 도구를 도입하지 않는다.
- `index.html`은 콘텐츠 구조, `styles.css`는 CSS 진입점, `js/main.js`는 동작 진입점으로 유지한다.
- 200줄 제한을 지키기 위해 CSS는 중괄호 블록이 완결되는 지점에서 `css/module-*.css`로 자동 분할한다.
- CSS 분할과 HTML 공백 정리는 `scripts/enforce_file_limits.py`로 재현 가능하게 한다.
- 내비게이션과 reveal 애니메이션은 각각 독립적인 ES 모듈로 유지한다.
