"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AddNewInterview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobPosition, setPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperiences, setExperiences] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
   
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });
      
      const prompt = `Generate 5 technical interview questions for a ${jobPosition} position. The candidate has ${jobExperiences} years of experience and should be familiar with ${jobDesc}. Format as a numbered list.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      
      console.log(prompt);
      console.log(response);
      
      setIsOpen(false);
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      if (error.message?.includes('429')) {
        console.error("API quota exceeded. Please try again later or check your API limits.");
      } else if (error.message?.includes('401')) {
        console.error("Invalid API key. Please check your API key configuration.");
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-8 border-2 border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:shadow-lg hover:border-slate-300 cursor-pointer transition-all duration-300 group"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-slate-100 rounded-full group-hover:bg-slate-200 transition-colors">
            <Plus className="w-8 h-8 text-slate-600 group-hover:text-slate-800" />
          </div>
          <h2 className="font-semibold text-xl text-slate-700 group-hover:text-slate-900">
            Add New Interview
          </h2>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-xl shadow-xl border-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <DialogHeader className="space-y-4">
              <DialogTitle className="text-2xl font-bold text-slate-900">
                Generate Interview Questions
              </DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="jobRole" className="block text-sm font-semibold text-slate-700">
                        Job Role/Job position
                      </label>
                      <Input
                        id="jobRole"
                        name="jobRole"
                        placeholder="Ex. Frontend Developer"
                        required
                        value={jobPosition}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="jobDescription" className="block text-sm font-semibold text-slate-700">
                        Job Description/ Tech Stack
                      </label>
                      <Textarea
                        id="jobDescription"
                        name="jobDescription"
                        placeholder="Ex React, Angular, Node.js, MySQL"
                        required
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="experience" className="block text-sm font-semibold text-slate-700">
                        Years of Experience
                      </label>
                      <Input
                        id="experience"
                        name="experience"
                        placeholder="Ex. 5"
                        type="number"
                        min="0"
                        required
                        value={jobExperiences}
                        onChange={(e) => setExperiences(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-between mt-8 pt-6 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="px-6 py-2 text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {isLoading ? 'Generating...' : 'Generate Questions'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;