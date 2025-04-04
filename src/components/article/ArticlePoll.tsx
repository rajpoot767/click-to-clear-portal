
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface ArticlePollProps {
  question: string;
  options: PollOption[];
  totalVotes?: number;
  id: string;
}

const ArticlePoll = ({ question, options, totalVotes: initialTotalVotes = 0, id }: ArticlePollProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pollOptions, setPollOptions] = useState(options);
  const [totalVotes, setTotalVotes] = useState(initialTotalVotes);
  const { toast } = useToast();

  const handleVote = () => {
    if (!selectedOption) return;
    
    // Update local state to show results
    const updatedOptions = pollOptions.map(option => 
      option.id === selectedOption 
        ? { ...option, votes: option.votes + 1 }
        : option
    );
    
    setPollOptions(updatedOptions);
    setTotalVotes(prev => prev + 1);
    setHasVoted(true);
    
    // In a real app, this would send the vote to an API
    toast({
      title: "Vote submitted",
      description: "Thank you for participating!",
    });
  };
  
  const getVotePercentage = (votes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  };

  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasVoted ? (
          <div className="space-y-4">
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
              {pollOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button 
              onClick={handleVote}
              disabled={!selectedOption}
              className="w-full mt-2"
            >
              Vote
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {pollOptions.map((option) => {
              const percentage = getVotePercentage(option.votes);
              return (
                <div key={option.id} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{option.text}</span>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
            <div className="text-sm text-gray-500 text-right pt-2">
              Total votes: {totalVotes}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticlePoll;
