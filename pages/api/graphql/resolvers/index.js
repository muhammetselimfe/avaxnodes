import node from "./node";
import nodes from "./nodes";
import stats from "./stats";
import notifierStats from "./notifierStats";

export const resolvers = {
  Query: {
    stats: stats,
    nodes: nodes,
    node: node,
    notifierStats: notifierStats,
  }
};
