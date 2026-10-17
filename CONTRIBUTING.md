# Contributing

`README.md` is generated from [`library/library.json`](library/library.json). Don't edit `README.md` directly: add or change resources in `library/library.json`, then regenerate the README.

## Adding a resource

Each entry in `library/library.json` follows [`library/schema.json`](library/schema.json):

```json
{
  "type": "book",
  "title": "Title of the resource",
  "authors": ["First Author", "Second Author"],
  "date": "2024-05-17",
  "tags": ["ospo"],
  "open_access": false,
  "license": null,
  "links": ["https://example.com"]
}
```

- `type`: `book`, `report`, `conference-paper` or `preprint`
- `date`: publication date as `YYYY-MM-DD`; use `YYYY-MM` or `YYYY` when only that is known
- `tags` (optional): lowercase topic tags, e.g. `ospo`
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

## Web app

`app/` is a small Vue app to search and filter the library. It reads `library/library.json` directly, so new entries show up without extra steps. It needs Node.js (22, 24) and uses Yarn 4, which [Corepack](https://github.com/nodejs/corepack) installs automatically:

```sh
cd app
corepack enable   # once, to get the pinned Yarn version
yarn
yarn dev          # development server
yarn build        # production build in app/dist
```
