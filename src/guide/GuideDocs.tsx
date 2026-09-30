import type { MouseEventHandler, ReactNode } from "react";
import { Text } from "../components/atoms/Text";
import { useStoryCopy } from "../storybook/locales";
import styles from "./GuideDocs.module.scss";
import { deployedVersion, publishedVersion } from "./versions";

const installCommand = `pnpm add pocket-ds react react-dom sass
pnpm add @fontsource/inter`;

const installCommandNpm = `npm install pocket-ds react react-dom sass
npm install @fontsource/inter`;

const fontImports = `import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-700.css";`;

const packageImports = `import "pocket-ds/styles";
import { Badge, Tabs, Text } from "pocket-ds";`;

const changelogPath = "/docs/changelog--docs";
const githubUrl = "https://github.com/angelabenavente";
const npmUrl = "https://www.npmjs.com/package/pocket-ds";

function openDocsPage(path: string): MouseEventHandler<HTMLAnchorElement> {
  return (event) => {
    event.preventDefault();
    const nextUrl = new URL(window.parent.location.href);
    nextUrl.searchParams.set("path", path);
    window.parent.location.href = nextUrl.toString();
  };
}

function DocsLink(props: { path: string; children: ReactNode }) {
  return (
    <a href={`/?path=${props.path}`} onClick={openDocsPage(props.path)}>
      {props.children}
    </a>
  );
}

export function IntroductionDocs() {
  const page = useStoryCopy().guide.introduction;

  return (
    <>
      <Text as="h1" variant="heading-m">
        {page.title}
      </Text>
      <Text variant="body-s">{page.intro}</Text>
      <nav aria-label={page.contentsTitle}>
        <Text as="h2" variant="heading-s">
          {page.contentsTitle}
        </Text>
        <ul>
          <li>
            <Text as="span" variant="body-s">
              <a href="#install">{page.installTitle}</a>
            </Text>
          </li>
          <li>
            <Text as="span" variant="body-s">
              <a href="#tools">{page.toolsTitle}</a>
            </Text>
          </li>
          <li>
            <Text as="span" variant="body-s">
              <a href="#published">{page.publishedTitle}</a>
            </Text>
          </li>
          <li>
            <Text as="span" variant="body-s">
              <a href="#deployed">{page.deployedTitle}</a>
            </Text>
          </li>
        </ul>
      </nav>
      <Text as="h2" id="install" variant="heading-s">
        {page.installTitle}
      </Text>
      <Text variant="body-s">{page.dependencies}</Text>
      <div className={styles.snippet}>
        <Text variant="body-s">
          <span className={styles.step}>1.</span> {page.installCommand}
        </Text>
        <pre>
          <code>{installCommand}</code>
        </pre>
        <Text variant="body-s">{page.installCommandNpm}</Text>
        <pre>
          <code>{installCommandNpm}</code>
        </pre>
      </div>
      <Text variant="body-s">{page.installNote}</Text>
      <div className={styles.snippet}>
        <Text variant="body-s">
          <span className={styles.step}>2.</span> {page.fontImports}
        </Text>
        <pre>
          <code>{fontImports}</code>
        </pre>
      </div>
      <div className={styles.packageImports}>
        <div className={styles.snippet}>
          <Text variant="body-s">
            <span className={styles.step}>3.</span> {page.packageImports}
          </Text>
          <pre>
            <code>{packageImports}</code>
          </pre>
        </div>
      </div>
      <Text variant="body-s">{page.stylesTypes}</Text>
      <Text as="h2" id="tools" variant="heading-s">
        {page.toolsTitle}
      </Text>
      <Text variant="body-s">{page.toolsIntro}</Text>
      <ul>
        {page.tools.map((tool) => (
          <li key={tool.name}>
            <Text as="span" variant="body-s">
              <strong>{tool.name}.</strong> {tool.detail}
            </Text>
          </li>
        ))}
      </ul>
      <Text as="h2" id="published" variant="heading-s">
        {page.publishedTitle}
      </Text>
      <Text variant="body-s">
        <a href={npmUrl}>{publishedVersion}</a>
      </Text>
      <Text variant="body-s">{page.published}</Text>
      <Text as="h2" id="deployed" variant="heading-s">
        {page.deployedTitle}
      </Text>
      <Text variant="body-s">{deployedVersion}</Text>
      <Text variant="body-s">{page.deployed}</Text>
      <Text variant="body-s">
        <DocsLink path={changelogPath}>{page.changelog}</DocsLink>
      </Text>
      <Text variant="body-s">
        {page.creditBefore}
        <a href={githubUrl}>{page.creditName}</a>
        {page.creditAfter}
      </Text>
    </>
  );
}

export function ChangelogDocs() {
  const page = useStoryCopy().guide.changelog;

  return (
    <>
      <Text as="h1" variant="heading-m">
        {page.title}
      </Text>
      {page.releases.map((release) => (
        <section key={release.version}>
          <Text as="h2" variant="heading-s">
            {release.version} ({release.date})
          </Text>
          <Text variant="body-s">{release.added}</Text>
          <ul>
            {release.items.map((item) => (
              <li key={item}>
                <Text as="span" variant="body-s">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
