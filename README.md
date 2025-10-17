# Academic Homepage

A modern, fast, and elegant academic homepage built with Next.js and Fumadocs. This website showcases research interests, publications, and documentation with a clean and professional design.

## ✨ Features

- **🏠 Personal Profile**: Introduction page with work experience and education timeline
- **📚 Research Interests**: Interactive cards showcasing research areas
- **📝 Publications**: Automatically sorted publication list from JSON data
- **📖 Documentation**: Full documentation system powered by Fumadocs with MDX support
- **🎨 Modern UI**: Beautiful, responsive design using shadcn/ui components
- **🌓 Dark Mode**: Built-in theme switching with next-themes
- **🔍 Search**: Integrated search functionality for documentation
- **📱 Responsive**: Mobile-first design that works on all devices
- **⚡ Fast**: Optimized with Turbopack and modern React features
- **📐 Math Support**: KaTeX integration for mathematical expressions

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Documentation**: [Fumadocs](https://fumadocs.vercel.app/)
- **Content**: MDX with rehype-katex and remark plugins
- **Icons**: [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Code Quality**: [Biome](https://biomejs.dev/)
- **Runtime**: [Bun](https://bun.sh/) (optional, can use Node.js)

## 📁 Project Structure

```
next-homepage/
├── app/                      # Next.js app directory
│   ├── (home)/              # Home layout group
│   │   ├── page.tsx         # Landing page
│   │   ├── research/        # Research interests
│   │   └── publications/    # Publications list
│   ├── docs/                # Documentation pages
│   ├── api/                 # API routes
│   └── global.css           # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── nav-bar.tsx          # Navigation bar
│   ├── footer.tsx           # Footer
│   ├── timeline.tsx         # Timeline component
│   └── publication-list.tsx # Publication list
├── content/                 # MDX content
│   ├── docs/                # Documentation content
│   └── blog/                # Blog posts (if any)
├── lib/                     # Utility functions
│   ├── db/                  # JSON data files
│   └── remark-plugins/      # Custom remark plugins
├── public/                  # Static assets
└── [config files]           # Configuration files
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mazhengcn/next-homepage.git
cd next-homepage
```

2. Install dependencies:

```bash
bun install
# or
npm install
```

3. Run the development server:

```bash
bun run dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
bun run build
bun run start
```

## 📝 Content Management

### Adding Research Content

Add MDX files in `content/docs/` with appropriate frontmatter:

```mdx
---
title: Your Research Topic
description: Brief description of your research
---

Your content here...
```

### Managing Publications

Edit `lib/db/publications.json` following the CSL JSON format. The publications are automatically sorted by date.

### Customization

- **Personal Info**: Edit `app/(home)/page.tsx`
- **Navigation**: Modify `components/nav-bar.tsx`
- **Theme Colors**: Update Tailwind configuration
- **Metadata**: Configure in `app/layout.tsx`

## 🎨 UI Components

This project uses shadcn/ui components which can be customized in `components/ui/`:

- `card.tsx` - Card components
- `button.tsx` - Button variants
- `navigation-menu.tsx` - Navigation menu
- `dropdown-menu.tsx` - Dropdown menus
- And more...

## 🧪 Code Quality

```bash
# Lint code
bun run lint

# Format code
bun run format
```

## 📦 Scripts

- `dev` - Start development server with Turbopack
- `build` - Build for production
- `start` - Start production server
- `lint` - Run Biome linter
- `format` - Format code with Biome
- `postinstall` - Process MDX files with Fumadocs

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

Build the project and deploy the `.next` folder to any Node.js hosting service.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Zheng Ma (马征)
Email: zhengma@sjtu.edu.cn

---

Built with ❤️ using [Next.js](https://nextjs.org/), [Fumadocs](https://fumadocs.vercel.app/), and [shadcn/ui](https://ui.shadcn.com/)
