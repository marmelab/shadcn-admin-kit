.PHONY: help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	pnpm install

run:
	pnpm run dev

lint: ## Run linter
	pnpm run lint

build-demo: ## Build the demo
	rm -rf ./public/demo
	pnpm run demo:build
	mv ./dist ./public/demo

build-registry: ## Build the UI registry
	pnpm run registry:build

test-registry: ## Test the UI registry
	./scripts/test_registry.sh

serve-registry: ## Serve the UI registry locally
	python3 -m http.server -d ./public 8080

clear-registry: ## Clear the UI registry
	rm -rf ./public/r

storybook: ## Start the storybook
	pnpm run storybook

run-website: ## Run the website in development mode
	pnpm run website:dev

build-website: ## Build the website
	rm -rf ./public/assets ./public/img ./public/index.html
	pnpm run website:build
	mv ./website/dist/* ./public/

build: build-website build-demo build-registry ## Build all components

typecheck: ## Run TypeScript type checks
	pnpm run typecheck