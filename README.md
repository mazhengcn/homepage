# 🏠 Zheng Ma's Homepage

[![Netlify Status](https://api.netlify.com/api/v1/badges/b5548aaf-5905-4f3c-a866-78817910ded0/deploy-status)](https://app.netlify.com/projects/zheng-homepage/deploys)
[![License](https://img.shields.io/github/license/mazhengcn/homepage)](LICENSE)

> A modern, fast, and accessible personal website built with Astro, React, and Tailwind CSS.

**🌐 Live Site:** [https://zheng-homepage.netlify.app](https://zheng-homepage.netlify.app)

## ✨ Features

- 🚀 **Lightning Fast** - Built with Astro for optimal performance and minimal JavaScript
- 🎨 **Modern UI** - Beautiful, responsive design powered by Shadcn UI and Tailwind CSS
- 📝 **Blog System** - Write posts in Markdown/MDX with content collections
- 🔍 **SEO Optimized** - Automatic sitemap generation and RSS feed
- 🌓 **Dark Mode** - Seamless theme switching with system preference support
- ♿ **Accessible** - WCAG compliant components from Radix UI
- 📱 **Mobile First** - Fully responsive design for all screen sizes
- ⚡ **Fast Development** - Hot module replacement with Bun runtime

## 🛠️ Tech Stack

### Core

- **[Astro](https://astro.build/)** - Modern static site framework with island architecture
- **[React 19](https://react.dev/)** - Component-based UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager

### Styling

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful typographic defaults

### UI Components

- **[Shadcn UI](https://ui.shadcn.com/)** - High-quality, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon pack

### Content Management

- **[Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)** - Type-safe content management
- **[MDX](https://mdxjs.com/)** - Markdown with React components

### Development Tools

- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[Prettier](https://prettier.io/)** - Code formatter with plugin support

## 📁 Project Structure

```
homepage/
├── public/                 # Static assets (images, PDFs, etc.)
│   ├── cv.pdf
│   ├── persona.jpg
│   └── ...
├── src/
│   ├── assets/            # Optimized images for blog posts
│   │   ├── blog/
│   │   └── thumbnails/
│   ├── components/        # Reusable Astro & React components
│   │   ├── ui/           # Shadcn UI components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ...
│   ├── content/          # Content collections (Markdown/MDX)
│   │   └── blog/
│   ├── db/               # Data files
│   │   └── publications.json
│   ├── layouts/          # Page layout templates
│   │   ├── Layout.astro
│   │   ├── BlogPost.astro
│   │   └── ...
│   ├── lib/              # Utility functions
│   │   └── utils.ts
│   ├── pages/            # File-based routing
│   │   ├── index.astro
│   │   ├── blog/
│   │   └── tags/
│   └── styles/           # Global styles and themes
│       ├── global.css
│       └── themes/
├── astro.config.mjs      # Astro configuration
├── components.json       # Shadcn UI configuration
├── tsconfig.json         # TypeScript configuration
├── biome.json           # Biome configuration
└── package.json         # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** >= 1.0 (recommended) or Node.js >= 18
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mazhengcn/homepage.git
   cd homepage
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

   The site will be available at `http://localhost:4321`

### Alternative: Using npm/pnpm/yarn

If you prefer not to use Bun:

```bash
npm install
npm run dev
```

## 📝 Development

### Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `bun run dev`     | Start development server with HMR        |
| `bun run build`   | Build production site to `./dist/`       |
| `bun run preview` | Preview production build locally         |
| `bun run astro`   | Run Astro CLI commands                   |

### Adding New Content

#### Create a Blog Post

1. Create a new `.md` or `.mdx` file in `src/content/blog/`:

   ```markdown
   ---
   title: "My New Post"
   description: "A brief description"
   pubDate: 2025-10-09
   heroImage: "/src/assets/blog/my-post.jpg"
   tags: ["astro", "web-development"]
   ---

   Your content here...
   ```

2. Add hero image to `src/assets/blog/` (optional)

3. The post will automatically appear on your blog

#### Add a Page

Create a new `.astro` file in `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="My Page">
  <h1>My New Page</h1>
</Layout>
```

### Customization

#### Site Configuration

Edit `src/consts.ts` to update site metadata:

```typescript
export const SITE_TITLE = "Your Name's Homepage"
export const SITE_DESCRIPTION = 'Your site description'
export const SITE_URL = 'https://yoursite.com'
```

#### Theme Colors

Modify theme colors in `src/styles/themes/light.css` and `dark.css`

#### Add UI Components

Use the Shadcn CLI to add new components:

```bash
bunx shadcn@latest add button
```

## 🏗️ Building for Production

```bash
bun run build
```

The optimized site will be generated in the `./dist/` directory, ready for deployment.

### Build Output

- Optimized HTML, CSS, and JavaScript
- Compressed images
- Generated sitemap.xml
- RSS feed

## 🚢 Deployment

This site is configured for deployment on **Netlify**, but can be deployed anywhere static sites are supported.

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://app.netlify.com)
3. Configure build settings:
   - **Build command:** `bun run build`
   - **Publish directory:** `dist`
4. Deploy!

### Other Platforms

- **Vercel:** `vercel deploy`
- **Cloudflare Pages:** Connect your GitHub repo
- **GitHub Pages:** Use GitHub Actions workflow
- **Any static host:** Upload the `dist/` folder

See [Astro deployment docs](https://docs.astro.build/en/guides/deploy/) for more options.

## 🤝 Contributing

This is a personal website, but suggestions and bug reports are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Zheng Ma**

- Website: [https://zheng-homepage.netlify.app](https://zheng-homepage.netlify.app)
- GitHub: [@mazhengcn](https://github.com/mazhengcn)

## 🙏 Acknowledgments

- [Astro](https://astro.build/) - Amazing static site framework
- [Shadcn UI](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Excellent utility-first CSS framework
- [Netlify](https://www.netlify.com/) - Seamless deployment platform

---

<div align="center">
  <sub>Built with ❤️ using Astro</sub>
</div>
