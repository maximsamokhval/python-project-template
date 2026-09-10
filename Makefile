.PHONY: verify verify-architecture

verify:
	uv run --locked ruff check .
	uv run --locked ruff format --check .
	uv run --locked ty check --error all .
	uv run --locked pytest --cov --cov-branch --cov-report=term-missing:skip-covered

verify-architecture:
	test -f tach.toml
	uv run --locked tach check
