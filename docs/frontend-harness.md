# Frontend verification harness

## Призначення

Harness дає React SPA швидкий локальний feedback, clean browser evidence і окрему
security intelligence. Він не визначає product architecture, browser support
matrix або performance SLO замість власника продукту.

## Контракти

| Команда | Перевіряє | Мережа |
|---|---|---|
| `make verify` | Python harness і frontend core | Ні, після bootstrap |
| `make verify-frontend` | format, lint, types, imports, coverage, build, production dead code, size report | Ні |
| `make verify-browser` | Vitest Browser Mode, Playwright E2E, axe | Ні, якщо Chromium уже встановлено |
| `make verify-security` | npm advisories та OSV для обох lockfiles | Так |
| `make setup-frontend` | frozen install і Chromium bootstrap | Так |

`make verify` не встановлює dependencies, не запускає autofix і не змінює tracked
файли. Bootstrap завжди виконується окремо.

Для локального `make verify-security` потрібен OSV-Scanner v2 у `PATH`. Інший
перевірений binary можна передати як `OSV_SCANNER=/absolute/path/to/osv-scanner`.
У GitHub Actions scanner запускає pinned reusable workflow.

## Статичний контур

- TypeScript працює у strict/no-emit режимі; `.js/.jsx` входять у `checkJs`.
- ESLint використовує typed `typescript-eslint`, stable React Hooks і jsx-a11y
  rules; warnings блокують перевірку.
- Prettier є єдиним formatter.
- dependency-cruiser блокує runtime cycles, unresolved imports, production →
  tests і production → dev dependencies.
- `knip --production` блокує невикористаний production graph. Повний `knip`
  лишається reporting-командою, доки entry conventions не стабілізовані.

Stylelint не входить до універсального baseline: його додають разом із явно
вибраною CSS-технологією. React Compiler transform, Oxlint, Biome та Oxfmt не
запускаються паралельно з baseline toolchain.

## Тести й доказовість

- Vitest Node project перевіряє pure logic.
- Vitest jsdom project дає швидке component coverage.
- Vitest Browser Mode повторює критичну взаємодію в реальному Chromium.
- Playwright перевіряє production build, navigation і user-facing behavior.
- axe знаходить частину accessibility defects, але не доводить WCAG compliance;
  keyboard і screen-reader review залишаються ручною відповідальністю.

Coverage охоплює owned source files, крім declarations і технічного bootstrap:
80% global і 60% для кожного файла. Ці числа є regression floor, а не доказом
коректності тестів.

## Supply chain і CI

- Runtime, package manager і direct dependencies зафіксовані точними версіями.
- Frozen lockfile блокує manifest drift.
- Dependency lifecycle scripts виконуються лише через allowlist.
- Release-age policy зменшує ризик щойно опублікованих шкідливих пакетів.
- `pnpm audit` блокує high/critical advisories в online job.
- OSV формує окремий звіт для `pnpm-lock.yaml` і `uv.lock`.
- GitHub Actions використовуються за immutable commit SHA.

Dependabot оновлює GitHub Actions і pre-commit revisions. npm і Python dependency
updates не ввімкнені: станом на 2026-09-17 Dependabot ще не підтримує обрані pnpm
11 та uv 0.12 lines. Їх оновлюють окремими PR із повним proof set.

На поточному private GitHub plan branch protection недоступний. Тому hooks і
workflow створюють evidence, але не є non-bypassable merge authority.

## Bundle і performance

Production build публікує raw/gzip size report. Hard bundle budget додається лише
після затвердження owner, baseline, compression mode, допустимого delta й exception
policy. Lighthouse CI потребує стабільного URL і каліброваного throttling profile;
до цього він не є blocking gate.

## Upgrade policy

Не пізніше 2026-10-15 окремими PR повторно оцінити `pnpm 12` і Vitest 5.
Graduation criteria:

1. щонайменше 30 днів стабільної release line;
2. чиста контрольована міграція lockfile;
3. відсутність regression у workspace/lifecycle policy та browser provider;
4. повний локальний proof set;
5. дві послідовні зелені GitHub Actions runs.

TypeScript 7 переходить у baseline лише після сумісності compiler API,
typescript-eslint/dependency-cruiser і чистого PoC. Oxlint або Biome оцінюються як
заміна ESLint, а не як додатковий blocking linter.

ESLint 10 переходить у baseline після того, як React і jsx-a11y plugins офіційно
розширять peer ranges. До цього ESLint 9 є compatibility line без unmet peers.
