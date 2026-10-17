PYTHON ?= python3

.PHONY: readme
readme:
	$(PYTHON) scripts/generate.py
