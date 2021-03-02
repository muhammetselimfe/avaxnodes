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
  }

  type Delegators {
    items: [Delegator]
    pagination: Pagination
    totalStaked: String
  }

  type Node {
    nodeID: ID
    txID: String
    startTime: String
    endTime: String
    stakeAmount: String
    potentialReward: String
    rewardOwner: RewardOwner
    delegators: Delegators
    isPartner: Boolean
    isSponsored: Boolean
    delegationFee: String
    uptime: String
    connected: Boolean
    country_code: String
    latitude: Float
    longitude: Float
    country_flag: String
    maxYield: Float
    totalStacked: Float
    leftToStack: Float
    stackedPercent: Float
  }

  type Stats {
    totalNodes: Int
    totalTransactions: Int
    totalProviders: Int
    totalDelegations: Int
    totalBlocks: Int
    totalParticipation: Float
  }

  input NodesFilter {
    filter: String
    freeSpace: String
    maxYield: String
    page: Int
    perPage: Int
    sorting: String
  }

  input NodeFilter {
    nodeID: ID!
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
    stats: Stats!
    nodes(filter: NodesFilter!): NodesResponse!
    node(filter: NodeFilter!): Node!
  }`
