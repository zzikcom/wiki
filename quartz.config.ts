import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🌵Zzikipedia",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ko-KR", 
    baseUrl: "pedia.zzik.com", 
    ignorePatterns: ["private", "templates", "Templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Asta Sans",
        body: "Asta Sans",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fcfcfc",
          lightgray: "#f2f2f2",
          gray: "#666666",
          darkgray: "#444444",
          dark: "#222222",
          secondary: "#3273dc",
          tertiary: "#8b6fcb",
          highlight: "rgba(50, 115, 220, 0.1)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#01242e",
          lightgray: "#15343c",
          gray: "#aaaaaa",
          darkgray: "#dddddd",
          dark: "#eeeeee",
          secondary: "#8cc2dd",
          tertiary: "#c3b1ee",
          highlight: "rgba(140, 194, 221, 0.1)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CNAME(), 
    ],
  },
}

export default config