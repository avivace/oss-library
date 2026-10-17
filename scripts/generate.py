import json
from pathlib import Path

from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).resolve().parent.parent

with open(ROOT / "library" / "library.json") as f:
    library = json.load(f)

env = Environment(loader=FileSystemLoader(ROOT / "scripts" / "templates"), keep_trailing_newline=True)
readme = env.get_template("README.md.j2").render(resources=library["resources"])

with open(ROOT / "README.md", "w") as f:
    f.write(readme)
