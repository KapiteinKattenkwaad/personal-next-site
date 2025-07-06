---
title: "What is MCP?"
date: "2024-06-01"
cover: "/assets/bh-darkmode.png"
intro: "MCP seems to be the new buzzword after AI. Let's find out what it is and how you can use it."
tags: ["frontend", "AI"]
order: 1
---

# MCP Servers: Your Design Tools Just Got Superpowers

If you’ve ever thought _“Why can’t my code talk to Figma like it talks to an API?”_, welcome to the wonderful world of **MCP servers** — where your design tools moonlight as programmable services.

## What’s an MCP Server?

MCP stands for **Model Control Plane**, but let’s be real:

> _It’s basically "turn your favorite app into a database" with fewer tears._

MCP servers let you query tools like Figma, Notion, and GitHub using structured data models — think GraphQL-ish, but for your design files. Suddenly, your “is this component even used anywhere?” question has an actual answer.

## Example: Using Figma as an MCP Server in Cursor

Let’s say you’re using [Cursor](https://www.cursor.so/) and want to query your Figma file like a backend dev who’s had one too many coffees. Here’s a code snippet:

```ts
const figma = mcp.load("figma", {
  token: process.env.FIGMA_API_TOKEN,
  fileId: "abc123xyz456", // Replace with your Figma file ID
});

// Fetch all components with "Button" in the name
const buttons = await figma.query("components").filter(c => c.name.includes("Button"));
console.log(buttons);
```

This turns your design system into something you can loop through, search, and automate.

No more "Can you export that again?" Slacks.

---

## Why It’s Cool

- Your dev & design sources of truth? United at last.
- Query and automate without dealing with brittle APIs.
- Build your own custom workflows, docs, or sync tools.
- Makes design systems feel less like mythical beasts.

---

## Learn More

- [Cursor Docs on MCP](https://docs.cursor.so/docs/mcp/overview)
- [Figma Developer API](https://www.figma.com/developers/api)
- [Notion API](https://developers.notion.com/)
- [GitHub REST API](https://docs.github.com/en/rest)

---

## TL;DR

MCP servers let you use your tools like APIs, query design files like databases, and generally feel like a wizard.

Figma? More like **Fig-magic**. 🪄

---

Happy querying 👋


