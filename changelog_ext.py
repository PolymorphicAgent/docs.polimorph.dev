"""
Custom superfences formatter for changelog timeline blocks.

Converts a lightweight changelog syntax into the HTML timeline
structure styled by changelog.css.

SETUP
─────
1. Place this file at your MkDocs project root (next to mkdocs.yml)
2. Add the custom fence to your mkdocs.yml:

   markdown_extensions:
     - pymdownx.superfences:
         custom_fences:
           - name: changelog
             class: changelog
             format: !!python/name:changelog_ext.changelog_formatter

3. Make sure changelog.css is loaded via extra_css:

   extra_css:
     - stylesheets/changelog.css

SYNTAX
──────
  ```changelog
  @repo https://github.com/User/Repo       ← optional; makes hashes into links

  ## February 13, 2026 | 3fbd5ad           ← date header (hash is optional)
  + This was added                          ← Added   (green)
  ~ This was changed                        ← Changed (blue)
  * This was fixed                          ← Fixed   (red)
  - This was removed                        ← Removed (grey)
  ! This is deprecated                      ← Deprecated (yellow)

  ## January 20, 2026
  + Another entry without a commit hash
  ```

INLINE FORMATTING
─────────────────
  `code spans` and **bold** are supported inside entry text.
"""

import re
import html as _html


BADGE_MAP = {
    "+": ("Added", "badge-added"),
    "~": ("Changed", "badge-changed"),
    "*": ("Fixed", "badge-fixed"),
    "-": ("Removed", "badge-removed"),
    "!": ("Deprecated", "badge-deprecated"),
}

_DATE_RE = re.compile(r"^##\s+(.+?)(?:\s*\|\s*([0-9a-fA-F]{6,40}))?\s*$")
_CODE_RE = re.compile(r"`([^`]+)`")
_BOLD_RE = re.compile(r"\*\*(.+?)\*\*")


def _inline(text: str) -> str:
    """Escape HTML, then apply inline code and bold formatting."""
    text = _html.escape(text)
    text = _CODE_RE.sub(r"<code>\1</code>", text)
    text = _BOLD_RE.sub(r"<strong>\1</strong>", text)
    return text


def changelog_formatter(source, language, css_class, options, md, **kwargs):
    lines = source.strip().splitlines()
    repo_url = None
    is_first_date = True
    parts = ['<section class="changelog-timeline">']

    for raw_line in lines:
        line = raw_line.strip()

        # Skip blanks
        if not line:
            continue

        # ── @repo directive ──────────────────────────────────
        if line.startswith("@repo "):
            repo_url = line[6:].strip().rstrip("/")
            continue

        # ── Date header: ## Date | hash ──────────────────────
        m = _DATE_RE.match(line)
        if m:
            date_text = _html.escape(m.group(1).strip())
            commit_hash = m.group(2)

            hash_html = ""
            if commit_hash:
                if repo_url:
                    hash_html = (
                        f' <span class="changelog-hash">'
                        f'<a href="{repo_url}/commit/{commit_hash}" target="_blank" rel="noopener noreferrer">{commit_hash[:7]}</a>'
                        f"</span>"
                    )
                else:
                    hash_html = (
                        f' <span class="changelog-hash">{commit_hash[:7]}</span>'
                    )

            latest_html = ""
            if is_first_date:
                latest_html = ' <span class="changelog-badge badge-latest">Latest</span>'
                is_first_date = False

            parts.append(
                f'<div class="changelog-date">{date_text}{hash_html}{latest_html}</div>'
            )
            continue

        # ── Entry line: +, ~, *, -, ! ────────────────────────
        if line[0] in BADGE_MAP:
            prefix = line[0]
            label, badge_cls = BADGE_MAP[prefix]
            body = _inline(line[1:].strip())
            parts.append(
                f'<div class="changelog-entry">'
                f'<span class="changelog-badge {badge_cls}">{label}</span>'
                f"<p>{body}</p>"
                f"</div>"
            )
            continue

    parts.append("</section>")
    return "".join(parts)
