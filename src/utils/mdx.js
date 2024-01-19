export const convertStateToMDX = state => {
  const {
    title,
    publishedAt,
    updatedAt,
    description,
    image,
    author,
    tags,
    content
  } = state

  const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : []

  const frontmatter = `---
title: "${title}"
publishedAt: "${publishedAt}"
updatedAt: "${updatedAt}"
description: "${description}"
image: "${image}"
author: "${author}"
tags:
${tagsArray.map(tag => `- ${tag}`).join('\n')}
---`

  return `${frontmatter}\n\n${content}`
}
