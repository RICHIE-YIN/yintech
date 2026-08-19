export const automationOsPricing = {
  standaloneSetup: 4900,
  standaloneMonthly: 1400,
  osSetup: 2500,
  osMonthly: 700,
  standaloneFirstYear: 21700,
  osFirstYear: 10900,
  setupSavings: 2400,
  monthlySavings: 700,
  firstYearSavings: 10800,
} as const;

export function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
