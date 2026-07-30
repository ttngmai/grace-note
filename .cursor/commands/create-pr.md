# create-pr

현재 작업 내용을 검토하고 Draft Pull Request를 생성한다.

반드시 `.cursor/rules/git-pr-workflow.mdc`의 규칙을 따른다.

## 절차

1. `git status --short --branch`로 현재 브랜치와 변경사항을 확인한다.
2. 현재 브랜치가 `main`이면 PR 생성을 중단하고 적절한 작업 브랜치를 생성한다.
3. 기존 사용자 변경사항과 이번 작업 변경사항을 구분한다.
4. `git diff`와 `git diff --staged`를 검토한다.
5. 변경 내용에 적합한 빌드, 테스트 및 린트를 실행한다.
6. `git diff --check`를 실행한다.
7. 아직 커밋하지 않은 이번 작업 파일만 명시적으로 stage한다.
8. 필요한 경우 Conventional Commits 형식으로 커밋한다.
9. 현재 브랜치를 `origin`에 push한다.
10. `main`을 base로 Draft Pull Request를 생성한다.
11. PR 제목은 Conventional Commits 형식을 사용한다.
12. PR 본문에는 변경 이유, 변경 내용, 구현 방식, 검증 결과, 영향 범위,
    관련 Issue 및 참고 사항을 포함한다.
13. 생성된 PR URL과 테스트 결과를 보고한다.

절대로 PR을 merge하거나 main에 직접 push하지 않는다.

테스트가 실패하면 실패 사실을 PR에 그대로 기록한다.
GitHub 인증이나 권한 문제로 PR 생성에 실패하면 오류를 숨기지 말고
실행한 명령, 오류 원인 및 사용자가 실행할 정확한 다음 명령을 제공한다.
