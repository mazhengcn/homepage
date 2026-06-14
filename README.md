[![Netlify Status](https://api.netlify.com/api/v1/badges/5fd1d16d-9d59-4ffd-869a-7c5822a06543/deploy-status)](https://app.netlify.com/projects/zheng-home/deploys)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/zheng-home)

# Zheng Ma's Homepage

A modern, fast, and elegant academic homepage built with Next.js and Fumadocs. This website showcases research interests, publications, and documentation with a clean and professional design.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Documentation**: [Fumadocs](https://fumadocs.vercel.app/)
- **Content**: MDX with rehype-katex and remark plugins
- **Icons**: [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Runtime**: [Bun](https://bun.sh/) (optional, can use Node.js)

## 📚 Publications Management

Publications are stored in `lib/db/publications.json` in [CSL-JSON](https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html) format. Two CLI tools are provided for managing them.

### Admin CLI

```bash
bun manage-pubs list            # Numbered list of all publications
bun manage-pubs add             # Opens $EDITOR with a JSON template → validates → appends
bun manage-pubs edit 5          # Opens $EDITOR with entry #5 → validates → replaces
bun manage-pubs remove 5        # Confirm → removes entry #5
bun manage-pubs validate        # Zod schema validation on all entries
```

- Indexes are **1-based** (as shown by `list`).
- Every mutation auto-creates `lib/db/publications.bak.json` as a safety net.
- Editor falls back through `$EDITOR` → `$VISUAL` → `vim` → `nano` → `vi`.
- Entry fields are validated against a Zod schema at `lib/db/publications.schema.ts`.

### BibTeX Converter

```bash
bun convert-bibtex to-bibtex                   # JSON → BibTeX (writes lib/db/publications.bib)
bun convert-bibtex from-bibtex file.bib        # BibTeX → JSON (prints to stdout)
bun convert-bibtex from-bibtex file.bib --merge  # BibTeX → JSON (appends new entries)
```

- Uses [citation-js](https://citation.js.org/) for parsing and formatting.
- `--merge` deduplicates by DOI and title before appending.
- BibTeX citation keys are auto-generated from author + year + title.

## 📧 Contact

Zheng Ma (马征)
Email: zhengma@sjtu.edu.cn

---

Built with ❤️ using [Next.js](https://nextjs.org/), [Fumadocs](https://fumadocs.vercel.app/), and [shadcn/ui](https://ui.shadcn.com/)
