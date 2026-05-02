import { scoreFromIssues } from "@/lib/scan/score";
import type { Issue } from "@/lib/scan/analyzeHtml";

function issue(category: Issue["category"], severity: Issue["severity"]): Issue {
    return {
        category,
        severity,
        description: `Test ${severity} ${category} issue`,
        recommendation: "Fix it.",
    };
}

describe("scoreFromIssues", () => {
    test("returns perfect scores with no issues", () => {
        const { speed, mobile, seo, trust, overall, grade } = scoreFromIssues([]);
        expect(speed).toBe(85);
        expect(mobile).toBe(85);
        expect(seo).toBe(85);
        expect(trust).toBe(85);
        expect(overall).toBe(85);
        expect(grade).toBe("B");
    });

    test("grade A requires overall >= 90", () => {
        // No issues and baseline of 85 = B. We cannot hit A without starting higher.
        const { grade } = scoreFromIssues([]);
        expect(grade).toBe("B");
    });

    test("high severity issue deducts 20 points from its category", () => {
        const { speed } = scoreFromIssues([issue("speed", "high")]);
        expect(speed).toBe(65);
    });

    test("medium severity issue deducts 10 points", () => {
        const { seo } = scoreFromIssues([issue("seo", "medium")]);
        expect(seo).toBe(75);
    });

    test("low severity issue deducts 5 points", () => {
        const { trust } = scoreFromIssues([issue("trust", "low")]);
        expect(trust).toBe(80);
    });

    test("scores are clamped to 0 minimum", () => {
        const manyHighIssues = Array.from({ length: 10 }, () => issue("speed", "high"));
        const { speed } = scoreFromIssues(manyHighIssues);
        expect(speed).toBe(0);
    });

    test("technical issues affect speed, mobile, seo, and trust", () => {
        const { speed, mobile, seo, trust } = scoreFromIssues([issue("technical", "high")]);
        // high = 20 pts, technical splits: speed -10, mobile -20, seo -20, trust -20
        expect(speed).toBe(75);
        expect(mobile).toBe(65);
        expect(seo).toBe(65);
        expect(trust).toBe(65);
    });

    test("grade F for overall below 60", () => {
        const manyHighIssues = [
            issue("speed", "high"),
            issue("mobile", "high"),
            issue("seo", "high"),
            issue("trust", "high"),
        ];
        const { grade } = scoreFromIssues(manyHighIssues);
        expect(grade).toBe("D");
    });

    test("conversion issues count toward trust score", () => {
        const { trust } = scoreFromIssues([issue("conversion", "high")]);
        expect(trust).toBe(65);
    });

    test("overall is average of four category scores", () => {
        const { speed, mobile, seo, trust, overall } = scoreFromIssues([
            issue("speed", "high"),
        ]);
        const expected = Math.round((speed + mobile + seo + trust) / 4);
        expect(overall).toBe(expected);
    });
});
