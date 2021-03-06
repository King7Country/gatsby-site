/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const response = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  response.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      path: `/news/${edge.node.slug}`,
      component: path.resolve("./src/templates/news-article.js"),
      context: {
        slug: edge.node.slug,
      },
    })
  })
}



// const path = require('path')
//
// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//
//   return new Promise((resolve, reject) => {
//     const newsArticle = path.resolve('./src/templates/news-article.js')
//     resolve(
//       graphql(
//         `
//           {
//             allContentfulBlogPost {
//               edges {
//                 node {
//                   title
//                   slug
//                 }
//               }
//             }
//           }
//           `
//       ).then(result => {
//         if (result.errors) {
//           console.log(result.errors)
//           reject(result.errors)
//         }
//
//         const articles = result.data.allContentfulBlogPost.edges
//         articles.forEach((article, index) => {
//           createPage({
//             path: `/news/${article.node.slug}/`,
//             component: newsArticle,
//             context: {
//               slug: article.node.slug
//             },
//           })
//         })
//       })
//     )
//   })
// }
