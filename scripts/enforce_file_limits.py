from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS = ROOT / "styles.css"
CSS_DIR = ROOT / "css"
HTML = ROOT / "index.html"
MAX_LINES = 160


def split_css(source: str) -> list[str]:
    blocks: list[str] = []
    current: list[str] = []
    depth = 0

    for line in source.splitlines():
        current.append(line)
        depth += line.count("{") - line.count("}")
        if depth == 0 and current:
            block = "\n".join(current).strip()
            if block:
                blocks.append(block)
            current = []

    if current:
        block = "\n".join(current).strip()
        if block:
            blocks.append(block)

    modules: list[str] = []
    current = []
    current_line_count = 0
    for block in blocks:
        block_lines = block.splitlines()
        if current and current_line_count + len(block_lines) > MAX_LINES:
            modules.append("\n\n".join(current) + "\n")
            current = []
            current_line_count = 0
        current.append(block)
        current_line_count += len(block_lines)
    if current:
        modules.append("\n\n".join(current) + "\n")
    return modules


def main() -> None:
    CSS_DIR.mkdir(exist_ok=True)
    source_path = next(CSS_DIR.glob("module-*.css"), CSS)
    original_css = source_path.read_text()
    for path in CSS_DIR.glob("module-*.css"):
        path.unlink()

    modules = split_css(original_css)
    for index, content in enumerate(modules, start=1):
        (CSS_DIR / f"module-{index:02d}.css").write_text(content)

    imports = "\n".join(
        f'@import url("css/module-{index:02d}.css");' for index in range(1, len(modules) + 1)
    )
    CSS.write_text(imports + "\n")
    HTML.write_text("\n".join(line for line in HTML.read_text().splitlines() if line.strip()) + "\n")


if __name__ == "__main__":
    main()
