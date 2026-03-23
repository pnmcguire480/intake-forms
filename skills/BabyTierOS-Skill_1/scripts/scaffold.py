#!/usr/bin/env python3
"""
BabyTierOS Scaffold Generator

Copies all 10 template files to the target project directory.
Run from the skill's scripts/ folder, or pass --target to specify output.

Usage:
    python scaffold.py                    # Scaffolds to current working directory
    python scaffold.py --target /my/project   # Scaffolds to specific path
    python scaffold.py --list             # Lists all template files
    python scaffold.py --only SPEC.md ARCHITECTURE.md  # Scaffolds specific files only
"""

import argparse
import os
import shutil
import sys
from pathlib import Path

TEMPLATES = [
    "CLAUDE.md",
    "SPEC.md",
    "SCENARIOS.md",
    "ARCHITECTURE.md",
    "AGENTS.md",
    "CODEGUIDE.md",
    "ART.md",
    "CONTEXT.md",
    "SNIFFTEST.md",
]

SKILL_DIR = Path(__file__).resolve().parent.parent
TEMPLATE_DIR = SKILL_DIR / "references" / "templates"


def scaffold(target: Path, only: list[str] | None = None, force: bool = False):
    """Copy template files to target directory."""
    target.mkdir(parents=True, exist_ok=True)

    files_to_copy = only if only else TEMPLATES
    created = []
    skipped = []

    for filename in files_to_copy:
        src = TEMPLATE_DIR / filename
        dst = target / filename

        if not src.exists():
            print(f"  ⚠️  Template not found: {filename}")
            continue

        if dst.exists() and not force:
            skipped.append(filename)
            continue

        shutil.copy2(src, dst)
        created.append(filename)

    return created, skipped


def main():
    parser = argparse.ArgumentParser(description="BabyTierOS Scaffold Generator")
    parser.add_argument("--target", type=str, default=".", help="Target directory (default: current)")
    parser.add_argument("--list", action="store_true", help="List all template files")
    parser.add_argument("--only", nargs="+", help="Scaffold specific files only")
    parser.add_argument("--force", action="store_true", help="Overwrite existing files")
    args = parser.parse_args()

    if args.list:
        print("BabyTierOS template files:")
        for f in TEMPLATES:
            src = TEMPLATE_DIR / f
            size = src.stat().st_size if src.exists() else 0
            print(f"  {f:25s} ({size:,} bytes)")
        return

    target = Path(args.target).resolve()
    print(f"🔧 Scaffolding BabyTierOS to: {target}")
    print()

    created, skipped = scaffold(target, only=args.only, force=args.force)

    if created:
        print("✅ Created:")
        for f in created:
            print(f"   {f}")

    if skipped:
        print()
        print("⏭️  Skipped (already exist — use --force to overwrite):")
        for f in skipped:
            print(f"   {f}")

    print()
    print(f"📁 {len(created)} files created, {len(skipped)} skipped")

    if created:
        print()
        print("Next steps:")
        print("  1. Open CONTEXT.md — brain dump why this project exists")
        print("  2. Open SPEC.md — define users and features")
        print("  3. Open ARCHITECTURE.md — choose your tech stack")
        print("  4. Open CLAUDE.md — fill in the Project Identity section")
        print("  5. The rest can wait until you need them")


if __name__ == "__main__":
    main()
