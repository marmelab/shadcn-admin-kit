.PHONY: help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	@pnpm install

install-browsers: ## Install Playwright browsers
	@pnpm exec playwright install --with-deps chromium

run:
	pnpm run dev

start: run

lint: ## Run linter
	pnpm run lint

build-demo: ## Build the demo
	rm -rf ./public/demo
	pnpm run demo:build
	mv ./dist ./public/demo

build-registry: ## Build the UI registry
	pnpm run registry:build

test:
	pnpm run test

test-watch: ## Run tests in watch mode
	pnpm run test:watch

test-browser: ## Run tests in browser mode
	pnpm run test:browser

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

start-website: run-website

build-website: ## Build the website
	rm -rf ./public/assets ./public/img ./public/index.html
	pnpm run website:build
	mv ./website/dist/* ./public/

build: build-website build-doc build-demo build-registry ## Build all components

typecheck: ## Run TypeScript type checking
	@pnpm run typecheck

doc: ## launch doc web server
	@cd docs && pnpm run dev

build-doc: ## Build the doc website
	rm -rf ./public/docs
	pnpm run doc:build
	mv ./docs/dist ./public/docs
