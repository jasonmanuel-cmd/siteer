import { estimateLoss } from "@/lib/scan/money";

describe("estimateLoss", () => {
    test("uses default values when no inputs provided", () => {
        const result = estimateLoss({ overallScore: 85 });
        expect(result.visitors).toBe(800);
        expect(result.conv).toBe(0.04);
        expect(result.avg).toBe(250);
    });

    test("grade A (score >= 85) uses 10% loss", () => {
        const result = estimateLoss({ overallScore: 90 });
        expect(result.lossPct).toBe(0.1);
    });

    test("grade B/C (score 70-84) uses 25% loss", () => {
        const result = estimateLoss({ overallScore: 75 });
        expect(result.lossPct).toBe(0.25);
    });

    test("grade D (score 55-69) uses 40% loss", () => {
        const result = estimateLoss({ overallScore: 60 });
        expect(result.lossPct).toBe(0.4);
    });

    test("grade F (score < 55) uses 55% loss", () => {
        const result = estimateLoss({ overallScore: 40 });
        expect(result.lossPct).toBe(0.55);
    });

    test("low estimate is 70% of mid-point loss", () => {
        const result = estimateLoss({ overallScore: 85, estMonthlyVisitors: 1000, estConvRate: 0.05, estAvgValue: 100 });
        const baseline = 1000 * 0.05 * 100; // 5000
        const expectedLow = Math.round((baseline * 0.1 * 0.7) / 10) * 10;
        expect(result.estMonthlyLossLow).toBe(expectedLow);
    });

    test("high estimate is 130% of mid-point loss", () => {
        const result = estimateLoss({ overallScore: 85, estMonthlyVisitors: 1000, estConvRate: 0.05, estAvgValue: 100 });
        const baseline = 1000 * 0.05 * 100;
        const expectedHigh = Math.round((baseline * 0.1 * 1.3) / 10) * 10;
        expect(result.estMonthlyLossHigh).toBe(expectedHigh);
    });

    test("custom inputs override defaults", () => {
        const result = estimateLoss({
            overallScore: 75,
            estMonthlyVisitors: 5000,
            estConvRate: 0.02,
            estAvgValue: 500,
        });
        expect(result.visitors).toBe(5000);
        expect(result.conv).toBe(0.02);
        expect(result.avg).toBe(500);
    });

    test("estimates are rounded to nearest 10", () => {
        const result = estimateLoss({ overallScore: 75, estMonthlyVisitors: 333, estConvRate: 0.033, estAvgValue: 77 });
        expect(result.estMonthlyLossLow % 10).toBe(0);
        expect(result.estMonthlyLossHigh % 10).toBe(0);
    });

    test("zero visitors produces zero loss", () => {
        const result = estimateLoss({ overallScore: 40, estMonthlyVisitors: 0, estConvRate: 0.05, estAvgValue: 100 });
        expect(result.estMonthlyLossLow).toBe(0);
        expect(result.estMonthlyLossHigh).toBe(0);
    });

    test("high score at 85 boundary uses 10% loss", () => {
        const result = estimateLoss({ overallScore: 85 });
        expect(result.lossPct).toBe(0.1);
    });

    test("score of 70 uses 25% loss (boundary)", () => {
        const result = estimateLoss({ overallScore: 70 });
        expect(result.lossPct).toBe(0.25);
    });
});
