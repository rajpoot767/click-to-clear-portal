
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface SurveyQuestion {
  id: string;
  question: string;
  type: "radio" | "checkbox" | "text";
  options?: string[];
  required: boolean;
}

interface ArticleSurveyProps {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
}

const ArticleSurvey = ({ id, title, description, questions }: ArticleSurveyProps) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckboxChange = (questionId: string, value: string) => {
    const currentValues = answers[questionId] || [];
    
    if (currentValues.includes(value)) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: currentValues.filter((v: string) => v !== value)
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: [...currentValues, value]
      }));
    }
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const validateAnswers = () => {
    for (const question of questions) {
      if (question.required) {
        const answer = answers[question.id];
        
        if (!answer || 
            (Array.isArray(answer) && answer.length === 0) ||
            (typeof answer === 'string' && answer.trim() === '')) {
          toast({
            title: "Please complete all required questions",
            description: `"${question.question}" is required`,
            variant: "destructive"
          });
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateAnswers()) return;
    
    // In a real app, this would submit to an API
    console.log("Survey answers:", answers);
    
    setSubmitted(true);
    toast({
      title: "Survey submitted",
      description: "Thank you for your feedback!",
    });
  };

  if (submitted) {
    return (
      <Card className="my-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <h3 className="text-lg font-medium mb-2">Thank you for your feedback!</h3>
            <p className="text-gray-500">Your responses have been recorded.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-2">
              <h3 className="font-medium">
                {question.question} 
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              
              {question.type === "radio" && question.options && (
                <RadioGroup 
                  value={answers[question.id] || ""} 
                  onValueChange={(value) => handleRadioChange(question.id, value)}
                >
                  {question.options.map((option, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${question.id}-option-${i}`} />
                      <Label htmlFor={`q${question.id}-option-${i}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {question.type === "checkbox" && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, i) => {
                    const isChecked = (answers[question.id] || []).includes(option);
                    return (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`q${question.id}-option-${i}`} 
                          checked={isChecked}
                          onCheckedChange={() => handleCheckboxChange(question.id, option)}
                        />
                        <Label htmlFor={`q${question.id}-option-${i}`}>{option}</Label>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {question.type === "text" && (
                <Textarea 
                  value={answers[question.id] || ""}
                  onChange={(e) => handleTextChange(question.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[100px]"
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="ml-auto">Submit Survey</Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleSurvey;
