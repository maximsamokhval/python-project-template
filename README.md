<!-- Replace `python-project-template` and `python_project_template` when using this template. -->

# Python + React project template

Стартовий GitHub template для Python backend і React SPA. Python-контур використовує
`uv` і `src/`-layout, frontend — React, Vite, TypeScript і `pnpm`. Обидва контури
об'єднані одним verification harness без прикладної архітектури або бізнес-логіки.

## Створення нового проєкту

На GitHub натисніть **Use this template**, або виконайте:

```bash
gh repo create my-project \
  --template OWNER/python-project-template \
  --private \
  --clone
```

Одразу замініть у новому репозиторії:

1. `python-project-template` — назву проєкту;
2. `python_project_template` і каталог у `src/` — назву Python-пакета;
3. `@template/frontend` — назву frontend workspace;
4. `description`, `requires-python` і `coverage.source` у `pyproject.toml`;
5. вміст `AGENTS.md`, якщо для проєкту діють додаткові межі.

Додавайте runtime-залежності лише командою `uv add`, наприклад:

```bash
uv add aiogram fastapi httpx
```

## Підготовка

Потрібні Python 3.14, `uv` від 0.12.12 до 0.13.0 (не включно), Node.js із
`.node-version` і `pnpm` із поля `packageManager` у root `package.json`.

### 1. Встановити Python і frontend залежності

```bash
uv sync --locked
pnpm install --frozen-lockfile
pnpm --filter @template/frontend exec playwright install chromium
```

Альтернативно frontend можна підготувати командою `make setup-frontend`. Для зміни
Python-залежностей використовуйте `uv add`/`uv lock`, для frontend — `pnpm add
--filter @template/frontend`. Lockfiles не редагуйте вручну.

### 2. Встановити pre-commit hooks

```bash
uv run pre-commit install --install-hooks
```

Це встановлює hooks для `pre-commit`, `pre-push` і `commit-msg` відповідно до
`default_install_hook_types`. Якщо віртуальне середовище вже активоване,
допустима коротка форма: `pre-commit install --install-hooks`.

### 3. Виконати перевірки

```bash
make verify
make verify-browser
make verify-security
uv run pre-commit run --all-files
uv run pre-commit run --all-files --hook-stage pre-push
```

`make verify` є детермінованим локальним контрактом для Python і frontend core.
`make verify-browser` запускає Chromium component/E2E tests та axe. `make
verify-security` звертається до advisory services, тому є окремою online-перевіркою.

Локальні hooks можна обійти через `--no-verify`. GitHub Actions повторює ті самі
команди у clean environment, але без branch protection workflow є evidence, а не
технічно обов'язковим merge gate.

### 4. Запускати Pyrefly вручну

```bash
uv run pyrefly check
uv run pyrefly check src/
```

Конфігурація береться з `[tool.pyrefly]` у `pyproject.toml`: `preset =
"strict"` і `project-includes = ["src", "tests"]`.

`uv.lock` є частиною репозиторію: не видаляйте його й не редагуйте вручну.

## Frontend

Запустити development server:

```bash
pnpm --filter @template/frontend dev
```

Окремі перевірки:

```bash
make verify-frontend
make verify-browser
pnpm --filter @template/frontend run deadcode:report
```

Frontend підтримує `.ts/.tsx` і перевіряє `.js/.jsx` через `allowJs + checkJs`.
Architecture gate контролює лише цикли, unresolved imports, production imports із
tests і dev dependencies. Він навмисно не вигадує FSD/DDD layers.

Повний опис gates, меж доказовості й upgrade policy: [Frontend verification
harness](docs/frontend-harness.md).

## Архітектурні межі

`tach` встановлено, але базовий шаблон навмисно не містить вигаданих модулів і
залежностей. Коли з'являться реальні межі на кшталт `domain`, `application`,
`adapters`, `bootstrap`, виконайте:

```bash
uv run tach init
make verify-architecture
```

Після перевірки створеного `tach.toml` додайте закоментований hook `tach` у
`.pre-commit-config.yaml`. Так `make verify` не імітує перевірку архітектури,
якої ще немає.

## Документація та перша feature

Оригінальні бізнес-матеріали зберігайте в `docs/source/` без AI-редагування.
Для кожної малої вертикальної feature створюйте окремий каталог у
`docs/features/`, де поруч є `Goal`, `Scope`, `REQ`, `INV`, `AC`, `FAIL` і `OPEN`.

Перед розробкою вимоги проходять послідовність:

```text
requirements-extract → requirements-critic → рішення людини щодо OPEN/blocker → specification-compiler
```
