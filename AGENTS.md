# AGENTS.md

- Відповідайте користувачеві українською мовою.
- Зберігайте межі `domain` → `application` → `adapters`; домен не залежить від
  FastAPI, SQLAlchemy чи конкретних зовнішніх інтеграцій.
- Невизначену вимогу записуйте як `OPEN`; не вигадуйте рішення.
- Не послаблюйте тести, перевірки типів або lint, щоб отримати зелений результат.
- Перед передаванням змін запускайте `make verify`; за наявності `tach.toml`
  також запускайте `make verify-architecture`.
- Не змінюйте затверджені вимоги мовчки.

## Підготовка репозиторію

Після зміни залежностей виконайте `uv lock`, потім `uv sync` і
`uv run pre-commit install --install-hooks`. Перед першою зміною запустіть
`uv run pre-commit run --all-files`; перед передаванням результату —
`make verify` і `uv run pre-commit run --all-files --hook-stage pre-push`.
Для окремої перевірки типів використовуйте `uv run pyrefly check` або
`uv run pyrefly check src/`. Не редагуйте `uv.lock` вручну.
