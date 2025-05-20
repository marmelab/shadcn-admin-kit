.PHONY: help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	pnpm install

run:
	pnpm run dev

lint: ## Run linter
	pnpm run lint

build: ## Build the project
	pnpm run build

build-registry: ## Build the UI registry
	pnpm run registry:build

test-registry: ## Test the UI registry
	./scripts/test-registry.sh

