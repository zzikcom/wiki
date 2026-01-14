import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "zzik.com": "https://zzik.com",
    },
  }),
}

const explorerConfig = Component.Explorer({
  title: "탐색기",
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: true,
  mapFn: (node) => {
    // node.name은 실제 폴더/파일명이고 node.displayName은 화면 표시 이름입니다.
    if (node.name === "law") {
      node.displayName = "⚖️ 법·법학·법무"
    } else if (node.name === "finance") {
      node.displayName = "💰 금융"
    }
    // 수정된 node는 반환할 필요 없이 내부에서 속성만 변경하면 됩니다.
  },
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.DesktopOnly(Component.RecentNotes({
      title: "최근 게시물",
      limit: 5, // 보여줄 개수
      linkToPages: true, // 제목 클릭 시 해당 페이지로 이동
      filter: (f) => f.slug !== "index", // 메인 페이지는 제외
    })),
    explorerConfig,
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    explorerConfig,
  ],
  right: [],
}
