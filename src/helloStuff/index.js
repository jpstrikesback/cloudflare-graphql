import { graphql, buildSchema } from "graphql";

addEventListener("fetch", event => {
  event.respondWith(handleGraphQLRequest(event));
});

// Stuff schema
// "{ getStuffById(id: "1") { id blob } }"
// "mutation: { stuffIt(id: "1", blob:"this is the right stuff") { id blob } }"
var schema = buildSchema(`
  type Stuff {
    id: String!,
    blob: String
  }

  type Mutation {
    putStuff(id: String!, blob: String): Stuff
  }

  type Query {
    getStuffById(id: String!): Stuff
  }
`);

var root = {
  putStuff: async (input) => {
    const { id, blob } = input
    const value = await NAMESPACE.put(id, blob)
    return { id: id, blob: value || blob }
  },
  getStuffById: async (input) => {
    const { id } = input
    const value = await NAMESPACE.get(id)
    return { id: id, blob: value }
  }
};

export default async function handleGraphQLRequest(event) {
  let gql = await event.request.text();
  let response = await graphql(schema, gql, root);
  return new Response(JSON.stringify(response));
}
