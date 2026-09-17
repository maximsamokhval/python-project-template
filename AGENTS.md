# AGENTS.md

- Відповідайте користувачеві українською мовою.
- Зберігайте межі `domain` → `application` → `adapters`; домен не залежить від
  FastAPI, SQLAlchemy чи конкретних зовнішніх інтеграцій.
- Невизначену вимогу записуйте як `OPEN`; не вигадуйте рішення.
- Не послаблюйте тести, перевірки типів або lint, щоб отримати зелений результат.
- Перед передаванням змін запускайте `make verify`; за наявності `tach.toml`
  також запускайте `make verify-architecture`.
- Для змін frontend-поведінки додатково запускайте `make verify-browser`.
- Для dependency/security змін запускайте online-перевірку `make verify-security`.
- Не змінюйте затверджені вимоги мовчки.

## Підготовка репозиторію

Після зміни залежностей виконайте `uv lock`, потім `uv sync` і
`uv run pre-commit install --install-hooks`. Перед першою зміною запустіть
`uv run pre-commit run --all-files`; перед передаванням результату —
`make verify` і `uv run pre-commit run --all-files --hook-stage pre-push`.
Для окремої перевірки типів використовуйте `uv run pyrefly check` або
`uv run pyrefly check src/`. Не редагуйте `uv.lock` вручну.

## Frontend

Перед frontend-змінами виконайте `pnpm install --frozen-lockfile`. Залежності
додавайте через `pnpm add --filter @template/frontend` і не редагуйте
`pnpm-lock.yaml` вручну. Використовуйте наявні scripts із `frontend/package.json`;
не створюйте паралельний harness через Husky, інший linter або formatter.

Зберігайте architecture gate універсальним: cycles, unresolved imports,
production → tests і production → dev dependencies. Нові product layers додавайте
лише після прийнятої module map/ADR. Під час зміни frontend toolchain, browser,
coverage, bundle або security gates прочитайте `docs/frontend-harness.md`.
