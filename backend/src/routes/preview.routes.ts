import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { generatePreview } from "../utils";
import { escapeHtml, generateOGImageUrl } from "../previewUtils";

const SITE_URL = "https://bytewrite.yashguptaiiit.in";

const preview = new Hono<{
  Bindings: {
    ACCELERATE_URL: string;
  };
}>();

preview.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.ACCELERATE_URL,
  }).$extends(withAccelerate());

  try {
    const postId = c.req.param("id");
    const blog = await prisma.post.findFirst({
      where: {
        id: postId,
        isDeleted: false,
      },
      select: {
        id: true,
        title: true,
        content: true,
        publishedate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!blog) {
      return c.text("Blog not found", 404);
    }

    const previewImageUrl = generateOGImageUrl();
    const blogUrl = `${SITE_URL}/blog/${blog.id}`;
    const shareUrl = `${SITE_URL}/share/blog/${blog.id}`;

    let description = "Read this amazing blog on ByteWrite";
    try {
      description = generatePreview(blog.content);
    } catch {
      // Keep default description
    }

    const html = `<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(blog.title)} - ByteWrite</title>

    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(blog.title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="${previewImageUrl}">
    <meta property="og:image:secure_url" content="${previewImageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/png">
    <meta property="og:url" content="${shareUrl}">
    <meta property="og:site_name" content="ByteWrite">
    <meta property="og:locale" content="en_US">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(blog.title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${previewImageUrl}">

    <meta property="article:published_time" content="${blog.publishedate.toISOString()}">
    <meta property="article:author" content="${escapeHtml(blog.author.name || "ByteWrite")}">

    <meta name="description" content="${escapeHtml(description)}">
    <meta name="author" content="${escapeHtml(blog.author.name || "ByteWrite")}">
    <meta name="robots" content="index, follow">
    <script>window.location.replace("${blogUrl}");</script>
</head>
<body>
    <h1>${escapeHtml(blog.title)}</h1>
    <p>${escapeHtml(description)}</p>
    <p><a href="${blogUrl}">Read full article on ByteWrite</a></p>
</body>
</html>`;

    return c.html(html, 200, {
      "Cache-Control": "public, max-age=3600",
    });
  } catch (e) {
    console.log(e);
    return c.text("Error generating preview", 500);
  }
});

export default preview;
