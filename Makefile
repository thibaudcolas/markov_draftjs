.PHONY: build clean-pyc init help test-ci
.DEFAULT_GOAL := help

help: ## See what commands are available.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36mmake %-15s\033[0m # %s\n", $$1, $$2}'

init: clean-pyc ## Install dependencies and initialise for development.
	uv sync --group dev

lint: ## Lint the project.
	uv run ruff check
	uv run ruff format --check .

test: ## Test the project.
	uv run python -X dev -W error -m unittest discover

test-coverage: ## Run the tests while generating test coverage data.
	uv run coverage run -m unittest discover
	uv run coverage report
	uv run coverage html

dev: ## Runs the example code
	uv run python -X dev -W error example.py

clean-pyc: ## Remove Python file artifacts.
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +

build: ## Builds package for publication.
	rm -f dist/*
	uv build

publish: build ## Publishes a new version to pypi.
	uv publish
