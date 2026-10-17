# Contributing

`README.md` is generated from [`library/library.json`](library/library.json). Don't edit `README.md` directly: add or change resources in `library/library.json`, then regenerate the README.

## Adding a resource

Each entry in `library/library.json` follows [`library/schema.json`](library/schema.json):

```json
{
  "type": "book",
  "title": "Title of the resource",
  "authors": ["First Author", "Second Author"],
  "open_access": false,
  "license": null,
  "links": ["https://example.com"]
}
```

- `type`: `book` or `report`
- `license`: an [SPDX identifier](https://spdx.org/licenses/) (e.g. `CC-BY-4.0`), or `null` if proprietary or unknown
- `links`: the first link is used for the title in the README

## Regenerating the README

Pre-requirements:

```sh
python -m venv env
source env/bin/activate
pip install -r scripts/requirements.txt
```

Then, from the root of the repository, with the virtualenv active:

```sh
make readme
```

Commit both `library/library.json` and the regenerated `README.md`.
