"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/components/code-editor";
import { TopicBadge } from "@/components/topic-badge";
import {
  MoonIcon,
  SunIcon,
  Loader2,
  ArrowLeft,
  Code2,
  LineChart,
} from "lucide-react";
import type { CodeAnalysis } from "@/types/analysis";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getHistory } from "../../actions/analyze";

export default function CodeAnalyzerPage() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("code");

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    // Mock analysis - in a real implementation, this would call an API
    const res = await getHistory(code, localStorage.getItem("API_KEY") || "");
    // Example analysis result
    setAnalysis(res);
    setIsAnalyzing(false);
    setActiveTab("analysis");
  };

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? "dark" : ""}`}>
      <div className="container mx-auto p-4 md:p-6 lg:p-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Code Analyzer</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDark}>
            {isDark ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Code Editor
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="flex-1 mt-0">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Your Code</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div className="flex-1 min-h-[500px]">
                  <CodeEditor value={code} onChange={setCode} height="100vh" />
                </div>
                <Button
                  onClick={analyzeCode}
                  disabled={!code.trim() || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Code"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="flex-1 mt-0">
            {analysis ? (
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-6 pr-4">
                  {/* Overview Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <TopicBadge
                          topic={analysis.topic}
                          category={analysis.category}
                        />
                        <p className="text-sm text-muted-foreground">
                          {analysis.description}
                        </p>
                      </div>

                      {/* Complexity Section */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <h3 className="font-semibold">Time Complexity</h3>
                              <div className="font-mono text-xl bg-background p-3 rounded-md text-center">
                                {analysis.timeComplexity}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <h3 className="font-semibold">
                                Space Complexity
                              </h3>
                              <div className="font-mono text-xl bg-background p-3 rounded-md text-center">
                                {analysis.spaceComplexity}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step by Step Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Step by Step Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {analysis.steps.map((step, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-muted-foreground">
                                Lines {step.lineNumbers[0]}-
                                {step.lineNumbers[1]}
                              </span>
                            </div>
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                              <code className="text-sm">{step.code}</code>
                            </pre>
                            <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                              {step.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Optimizations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Optimization Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {analysis.optimizations.map((optimization, index) => (
                          <div key={index} className="space-y-4">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {optimization.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {optimization.description}
                              </p>
                            </div>

                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Current Implementation:
                                </p>
                                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                                  <code className="text-sm">
                                    {optimization.currentCode}
                                  </code>
                                </pre>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Suggested Implementation:
                                </p>
                                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                                  <code className="text-sm">
                                    {optimization.suggestedCode}
                                  </code>
                                </pre>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                              <span>
                                Improvement: {optimization.improvement}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            ) : (
              <div className="h-[500px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <div className="space-y-2">
                        <p className="font-medium">Analyzing your code...</p>
                        <p className="text-sm">This might take a few seconds</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-medium">No analysis available</p>
                      <p className="text-sm">
                        Switch to the Code Editor tab to analyze your code
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
