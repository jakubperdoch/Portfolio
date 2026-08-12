// components/RichText/index.tsx
"use client";

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
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type NodeTypes = SerializedStyledTextNode | DefaultNodeTypes | SerializedBlockNode<CodeBlockProps>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

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
        className={cn("font-heading leading-tight font-bold", {
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

  // Custom list converters
  list: ({ node, nodesToJSX }) => {
    const ListTag = node.listType === "bullet" ? "ul" : "ol";
    return (
      <ListTag
        className={cn(
          "font-body mb-4 space-y-2",
          node.listType === "bullet" ? "list-inside list-disc" : "list-inside list-decimal"
        )}
      >
        {nodesToJSX({
          nodes: node.children,
          parent: node,
        })}
      </ListTag>
    );
  },

  listitem: ({ node, nodesToJSX }) => (
    <li className="text-base leading-relaxed md:text-lg">
      {nodesToJSX({
        nodes: node.children,
        parent: node,
      })}
    </li>
  ),

  blocks: {
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
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
      className={cn(
        "payload-richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "prose md:prose-md mx-auto": enableProse,
        },
        className
      )}
      {...rest}
    />
  );

  if (skipAnimation) {
    return content;
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants}>{content}</motion.div>
    </motion.div>
  );
}
