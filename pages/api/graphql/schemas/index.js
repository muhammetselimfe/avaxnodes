import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Delegator {
    nodeID: String
    txID: String
    startTime: String
    endTime: String
    stakeAmount: String
    rewardOwner: RewardOwner
    potentialReward: String
  }

  type RewardOwner {
    locktime: String
    threshold: String
    addresses: [String]
    potentialReward: String
  }

  type Node {
    nodeID: ID
    txID: String
    startTime: String
    endTime: String
    stakeAmount: String
    rewardOwner: RewardOwner
    delegators: [Delegator]
    isPartner: Boolean
    isSponsored: Boolean
    delegationFee: String
    uptime: String
    connected: Boolean
  }

  input NodeFilter {
    filter: String
    freeSpace: String
    maxYield: String
    page: Int
    perPage: Int
  }

  type Pagination {
    page: Int
    perPage: Int
    count: Int
  }

  type NodesResponse {
    items: [Node]
    pagination: Pagination
  }

  type Query {
    nodes(filter: NodeFilter!): NodesResponse!
    node(nodeID: ID!): Node!
  }`
