import { BeforeAfterSlider } from "@hive/blog-next";
import { isTipTapDoc, type TipTapMark, type TipTapNode, type TipTapDoc } from "@/lib/hive-blog";

function Text({ text = "", marks = [] }: { text?: string; marks?: TipTapMark[] }) {
  let output: React.ReactNode = text;
  for (const mark of marks) {
    if (mark.type === "bold") output = <strong>{output}</strong>;
    if (mark.type === "italic") output = <em>{output}</em>;
    if (mark.type === "underline") output = <u>{output}</u>;
    if (mark.type === "strike") output = <s>{output}</s>;
    if (mark.type === "code") output = <code>{output}</code>;
    if (mark.type === "highlight") output = <mark>{output}</mark>;
    if (mark.type === "link") {
      const href = String(mark.attrs?.href ?? "#");
      const external = /^https?:\/\//.test(href);
      output = <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{output}</a>;
    }
  }
  return <>{output}</>;
}

function Node({ node }: { node: TipTapNode }) {
  const children = node.content?.map((child, index) => <Node key={index} node={child} />);
  switch (node.type) {
    case "text": return <Text text={node.text} marks={node.marks} />;
    case "paragraph": return <p>{children}</p>;
    case "heading": {
      const level = Number(node.attrs?.level ?? 2);
      if (level === 1) return <h2>{children}</h2>;
      if (level === 2) return <h2>{children}</h2>;
      if (level === 3) return <h3>{children}</h3>;
      return <h4>{children}</h4>;
    }
    case "bulletList": return <ul>{children}</ul>;
    case "orderedList": return <ol>{children}</ol>;
    case "listItem": return <li>{children}</li>;
    case "blockquote": return <blockquote>{children}</blockquote>;
    case "hardBreak": return <br />;
    case "horizontalRule": return <hr />;
    case "codeBlock": return <pre><code>{node.content?.map((item) => item.text).join("")}</code></pre>;
    case "image": {
      const src = String(node.attrs?.src ?? "");
      const alt = String(node.attrs?.alt ?? "");
      return src ? <figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={src} alt={alt} loading="lazy" />{alt ? <figcaption>{alt}</figcaption> : null}</figure> : null;
    }
    case "youtube": return <div className="hive-blog-video"><iframe src={String(node.attrs?.src ?? "")} title="YouTube video" loading="lazy" allowFullScreen /></div>;
    case "table": return <div className="hive-blog-table"><table><tbody>{children}</tbody></table></div>;
    case "tableRow": return <tr>{children}</tr>;
    case "tableHeader": return <th>{children}</th>;
    case "tableCell": return <td>{children}</td>;
    case "callout": return <aside className={`hive-blog-callout hive-blog-callout--${String(node.attrs?.color ?? "blue")}`}>{children}</aside>;
    case "cta": return <aside className="hive-blog-cta"><h2>{String(node.attrs?.title ?? "")}</h2><p>{String(node.attrs?.subtitle ?? "")}</p><a href={String(node.attrs?.href ?? "/contact/")}>{String(node.attrs?.label ?? "Get in touch")}</a></aside>;
    case "columns": return <div className="hive-blog-columns">{children}</div>;
    case "column": return <div>{children}</div>;
    case "accordion": return <div className="hive-blog-accordion">{children}</div>;
    case "accordionItem": return <details><summary>{String(node.attrs?.title ?? "Details")}</summary>{children}</details>;
    case "gallery": {
      const images = (node.attrs?.images ?? []) as Array<{ src: string; alt?: string }>;
      return <div className="hive-blog-gallery">{images.map((image, index) => /* eslint-disable-next-line @next/next/no-img-element */ <img key={`${image.src}-${index}`} src={image.src} alt={image.alt ?? ""} loading="lazy" />)}</div>;
    }
    case "beforeAfter": {
      const beforeSrc = String(node.attrs?.beforeSrc ?? "");
      const afterSrc = String(node.attrs?.afterSrc ?? "");
      return beforeSrc && afterSrc ? <BeforeAfterSlider before={{ src: beforeSrc, alt: String(node.attrs?.beforeAlt ?? "Before") }} after={{ src: afterSrc, alt: String(node.attrs?.afterAlt ?? "After") }} /> : null;
    }
    default: return children ? <>{children}</> : null;
  }
}

export function HiveTipTapRenderer({ content }: { content: TipTapDoc | string }) {
  if (typeof content === "string") {
    return content.includes("<")
      ? <div className="hive-blog-content" dangerouslySetInnerHTML={{ __html: content }} />
      : <div className="hive-blog-content">{content.split("\n").map((line, index) => <p key={index}>{line}</p>)}</div>;
  }
  if (!isTipTapDoc(content)) return null;
  return <div className="hive-blog-content">{content.content.map((node, index) => <Node key={index} node={node} />)}</div>;
}
