import node from "./node";
import nodes from "./nodes";
import stats from "./stats";

export const resolvers = {
  Query: {
    stats: stats,
    nodes: nodes,
    node: node
  }
};
