"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Box, ArrowRight } from "lucide-react";

type AnalysisStep = {
  step: string;
  complexity: string;
  explanation: string;
};

type Analysis = {
  final_time_complexity: string;
  time_steps: AnalysisStep[];
  final_time_complexity_explanation: string;
  final_space_complexity: string;
  space_steps: AnalysisStep[];
  final_space_complexity_explanation: string;
  space_complexity_curve_type: string,
  time_complexity_curve_type: string,
};

interface AnalysisProps {
  analysis: Analysis;
}

export function ComplexityAnalysis({ analysis }: AnalysisProps) {
  return (
    <div className="space-y-8">
      {/* Time Complexity Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Complexity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {analysis.final_time_complexity}
              </h3>
              <p className="text-sm text-muted-foreground">
                Final Time Complexity
              </p>
              <p className="text-base font-semibold text-muted-foreground">
                Curve : {analysis.time_complexity_curve_type}
              </p>
            </div>
            <Separator />
            <div className="p-6 space-y-4">
              <h4 className="font-semibold">Step-by-Step Breakdown</h4>
              <div className="space-y-4">
                {analysis.time_steps.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-muted p-2 rounded-md flex-1">
                        {step.step}
                      </div>
                      <ArrowRight className="h-4 w-4" />
                      <div className="font-mono font-bold">
                        {step.complexity}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground pl-4 border-l-2">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="p-6">
              <h4 className="font-semibold">Final Explanation</h4>
              <p className="text-muted-foreground">
                {analysis.final_time_complexity_explanation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Space Complexity Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="h-5 w-5" />
            Space Complexity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {analysis.final_space_complexity}
              </h3>
              <p className="text-sm text-muted-foreground">
                Final Space Complexity
              </p>
              <p className="text-base font-semibold text-muted-foreground">
                Curve : {analysis.space_complexity_curve_type}
              </p>
            </div>
            <Separator />
            <div className="p-6 space-y-4">
              <h4 className="font-semibold">Step-by-Step Breakdown</h4>
              <div className="space-y-4">
                {analysis.space_steps.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-muted p-2 rounded-md flex-1">
                        {step.step}
                      </div>
                      <ArrowRight className="h-4 w-4" />
                      <div className="font-mono font-bold">
                        {step.complexity}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground pl-4 border-l-2">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="p-6">
              <h4 className="font-semibold">Final Explanation</h4>
              <p className="text-muted-foreground">
                {analysis.final_space_complexity_explanation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
