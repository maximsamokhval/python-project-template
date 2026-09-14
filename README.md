<!-- Replace `python-project-template` and `python_project_template` when using this template. -->

# Python project template

Стартовий GitHub template для Python-проєктів із `uv`, `src/`-layout і локальним
verification harness. Він не містить прикладної архітектури або runtime-залежностей.

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
3. `description`, `requires-python` і `coverage.source` у `pyproject.toml`;
4. вміст `AGENTS.md`, якщо для проєкту діють додаткові межі.

Додавайте runtime-залежності лише командою `uv add`, наприклад:

```bash
uv add aiogram fastapi httpx
```

## Міні-інструкція

Потрібні Python 3.14 і `uv` від 0.12.12 до 0.13.0 (не включно).

### 1. Встановити залежності

```bash
uv lock
uv sync
```

`uv lock` фіксує нові залежності в `uv.lock`, а `uv sync` встановлює їх у
локальне середовище, зокрема `pyrefly` і `guardian-type-enforcer`.

### 2. Встановити pre-commit hooks

```bash
uv run pre-commit install --install-hooks
```

Це встановлює hooks для `pre-commit`, `pre-push` і `commit-msg` відповідно до
`default_install_hook_types`. Якщо віртуальне середовище вже активоване,
допустима коротка форма: `pre-commit install --install-hooks`.

### 3. Виконати першу повну перевірку

```bash
make verify
uv run pre-commit run --all-files
uv run pre-commit run --all-files --hook-stage pre-push
```

Переконайтеся, що серед успішних hooks є `Pyrefly type check` і
`Guardian import check`.

### 4. Запускати Pyrefly вручну

```bash
uv run pyrefly check
uv run pyrefly check src/
```

Конфігурація береться з `[tool.pyrefly]` у `pyproject.toml`: `preset =
"strict"` і `project-includes = ["src", "tests"]`.

`uv.lock` є частиною репозиторію: не видаляйте його й не редагуйте вручну.

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
