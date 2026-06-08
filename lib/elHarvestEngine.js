export function getElHarvestSignal({
  price,
  vwap,
  cloudColor,
  futureCloudSlope,
  cloudFloor,
  cloudCeiling,
  macdHistogram,
  rsi,
  volumeIncreasing,
  structure,
}) {
  let score = 0;
  const notes = [];

  // 1. Cloud = Primary Bias
  if (cloudColor === "green") {
    score += 25;
    notes.push("Green future cloud");
  }

  if (futureCloudSlope === "rising") {
    score += 25;
    notes.push("Rising cloud support");
  }

  if (price > cloudFloor) {
    score += 15;
    notes.push("Price holding above cloud floor");
  }

  // 2. VWAP Confirmation
  if (price > vwap) {
    score += 10;
    notes.push("Price above VWAP");
  }

  // 3. Structure
  if (structure === "higher-low" || structure === "reclaim") {
    score += 10;
    notes.push("Bullish structure confirmed");
  }

  if (structure === "failed-breakdown") {
    score += 15;
    notes.push("Failed breakdown into cloud support");
  }

  // 4. Momentum
  if (macdHistogram > 0) {
    score += 5;
    notes.push("MACD improving");
  }

  if (rsi >= 50 && rsi <= 70) {
    score += 5;
    notes.push("RSI healthy bullish range");
  }

  if (volumeIncreasing) {
    score += 5;
    notes.push("Volume confirming move");
  }

  let grade = "FLAT";
  let direction = "NO TRADE";
  let size = "0%";

  if (score >= 85) {
    grade = "A+";
    direction = "CALL";
    size = "100% allowed size";
  } else if (score >= 70) {
    grade = "A";
    direction = "CALL";
    size = "75% allowed size";
  } else if (score >= 55) {
    grade = "B+";
    direction = "CALL";
    size = "50% allowed size";
  } else if (score >= 40) {
    grade = "B";
    direction = "CALL WATCH";
    size = "25% allowed size";
  }

  return {
    score,
    grade,
    direction,
    size,
    notes,
    rules: {
      cloudPriority: "Cloud is primary bias engine",
      noShortRule: "Do not short rising green cloud without breakdown confirmation",
      failedBreakdownRule: "Failed breakdown into rising green cloud = B+ entry candidate",
      macdRule: "MACD confirms acceleration, not direction",
    },
  };
}
