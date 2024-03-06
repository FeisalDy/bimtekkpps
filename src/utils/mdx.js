export const convertStateToMDX = state => {
  const {
    title,
    publishedAt,
    updatedAt,
    description,
    image,
    author,
    tags,
    content,
    editImage
  } = state

  const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : []
  const selectedImage = editImage || image.filePath.replace('../public', '../../public')

  const frontmatter = `---
title: "${title}"
publishedAt: "${publishedAt}"
updatedAt: "${updatedAt}"
description: "${description}"
image: "${selectedImage}"
author: "${author}"
tags:
${tagsArray.map(tag => `- ${tag}`).join('\n')}
---`

  return `${frontmatter}\n\n${content}`
}

