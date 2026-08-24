// components/RichText/index.tsx
import {
  DefaultNodeTypes,
  type DefaultTypedEditorState,
  SerializedBlockNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";

import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedStyledTextNode } from "@/fields/nodes/StyledTextNode";

import { CodeBlock, CodeBlockProps } from "@/blocks/Code/Component";

import { textConverter } from "@/components/RichText/textConverter";
import { Reveal } from "@/components/RichText/Reveal";
import { cn } from "@/lib/utils";

type NodeTypes = SerializedStyledTextNode | DefaultNodeTypes | SerializedBlockNode<CodeBlockProps>;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...textConverter,
  ...LinkJSXConverter({ internalDocToHref }),

  heading: ({ node, nodesToJSX }) => {
    const HeadingTag = node.tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    return (
      <HeadingTag
        className={cn("font-heading scroll-mt-24 leading-tight font-bold", {
          "text-5xl md:text-6xl": HeadingTag === "h1",
          "text-4xl md:text-5xl": HeadingTag === "h2",
          "text-3xl md:text-4xl": HeadingTag === "h3",
          "text-2xl md:text-3xl": HeadingTag === "h4",
          "text-xl md:text-2xl": HeadingTag === "h5",
          "text-lg md:text-xl": HeadingTag === "h6",
        })}
      >
        {nodesToJSX({
          nodes: node.children,
          parent: node,
        })}
      </HeadingTag>
    );
  },

  paragraph: ({ node, nodesToJSX }) => (
    <p className="font-body text-foreground/80 text-base leading-relaxed md:text-lg">
      {nodesToJSX({
        nodes: node.children,
        parent: node,
      })}
    </p>
  ),

  list: ({ node, nodesToJSX }) => {
    const isBullet = node.listType === "bullet";
    const ListTag = isBullet ? "ul" : "ol";

    return (
      <ListTag
        // `list-outside` (the default) is what keeps wrapped lines and nested
        // levels aligned — `list-inside` reflows them under the marker.
        className={cn(
          "font-body text-foreground/80 space-y-2 pl-6",
          isBullet ? "list-disc" : "list-decimal"
        )}
        start={!isBullet && node.start && node.start !== 1 ? node.start : undefined}
      >
        {nodesToJSX({
          nodes: node.children,
          parent: node,
        })}
      </ListTag>
    );
  },

  listitem: ({ node, nodesToJSX }) => {
    // A list item that only wraps a deeper list should not draw its own marker.
    const hasNestedList = node.children.some((child) => child.type === "list");

    return (
      <li
        value={node.value}
        className={cn("text-base leading-relaxed md:text-lg", hasNestedList && "list-none")}
      >
        {nodesToJSX({
          nodes: node.children,
          parent: node,
        })}
      </li>
    );
  },

  quote: ({ node, nodesToJSX }) => (
    <blockquote className="font-body text-foreground/75 text-base leading-relaxed md:text-lg">
      {nodesToJSX({
        nodes: node.children,
        parent: node,
      })}
    </blockquote>
  ),

  horizontalrule: () => <hr />,

  blocks: {
    code: ({ node }) => <CodeBlock {...node.fields} />,
  },
});

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
  skipAnimation?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    skipAnimation = false,
    ...rest
  } = props;

  const content = (
    <ConvertRichText
      converters={jsxConverters}
      // Nested lists already indent through their own padding — letting the
      // node `indent` add another 40px on top double-indents every sub-level.
      disableIndent={["list", "listitem"]}
      className={cn(
        // `payload-richtext` carries the element-level typography that the
        // converters don't set (nested markers, blockquote rule, inline code).
        "payload-richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto max-w-[70ch]": enableProse,
        },
        className
      )}
      {...rest}
    />
  );

  if (skipAnimation) {
    return content;
  }

  return <Reveal>{content}</Reveal>;
}
