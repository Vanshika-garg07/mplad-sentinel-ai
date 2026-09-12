"use client";

import { useEffect, useState } from "react";

type Analysis = {
  projectId?: string;
  projectName?: string;
  score?: number;
  level?: string;
  signals?: unknown[];
  recommendedAction?: string;
};

export default function LiveNotification() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("mplad-sentinel-latest-analysis");
        if (raw) setAnalysis(JSON.parse(raw));
      } catch {
        setAnalysis(null);
      }
    };

    load();

    const onUpdate = () => load();
    window.addEventListener("sentinel-analysis", onUpdate);

    return () => {
      window.removeEventListener("sentinel-analysis", onUpdate);
    };
  }, []);

  if (!analysis) {
    return (
      <div className="recommend">
        <b>Alert workflow</b>
        <p>Run Sentinel AI to generate a live risk assessment.</p>
      </div>
    );
  }

  const signalCount = Array.isArray(analysis.signals)
    ? analysis.signals.length
    : 0;

  return (
    <div>
      <div className="alert-live">
        <div>
          <span className="eyebrow">LIVE SENTINEL ALERT</span>
          <h3>Critical delivery risk detected</h3>
          <p>
            {analysis.projectId} · {analysis.projectName}
          </p>
        </div>

        <div className="alert-score">
          <strong>{analysis.score ?? "—"}</strong>
          <span>/100 · {analysis.level ?? "Risk"}</span>
        </div>
      </div>

      <div className="recommend">
        <b>{signalCount} evidence signals analyzed</b>
        <p>
          Sentinel AI identified implementation signals requiring authorized
          human review.
        </p>
        <p>
          <strong>Recommended action:</strong>{" "}
          {analysis.recommendedAction ||
            "Initiate field verification and review supporting evidence."}
        </p>
      </div>
    </div>
  );
}
