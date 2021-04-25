import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Delegator {
    nodeID: String
    txID: String
    startTime: Float
    endTime: Float
    stakeAmount: Float
    rewardOwner: String
    potentialReward: Float
  }

  type Delegators {
    items: [Delegator]
    pagination: Pagination
    totalStaked: Float
  }

  type Node {
    nodeID: ID
    txID: String
    startTime: Float
    endTime: Float
    stakeAmount: Float
    potentialReward: Float
    rewardOwner: String
    delegators: Delegators
    isPartner: Boolean
    isSponsored: Boolean
    delegationFee: Float
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
    leftToStackPercent: Float
    networkShare: Float
    grossRewards: Float
    netRewards: Float
    uptimePercent: String
    version: String
    publicIP: String
    country: String
    city: String
  }

  type Stats {
    totalNodes: Int
    totalTransactions: Int
    totalProviders: Int
    totalDelegations: Int
    totalBlocks: Int
    totalParticipation: Float
  }

  type NotifierStats {
    users: Int
    total: Int
  }

  input NodesFilter {
    filter: String
    freeSpace: Int
    maxYield: Float
    page: Int
    perPage: Int
    sorting: String
  }

  input NodeFilter {
    nodeID: ID!
    page: Int
    perPage: Int
    sorting: String
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
    notifierStats: NotifierStats!
    nodes(filter: NodesFilter!): NodesResponse!
    node(filter: NodeFilter!): Node!
  }`
