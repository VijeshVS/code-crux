"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/components/code-editor";
import { ComplexityAnalysis } from "@/components/complexity-analysis";
import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { getDetails } from "../../actions/analyze";

export default function AnalyzerPage() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const [loading, setLoading] = useState(false);

  const performAnalysis = async () => {
    setAnalysis("checking!!")
    setLoading(true);
    getDetails(code,localStorage.getItem('API_KEY') || "").then((res) => {
      setAnalysis(res);
      setLoading(false);
    });

    setActiveTab("analysis");
  };

  const analyzeCode = () => {
    performAnalysis();
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
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back
            </Link>
            <h1 className="text-lg md:text-xl font-bold">
              Advanced Complexity Analyzer
            </h1>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDark}>
            {isDark ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="code">
            <div className="space-y-4">
              <CodeEditor value={code} onChange={setCode} />
              <Button
                onClick={analyzeCode}
                disabled={!code.trim()}
                className="w-full md:w-auto"
              >
                Analyze Code
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="analysis">
            {analysis ? (
              loading ? (
                "Analyzing ... Please wait"
              ) : (
                <ComplexityAnalysis analysis={analysis} />
              )
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Analyze your code to see the detailed complexity breakdown
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
