export const elHarvestValidationModel = {
  version: "EL Harvest Cloud Authority v1.0",

  cloudIndicator: {
    type: "Ichimoku Cloud",
    settings: {
      tenkan: 9,
      kijun: 26,
      senkouSpanB: 52,
      displacement: 26,
    },
    primaryTimeframe: "5m",
    confirmationTimeframes: ["1m", "15m"],
    bullishDefinition: {
      priceAboveCloud: true,
      futureCloudGreen: true,
      cloudSlopeUp: true,
    },
    bearishDefinition: {
      priceBelowCloud: true,
      futureCloudRed: true,
      cloudSlopeDown: true,
    },
  },

  tradeUniverse: {
    primaryTickers: ["QQQ", "SPY"],
    allowedDirections: ["CALL", "PUT"],
    defaultTimeframe: "5m",
  },

  coreWeights: {
    cloud: 45,
    vwap: 20,
    volume: 15,
    macd: 10,
    spyAgreement: 5,
    rsi: 3,
    threeCandles: 2,
  },

  adaptiveRules: {
    minimumTradesBeforeAdjustment: 50,
    adjustmentIntervalTrades: 25,
    maxSingleFactorWeight: 50,
    minSingleFactorWeight: 2,
    adjustByDirection: true,
    adjustByMarketRegime: true,
    protectCloudAuthority: true,
  },

  marketRegimes: {
    trendDay: {
      cloudDominant: true,
      rsiCanStayOverboughtOrOversold: true,
      action: "FOLLOW_CLOUD_DIRECTION",
    },
    counterTrendBounce: {
      cloudDominantTrend: true,
      macdRsiAllowScalp: true,
      positionSize: "reduced",
      action: "ALLOW_COUNTER_TREND_SCALP_ONLY",
    },
    cloudTest: {
      priceAtCloudResistance: true,
      action: "WAIT_FOR_BREAK_OR_REJECTION",
    },
    range: {
      requiresFullConfirmation: true,
      action: "WAIT",
    },
  },

  aggressivePutRule: {
    cloud: "bearish",
    priceVsVWAP: "below",
    macd: "negative",
    rsiMax: 45,
    action: "ALLOW_PUT_ENTRY",
  },

  aggressiveCallRule: {
    cloud: "bullish",
    priceVsVWAP: "above",
    macd: "positive",
    rsiMin: 55,
    action: "ALLOW_CALL_ENTRY",
  },

  cloudOverrideRule: {
    priceBelowCloud: true,
    futureCloudBearish: true,
    cloudSlopeDown: true,
    lowerHighs: true,
    lowerLows: true,
    action: "PUT_BIAS_OVERRIDE",
  },

  failedBreakout: {
    touchCloudResistance: true,
    closeBackBelowResistance: true,
    action: "ENTER_PUT_BIAS",
  },

  cloudRejectionRule: {
    priceTouchesCloudResistance: true,
    reversalCandleAppears: true,
    action: "BLOCK_NEW_CALLS",
  },

  lateDayCloudRejection: {
    timeWindow: "15:00-15:50",
    priceFailsCloudReclaim: true,
    redCandleAppears: true,
    action: "ENTER_PUT_BIAS",
  },

  failureProtection: {
    breakoutFails: true,
    loseCloudSupport: true,
    rsiBelow50: true,
    macdNegative: true,
    action: "EXIT_ALL_CALLS",
  },

  entryEngine: {
    mode: "LADDER",
    maxEntries: 4,

    entry1: {
      name: "Cloud Scout",
      allocation: 25,
      requirements: {
        cloudBiasConfirmed: true,
        priceVsVWAPConfirmed: true,
        macdImproving: true,
      },
    },

    entry2: {
      name: "Trend Confirmation",
      allocation: 25,
      requirements: {
        cloudDirectionConfirmed: true,
        priceAboveOrBelowVWAP: true,
        volumeIncreasing: true,
      },
    },

    entry3: {
      name: "Pullback Hold",
      allocation: 25,
      requirements: {
        pullbackToCloudOrVWAP: true,
        holdBiasLevel: true,
        macdSupportsDirection: true,
      },
    },

    entry4: {
      name: "Breakout Expansion",
      allocation: 25,
      requirements: {
        breakPreviousHighOrLow: true,
        volumeExpansion: true,
        cloudSupportsDirection: true,
      },
    },
  },

  riskRules: {
    maxRiskPerTradePercent: 2,
    maxDailyLossPercent: 5,
    blockAveragingDown0DTE: true,
    requireStopBeforeEntry: true,
    requireReclaimBeforeAddingSize: true,
  },

  noTradeRules: {
    insideCloud: true,
    conflictingQQQSPY: true,
    lowVolumeChop: true,
    midRangeIndecision: true,
    emotionalEntry: true,
    noStopDefined: true,
  },

  exitRules: {
    target1ScaleOut: 50,
    target2ScaleOut: 25,
    runnerPercent: 25,
    moveStopToBreakEvenAfterTarget1: true,
    exitOverridesNewEntry: true,
  },

  brokerRules: {
    defaultMode: "READ_ONLY",
    paperTradingFirst: true,
    liveExecutionEnabled: false,
    humanApprovalRequired: true,
    supportedBrokers: ["Robinhood", "IBKR", "Tradier"],
  },

  ipoMonitor: {
    enabled: true,
    watchlist: ["SpaceX"],
    defaultAllocationAmount: 1000,
    defaultIpoPrice: 135,
    estimatedSharesFormula: "allocationAmount / ipoPrice",
    requireOfficialFilingVerification: true,
  },
aggressiveCloudEntry: {
  enabled: true,
  name: "Aggressive Cloud Entry",

  callRule: {
    cloud: "bullish",
    priceAboveCloudSupport: true,
    rsiAbove: 50,
    macdPositiveOrImproving: true,
    supportHeldTwice: true,
    reclaimKeyLevel: true,
    action: "EARLY_CALL_ENTRY",
    confidence: 70,
    positionSize: "HALF_SIZE",
    stopRule: "Below last support hold",
  },

  putRule: {
    cloud: "bearish",
    priceBelowCloudResistance: true,
    rsiBelow: 50,
    macdNegativeOrWeakening: true,
    resistanceRejectedTwice: true,
    loseKeyLevel: true,
    action: "EARLY_PUT_ENTRY",
    confidence: 70,
    positionSize: "HALF_SIZE",
    stopRule: "Above last rejection level",
  },

  protection: {
    neverFullSizeOnEarlyEntry: true,
    requireStopBeforeEntry: true,
    exitIfKeyLevelFails: true,
    upgradeToFullConfirmationOnlyAfterBreakout: true,
  },

  exampleFromToday: {
    ticker: "QQQ",
    supportHeld: 699.80,
    reclaimLevel: 701.48,
    targetReached: 705.77,
    lesson: "Cloud projection plus support reclaim should allow half-size early CALL before full breakout.",
  },
},
  finalRule: {
    cloudIsPrimaryBiasEngine: true,
    macdAndRsiConfirmMomentum: true,
    vwapConfirmsLocation: true,
    volumeConfirmsParticipation: true,
    doNotTreatRsiAsPrimaryBlockerOnTrendDays: true,
  },
};
