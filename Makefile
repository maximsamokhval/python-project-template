OSV_SCANNER ?= osv-scanner

.PHONY: setup-frontend verify verify-python verify-frontend verify-browser verify-security verify-architecture

verify: verify-python verify-frontend

verify-python:
	uv run --locked ruff check .
	uv run --locked ruff format --check .
	uv run --locked ty check --error all .
	uv run --locked pyrefly check
	uv run --locked python -c "import guardian; print('Guardian loaded')"
	uv run --locked pytest --cov --cov-branch --cov-report=term-missing:skip-covered

setup-frontend:
	pnpm install --frozen-lockfile
	pnpm --filter @template/frontend exec playwright install chromium

verify-frontend:
	pnpm --filter @template/frontend run verify

verify-browser:
	pnpm --filter @template/frontend run verify:browser

verify-security:
	pnpm audit --audit-level high
	command -v $(OSV_SCANNER)
	$(OSV_SCANNER) scan source --recursive .

verify-architecture:
	test -f tach.toml
	uv run --locked tach check
