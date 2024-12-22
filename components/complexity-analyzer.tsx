"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Box, MoonIcon, SunIcon } from "lucide-react";
import { analyze } from "@/app/actions/analyze";

export default function ComplexityAnalyzer() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState<{
    time: string;
    timeExplanation: string;
    space: string;
    spaceExplanation: string;
  } | null>(null);
  const [isDark, setIsDark] = useState(false);

  const analyzeCode = async () => {
    analyze(code).then((res) => {
      setAnalysis(res);
    });
  };

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors ${
        isDark ? "dark" : ""
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Code Complexity Analyzer
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleDark}>
            {isDark ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Code Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Your Code</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="font-mono min-h-[200px] md:min-h-[300px]"
            />
            <Button
              className="mt-4 w-full md:w-auto"
              onClick={analyzeCode}
              disabled={!code.trim()}
            >
              Analyze Complexity
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Time Complexity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Complexity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono font-bold mb-2">
                  {analysis.time}
                </div>
                <p className="text-muted-foreground">
                  {analysis.timeExplanation}
                </p>
              </CardContent>
            </Card>

            {/* Space Complexity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Box className="h-5 w-5" />
                  Space Complexity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono font-bold mb-2">
                  {analysis.space}
                </div>
                <p className="text-muted-foreground">
                  {analysis.spaceExplanation}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
