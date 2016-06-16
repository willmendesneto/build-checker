CPUS      ?= $(node -p "require('os').cpus().length" 2> /dev/null || echo 1)
MAKEFLAGS += --warn-undefined-variables --no-builtin-rules --output-sync
MAKEFLAGS += --jobs $(CPUS)
.DEFAULT_GOAL := all
.DELETE_ON_ERROR:

all: test

lint:
	@echo "Linting..."
	@! git --no-pager grep -nE "^\s*?(describe|it).only" -- ./test/*.js
	@./node_modules/.bin/editorconfig-tools check ./test/** ./src/**

# All the tests
test: lint
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha

#
# Phony targets
#
.PHONY: test
